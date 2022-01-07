import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {AddToCartColor, priceTextColor} from '../static/AppColors';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'react-native-paper';
import { AddToCartAction } from '../reduxStore/actions/CartActions';
import FlexView from '../bootstrap/FlexView';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const CardFullWidth = ({item}) => {
  let {id} = item;
  const CartItems = useSelector(state => state.CartReducer.CartList);

  const {width, height} = useWindowDimensions();
  const dispatch = useDispatch();
  let imageHeight = width / 4 - 30;
  function IncreaseCarthandler() {
    dispatch(AddToCartAction({item}));
  }
  let ButtonComp = (
    <Button
      mode="contained"
      color={AddToCartColor}
      onPress={() => IncreaseCarthandler()}>
      Add To Cart
    </Button>
  );
  if (CartItems[id]) {
    console.log('hai ');
    ButtonComp = (
      <FlexView row justify="sa" alignItems="c" style={{borderRadius: 10, borderWidth:1, borderColor:'green'}}>
        <Button
          mode="text"
          color={AddToCartColor}
          onPress={() => IncreaseCarthandler()}>
          <FontAwesome5Icon name="minus" size={20}></FontAwesome5Icon>
        </Button>
        <Text style={{color: 'red'}}>{CartItems[id].quantity}</Text>
        <Button
          mode="text"
          color={AddToCartColor}
          onPress={() => IncreaseCarthandler()}>
          <FontAwesome5Icon name="plus" size={20}></FontAwesome5Icon>
        </Button>
      </FlexView>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Pressable onPress={() => null} style={{flexDirection: 'row'}}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: item.imgUrl[0]}}
            style={{height: imageHeight, width: imageHeight}}
            height={imageHeight}
            width={imageHeight}
          />
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.priceText}> ₹ {item.price}</Text>
          <Text style={styles.text} numberOfLines={2}>{item.productName}</Text>
          
        </View>
      </Pressable>
      <View style={{width: 150, position:""}}>

          {ButtonComp}
          </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {},
  detailContainer: {
    margin: 5,
    justifyContent: 'space-between',
    height: 110,
  },
  text: {
    color: 'rgb(77, 77, 77)',
  },
  priceText: {
    color: priceTextColor,
    fontSize: 15,
    fontWeight: '700',
  },
});
export default CardFullWidth;

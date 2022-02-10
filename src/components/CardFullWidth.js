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
import { AddToCartAction, RemoveFromCartAction } from '../reduxStore/actions/CartActions';
import FlexView from '../bootstrap/FlexView';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const CardFullWidth = ({item, navigation}) => {
  let {id} = item;
  const CartItems = useSelector(state => state.CartReducer.CartList);

  const {width, height} = useWindowDimensions();
  const dispatch = useDispatch();
  let imageHeight = width / 3 - 30;
  function IncreaseCarthandler() {
    dispatch(AddToCartAction({item}));
  }
  function DecreaseCartHandler() {
    dispatch(RemoveFromCartAction({item}));
  }
  let ButtonComp = (
    <Button
      mode="contained"
      color={AddToCartColor}
      onPress={() => IncreaseCarthandler()}>
      Add
    </Button>
  );
  if (CartItems[id]) {
    ButtonComp = (
      <FlexView row justify="se" alignItems="c" style={{borderRadius: 10, backgroundColor:'green'}}>
        <Button
          mode="text"
          color={AddToCartColor}
          onPress={() => DecreaseCartHandler()}>
          <FontAwesome5Icon name="minus" size={10} color="white"/>
        </Button>
        <Text style={{color: 'white'}}>{CartItems[id].quantity}</Text>
        <Button
          mode="text"
          color={AddToCartColor}
          onPress={() => IncreaseCarthandler()}>
          <FontAwesome5Icon name="plus" size={10} color="white"/>
        </Button>
      </FlexView>
    );
  }
  console.log("item", item)
  return (
    <View style={styles.mainContainer}>
      <Pressable onPress={()=> navigation.navigate("ProductScreen",{productId:item.id})} style={{flexDirection: 'row'}}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri:item.featureImage}}
            style={{height: imageHeight, width: imageHeight}}
            height={imageHeight}
            width={imageHeight}
          />
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}> ₹ {item.SP}</Text>
            <Text style={styles.MRPCancelled}> ₹ {item.MRP}</Text>
          </View>
          <Text style={styles.text} numberOfLines={2}>{item.productName}</Text>
          <View style={{width: 100, alignSelf:'flex-end'}}>
          {ButtonComp}
          </View>
        </View>
      </Pressable>
      
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
    flex:1,
    justifyContent: 'space-between',
    height: 110,
  },
  text: {
    color: 'rgb(77, 77, 77)',
  },
  priceContainer:{
    flexDirection: "row",
    justifyContent: 'flex-start'
  },
  priceText: {
    color: priceTextColor,
    fontSize: 15,
    fontWeight: '700',
  },
  MRPCancelled:{
    textDecorationLine:"line-through",
    fontSize: 10
  }
});
export default CardFullWidth;

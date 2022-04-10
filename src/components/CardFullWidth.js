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
import StarRating from './StarRating';
import { useNavigation } from '@react-navigation/native';

const CardFullWidth = ({item}) => {
  const navigation = useNavigation()
  let {id} = item;
  const CartList = useSelector(state => state.CartReducer.CartList);

  const {width, height} = useWindowDimensions();
  const dispatch = useDispatch();
  let imageHeight = width / 3 - 30;
  function IncreaseCarthandler() {
    dispatch(AddToCartAction({item}));
  }
  function DecreaseCartHandler() {
    dispatch(RemoveFromCartAction({item}));
  }
  let itemInCart = CartList.find(item => item.id ===id )
  let quantity = itemInCart?.quantity

  const discount = item?.MRP && Math.floor((1-item.SP/item.MRP)*100)


  let ButtonComp = (
    <Button
      mode="text"
      color={AddToCartColor}
      onPress={() => IncreaseCarthandler()}>
      Add
    </Button>
  );
  if (quantity) {
    ButtonComp = (
      <FlexView row justify="se" alignItems="c" style={{borderRadius: 10, backgroundColor:'green'}}>
        <Button
          mode="text"
          color={AddToCartColor}
          onPress={() => DecreaseCartHandler()}>
          <FontAwesome5Icon name="minus" size={12} color="white"/>
        </Button>
        <Text style={{color: 'white', fontSize: 24}}>{quantity}</Text>
        <Button
          mode="text"
          color={AddToCartColor}
          onPress={() => IncreaseCarthandler()}>
          <FontAwesome5Icon name="plus" size={12} color="white"/>
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
              <Text style={styles.SPText}>₹{item.SP}</Text>
              {item.MRP &&
              <>
                <Text style={styles.MRPText}>₹{item.MRP}</Text>
                <Text style={styles.discount}>{discount}% OFF</Text>
              </>
              }
          </View>
          <Text style={styles.text} numberOfLines={2}>{item.productName}</Text>
          <StarRating rating={item.rating || 0}/>
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
  text:{
    color: "rgb(77, 77, 77)",
},
MRPText:{
    color:priceTextColor,
    fontSize: 12,
    fontWeight:"500",
    marginRight: 5,
    textDecorationLine: 'line-through',
},
SPText:{
    color:priceTextColor,
    fontSize: 15,
    fontWeight:"700" ,
    marginRight: 5
},
discount:{
    color:"white",
    fontSize: 12,
    fontWeight:"500",
    backgroundColor: "green",
    paddingHorizontal: 4,
    borderRadius: 5
},
priceContainer:{
    flexDirection:'row',
    alignItems:"center",
    alignItems:"center"

}

});
export default CardFullWidth;

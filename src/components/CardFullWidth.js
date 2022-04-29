import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {AddToCartColor, priceTextColor, TabInActiveColor, themeColor} from '../static/AppColors';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'react-native-paper';
import { AddToCartAction, RemoveFromCartAction } from '../reduxStore/actions/CartActions';
import FlexView from '../bootstrap/FlexView';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import StarRating from './StarRating';
import { useNavigation } from '@react-navigation/native';
import TextPara from '../bootstrap/TextPara';

const CardFullWidth = ({item, hideRating}) => {
  const pinCode = useSelector((state)=> state.AreaInfoReducer.PINCODE);
  const navigation = useNavigation()
  let {id} = item;
  const CartList = useSelector(state => state.CartReducer.CartList);

  const {width, height} = useWindowDimensions();
  const dispatch = useDispatch();
  let imageHeight = width / 3 - 20;
  function IncreaseCarthandler() {
    dispatch(AddToCartAction({item}));
  }
  function DecreaseCartHandler() {
    dispatch(RemoveFromCartAction({item}));
  }
  let itemInCart = CartList.find(item => item.id ===id )
  let quantity = itemInCart?.quantity

  const discount = item?.MRP && Math.floor((1-item.SP/item.MRP)*100)
  let available = false
  if(item.deliveryCodes ==[]){
      available = true
  }
  else if(item.deliveryCodes?.includes(pinCode)){
      available = true
  }

  let ButtonComp = (
    <View style={styles.cartbtnContainer}>
      <Pressable style={styles.addButton} onPress={IncreaseCarthandler}>
        <TextPara color="white" >
          Add
        </TextPara>
      </Pressable>
    </View>
  );
  if(!available){
    ButtonComp =(
      <View style={styles.cartbtnContainer}>
      <Pressable style={[styles.addButton, {backgroundColor:"white"}]} disabled>
        <TextPara color={TabInActiveColor} >
          Out of Stock
        </TextPara>
      </Pressable>
    </View>
    )
  }
  if (quantity) {
    ButtonComp = (
      <View style={styles.cartbtnContainer}>
        <Pressable style={styles.plusMinusContianer} onPress={DecreaseCartHandler}>
          <FontAwesome5Icon name="minus" size={12} color="white"/>  
        </Pressable>
        <View>
          <TextPara style={{fontSize:15}}>{quantity}</TextPara>
        </View>
        <Pressable style={styles.plusMinusContianer} onPress={IncreaseCarthandler}>
          <FontAwesome5Icon name="plus" size={12} color="white"/>  
        </Pressable>
      </View>
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
          {hideRating ||  <StarRating rating={item.rating || 0}/>}
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

},
cartbtnContainer:{
  width: "100%",
  justifyContent:"space-between",
  alignItems:"center",
  flexDirection:"row",
},
addButton:{
  backgroundColor:themeColor,
  justifyContent:"center",
  alignItems:"center",
  padding:5,
  borderRadius:5,
  height:30,
  width: 100
},
plusMinusContianer:{
  backgroundColor:themeColor,
  height: 30,
  padding:5,
  justifyContent:"center",
  alignItems:"center",
  borderRadius:5,
  width: 30
}

});
export default CardFullWidth;

import { StyleSheet, Text, View, FlatList, SectionList } from 'react-native'
import React from 'react' 
import { DUMMY_PRODUCTS } from '../test/DUMMYDATA'
import ProductCard from './ProductCard'
import CardFullWidth from './CardFullWidth'
import { useSelector } from 'react-redux'
const ItemListComp = ({navigation}) =>{

    const products = useSelector(state=> state.ProductReducer.products);

    return(
        <View style={styles.mainContainer}>
            <FlatList
                data={products}
                horizontal={true}
                keyExtractor={item=> item.id}
                renderItem={({item,index})=>{
                    // return <ProductCard item={item} navigation={navigation}/>
                    return <ProductCard item={item} navigation={navigation} />
                }}
            />
            {/* <SectionList
                sections={DUMMY_PRODUCTS}
                renderItem={()=> <Text>Hi there </Text>}
            /> */}
        </View>
    )
} 
const styles = StyleSheet.create({
    mainContainer:{
        
    }
})
export default ItemListComp;
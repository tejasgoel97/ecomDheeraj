import { StyleSheet, Text, View, FlatList, SectionList } from 'react-native'
import React from 'react' 
import { DUMMY_PRODUCTS } from '../test/DUMMYDATA'
import ProductCard from './ProductCard'
import CardFullWidth from './CardFullWidth'
const ItemListComp = ({navigation}) =>{
    return(
        <View style={styles.mainContainer}>
            <FlatList
                data={DUMMY_PRODUCTS}
                horizontal={true}
                sections={DUMMY_PRODUCTS}
                keyExtractor={item=> item.id}
                renderItem={({item,index})=>{
                    // return <ProductCard item={item} navigation={navigation}/>
                    return <ProductCard item={item} />
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
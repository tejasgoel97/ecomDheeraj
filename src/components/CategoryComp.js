import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native'
import React, { useEffect } from 'react' 
import { Button, Card } from 'react-native-paper'
import { DUMMY_CATEGORY } from '../test/DUMMYDATA'
import { useDispatch, useSelector } from 'react-redux'
import { setCategories, setProducts } from '../reduxStore/actions/SetDataActions'

import { useNavigation } from '@react-navigation/native'
import TextPara from '../bootstrap/TextPara'

const CategoryItem = ({name, imgUrl, id}) =>{
    const navigation = useNavigation();
    return <View>
        <Card>
            <Pressable style={styles.categoryItemContainer} onPress={()=> navigation.navigate("CategoryList", {id})}>
                <View style={styles.imageContainer}>
                    <Image 
                        style={{width: 100, height:100}} 
                        source={{uri:imgUrl}}
                    />
                </View>
                <View style={{alignItems:"center"}}>
                    <TextPara>{name}</TextPara>
                </View>
            </Pressable>
        </Card>
    </View>
}

const CategoryComp = () =>{

    const categories = useSelector(state=> state.ProductReducer.categories);
    const products = useSelector(state=> state.ProductReducer.products);

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setCategories())  
    }, [])
    // console.log("proooo",products)
    return(
        <View style={styles.mainContainer}>
            <FlatList
                columnWrapperStyle={{justifyContent:"space-between"}}
                data={categories}
                numColumns={3}
                renderItem={({item, index})=>{
                    return <CategoryItem name ={item.catName} imgUrl={item.img.url} id={item.id}/>
                }}
            />
        </View>
    )
} 
const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent:"space-evenly"
    },
    categoryItemContainer:{
        padding: 10,
        backgroundColor:"white"
    },
    imageContainer:{
        overflow:"hidden",
        borderRadius: 20

    }
})

export default CategoryComp
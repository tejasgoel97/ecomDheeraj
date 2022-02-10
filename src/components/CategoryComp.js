import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react' 
import { Button, Card } from 'react-native-paper'
import { DUMMY_CATEGORY } from '../test/DUMMYDATA'
import { useDispatch, useSelector } from 'react-redux'
import { setCategories, setProducts } from '../reduxStore/actions/SetDataActions'

const CategoryItem = ({name, imgUrl}) =>{
    return <View>
        <Card>
            <View style={styles.categoryItemContainer}>
                <View style={styles.imageContainer}>
                    <Image 
                        style={{width: 100, height:100}} 
                        source={{uri:imgUrl}}
                    />
                </View>
                <View style={{alignItems:"center"}}>
                    <Text>{name}</Text>
                </View>
            </View>
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
                data={categories}
                horizontal
                renderItem={({item, index})=>{
                    return <CategoryItem name ={item.catName} imgUrl={item.img.url} />
                }}
            />
            <Button onPress={()=> dispatch(setProducts())}>Call the store</Button>
        </View>
    )
} 
const styles = StyleSheet.create({
    mainContainer:{
        
    },
    categoryItemContainer:{
        padding: 10,
    },
    imageContainer:{
        overflow:"hidden",
        borderRadius: 20

    }
})

export default CategoryComp
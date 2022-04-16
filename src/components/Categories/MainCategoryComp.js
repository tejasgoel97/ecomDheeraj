import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react' 

// Redux Imports


import FlexView from "../../bootstrap/FlexView"
import TextPara from '../../bootstrap/TextPara';

// Navigation
import { useNavigation } from '@react-navigation/native';

const CategoryShowComp = ({item}) =>{
    const {catName, img} = item;
    // console.log(item)
    const navigation = useNavigation();

    return(
    <View style={{  borderColor:"black", borderWidth: 1, borderRadius: 10, margin:10, overflow:'hidden'}}> 
        <FlexView row >
            {/* <View >
                <Image style={{width: 100, height:100}} 
                    source={{uri:img.url}}
                />
            </View> */}
            <View style={{flex: 1, backgroundColor: "#519259", justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize: 16}}>{item.catName}</Text>
            </View> 
        </FlexView>
        <FlatList data={item.subCat} 
            numColumns={3}
            renderItem={({item, index})=>{
            const subCat = item;
                return (
                <View style={{flex:1, padding: 10, alignItems:'center',}} >
                    <Pressable style={{borderRadius: 5, overflow:"hidden", backgroundColor:"red"}} onPress={()=> navigation.navigate("SubCatList",{id: subCat.id})}>
                        <Image style={{width: 100, height:100}} 
                            source={{uri:subCat.img.url}}
                            resizeMode="stretch"
                        />
                    </Pressable>
                    <TextPara onPress={()=> console.log("hi")}>{subCat.subCatName}</TextPara>
                </View>)
            }}/>
    </View>)
}


// Main Component Goes Here
const MainCategoryComponent = ({categories}) =>{
    console.log(categories)
    return(
        <View style={styles.mainContainer}>
            <FlatList data={categories} renderItem={({item, index})=> {
                return (
                <>
                    <CategoryShowComp item={item}/>
                </>
                )
            }}/>
        </View>
    )
} 
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
    }
})
export default MainCategoryComponent;

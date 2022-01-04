import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React from 'react' 
import { Button, Card } from 'react-native-paper'
import { DUMMY_CATEGORY } from '../test/DUMMYDATA'

const CategoryItem = ({name, imgUrl}) =>{
    return <View>
        <Card>
            <View style={styles.categoryItemContainer}>
                <View style={styles.imageContainer}>
                    <Image 
                        style={{width: 100, height:120}} 
                        source={{uri:imgUrl}}
                    />
                </View>
                <View>
                    <Text>{name}</Text>
                </View>
            </View>
        </Card>
    </View>
}


const CategoryComp = () =>{
    return(
        <View style={styles.mainContainer}>
            <FlatList
                data={DUMMY_CATEGORY}
                renderItem={({item, index})=>{
                    return <CategoryItem name ={item.name} imgUrl={item.imgUrl} />
                }}
            />
        </View>
    )
} 
const styles = StyleSheet.create({
    mainContainer:{
        
    },
    categoryItemContainer:{
        flexDirection:"row",
        padding: 10,
    },
    imageContainer:{
        width: "30%"
    }
})

export default CategoryComp
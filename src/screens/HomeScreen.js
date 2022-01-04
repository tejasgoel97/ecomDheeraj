import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import React from 'react' 
import CategoryComp from '../components/CategoryComp'
import ItemListComp from '../components/ItemListComp'
const HomeScreen = ({navigation}) =>{
    return(
        <View style={styles.mainContainer}>
            <ScrollView>
                <CategoryComp/>
                <ItemListComp navigation={navigation}/>
            </ScrollView>
        </View>
    )
} 
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        margin: 10
    }
})
export default HomeScreen;
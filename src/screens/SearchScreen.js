import { Button, Pressable, StyleSheet, Text, TextInput, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react' 
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import useSearchByString from '../hooks/useSearchByString'
import CardFullWidth from '../components/CardFullWidth'
import { Searchbar } from 'react-native-paper'



const SearchScreen = () =>{
    const [searchString, setSearchString] = useState("");
    const [finalString, setFinalString] = useState("")

    const {itemsLoading, error, setError, fetchItems, items} = useSearchByString(searchString);

    useEffect(()=>{
        console.log("HI there")
        const timeOut = setTimeout(() => {
            console.log(searchString)
            fetchItems(searchString)
            setFinalString(searchString)
        }, 2000);
        return ()=> clearTimeout(timeOut)
    }, [searchString])
    console.log("items", items)

    return(
        <View style={styles.mainContainer}>
            <View style={styles.searchContainer}>
                {/* <TextInput style={styles.input} placeholder="Search Product Here" value={searchString} onChangeText={setSearchString}/> */}
                <Searchbar
                    placeholder="Search"
                    onChangeText={setSearchString}
                    value={searchString}
                />
            </View>
            <FlatList 
                data={items}
                renderItem={({item , index})=>{
                    return <CardFullWidth item={item}/>
                }}
            />
        </View>
    )
} 
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,       
        padding: 10
    },
    searchContainer:{
        flexDirection:'row',
        alignItems:"center"
    },
    input:{
        backgroundColor:"white",
        margin: 10,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
        flex:1
    }
})
export default SearchScreen;
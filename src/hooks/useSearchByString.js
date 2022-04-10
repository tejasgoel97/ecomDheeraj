import React, { useEffect, useState } from 'react';
import firestore from "@react-native-firebase/firestore"


const useSearchByString = () =>{

    const [itemsLoading, setItemsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);

    async function fetchItems(searchString){
        try {
            setItemsLoading(true)
            setError(null)
            setItems([])
            if(!searchString) throw new Error(" No Search String")
            searchString = searchString.toLowerCase()
            console.log("search Query", searchString)
            // const querySnapshot = await firestore().collection('products').where('mainCategory', "==" , searchString).get()
            // const querySnapshot = await firestore().collection('products').where('SearchString', '>=', searchString).where('SearchString', '<=', searchString+ '\uf8ff').get()
            // const querySnapshot = await firestore().collection('products').where('productName', '>=', searchString).where('productName', '<=', searchString).get()
            const querySnapshot = await firestore().collection('products').get()
            let dataArray = []
            querySnapshot.forEach(documentSnapshot => {
                let DATA = documentSnapshot.data()?.SearchString;
                if(typeof DATA == "string"){
                    DATA = DATA.toLowerCase();
                    if(DATA.includes(searchString)){
                        dataArray.push({id:documentSnapshot.id, ...documentSnapshot.data()})
                    }
                }
            });
            setItems(dataArray)
            setItemsLoading(false)
        } catch (error) {
            setError("Something Went Wrong");
            console.log(error)
            setItemsLoading(false)
        }    
    }

    return {itemsLoading, error, setError, fetchItems, items}
}


export default useSearchByString;
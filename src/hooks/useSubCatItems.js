import React, { useEffect, useState } from 'react';
import firestore from "@react-native-firebase/firestore"


const useSubCatItems = (subCatId) =>{

    const [itemsLoading, setItemsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);

    async function fetchItems(){
        try {
            setItemsLoading(true)
            setError(null)
            if(!subCatId) throw new Error(" No Item Selected")
            const querySnapshot = await firestore().collection('products').where('subCategory', "==" , subCatId).get()
            let dataArray = []
            querySnapshot.forEach(documentSnapshot => {
                dataArray.push({id:documentSnapshot.id, ...documentSnapshot.data()})
            });
            setItems(dataArray)
            setItemsLoading(false)
        } catch (error) {
            setError("Something Went Wrong");
            console.log(error)
            setItemsLoading(false)
        }    
    }
    useEffect(()=>{
        fetchItems();
    }, [subCatId])

    return {itemsLoading, error, setError, fetchItems, items}
}


export default useSubCatItems;
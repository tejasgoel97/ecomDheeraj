import React, { useEffect, useState } from 'react';
import firestore from "@react-native-firebase/firestore"


const useCategoriesHook = () =>{

    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);

    async function fetchCaregories(){
        try {
            setCategoriesLoading(true)
            setError(null)
            console.log("IN CATEGORIES HOO")
            const catSnapshot = await firestore().collection('categories').get();
            let catArray = [];
            catSnapshot.forEach(docSnapshot=>{
            catArray.push(docSnapshot.data())
            })
            setCategories(catArray);
            setCategoriesLoading(false)
        } catch (error) {
            setError("Something Went Wrong");
            console.log(error)
            setCategoriesLoading(false)
        }    
    }
    useEffect(()=>{
        fetchCaregories();
    }, [])

    return {categoriesLoading, error, fetchCaregories, categories}
}


export default useCategoriesHook;
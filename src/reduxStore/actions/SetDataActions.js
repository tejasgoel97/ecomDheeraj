import firestore from '@react-native-firebase/firestore'


import { SET_CATEGORIES, SET_PRODUCTS } from "../store/ACTION_DEFINATION"


export const setCategories = () => async (dispatch) =>{
    const categories = []
    const catSnapshot = await firestore().collection('categories').get()
    // const categories = await categoryCollection.data._docs[0]._data
    catSnapshot.forEach(docSnapshot=>{
        // console.log(docSnapshot.data())
        categories.push(docSnapshot.data())
    })
    dispatch({type: SET_CATEGORIES, payload:{categories}})
}

export const setProducts = () => async (dispatch) =>{
    const products = []
    const productSnapshot = await firestore().collection('products').get()
    // const categories = await categoryCollection.data._docs[0]._data
    productSnapshot.forEach(docSnapshot=>{
        // console.log(docSnapshot.data())
        products.push({id:docSnapshot.id, ...docSnapshot.data()})
    })

    dispatch({type: SET_PRODUCTS, payload:{products}})
}
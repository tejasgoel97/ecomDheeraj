import React, { useEffect, useState } from 'react';
import firestore from "@react-native-firebase/firestore"
import { useSelector } from 'react-redux';


const useProductById = (productId) =>{
    const pinCode = useSelector((state)=> state.AreaInfoReducer.PINCODE);
    const [productLoading, setProductLoading] = useState(true);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState([]);


    async function fetchProduct(){
        try{
            setProductLoading(true)
            setError(null);
            if(!productId) return setError("No Item Selected..Please Go back");
            const documentSnapshot = await firestore().collection("products").doc(productId).get();
            if(!documentSnapshot.exists){
                setError("PRODUCT DON'T EXIST NOW, Please go back");
                return setProductLoading(false)
            }
            let productData = documentSnapshot.data();
            const allImages = [{
                imgUrl: productData.featureImage,
                altText: productData.productName
            }, ...productData.images];
            let discount = Math.floor((1-productData.SP/productData.MRP)*100)
            let available = false
            if(productData.deliveryCodes ==[]){
                available = true
            }
            else if(productData.deliveryCodes?.includes(pinCode)){
                available = true
            }
        
            productData= {...productData, images: allImages, discount, available, id: productId}
            
            setProduct(productData);
            setProductLoading(false)
            setError(null)


        } catch(err){
            setError("PRODUCT DON'T EXIST NOW, Please go back");
            return setProductLoading(false)
        }
    }

    useEffect(()=>{
        console.log("inuseeffect ")
        fetchProduct()
    },[])
    return {productLoading, error, product,fetchProduct}
}

export default useProductById;
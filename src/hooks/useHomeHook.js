import React, { useEffect, useState } from 'react';
import firestore from "@react-native-firebase/firestore"


const useHomeHook = () =>{

    const [homeLoading, setHomeLoading] = useState(true);
    const [error, setError] = useState(null);
    const [homeData, setHomeData] = useState([]);

    async function fetchHomeData(){
        try {
            setHomeLoading(true)
            setError(null)
            const home = await firestore().collection('home').get();
            let homeArray = [];
            home.forEach(docSnapshot=>{
            homeArray.push(docSnapshot.data())
            })
            homeArray.sort((a,b)=> a.position > b.position)
            setHomeData(homeArray);
            setHomeLoading(false)
        } catch (error) {
            setError("Something Went Wrong");
            console.log(error)
            setHomeLoading(false)
        }
    }
    useEffect(()=>{
        fetchHomeData();
    }, [])

    return {homeLoading, error, fetchHomeData, homeData}
}


export default useHomeHook;
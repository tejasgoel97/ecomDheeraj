import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import LoadingComp from '../bootstrap/LoadingComp'
// import AuthWithPhone from '../components/Login/AuthWithPhone'
import AuthWithPhone from '../components/Login/AuthWithPhone2'

const LoginScreen = ({navigation}) =>{
    const loginState = useSelector(state => state.UserReducer)
    console.log(loginState)
    useEffect(()=>{
        if(loginState.isLoggedIn == true) navigation.navigate("Tabnav")

    }, [loginState])
    if(loginState.isLoggedIn === true) return <LoadingComp />
    return <AuthWithPhone />
}


export default LoginScreen;
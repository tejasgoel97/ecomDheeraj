import { useState } from "react";
import firestore from "@react-native-firebase/firestore"
import { useDispatch } from "react-redux";
import { AddDealerCode } from "../reduxStore/actions/PreOrderActions";



const useCouponandDealer = () =>{
    const [couponCode, setCouponCode] = useState("");
    const [couponInfo, setCouponInfo] = useState({})
    const [couponValid, setCouponValid] = useState("");
    const [couponLoading, setCouponLoading] = useState("");
    const [couponError, setCouponError] = useState("");
    const [discount, setDiscount] = useState("")

    const [dealerCode, setDealerCode] = useState("");
    const [dealerInfo , setDealerInfo] = useState({});
    const [dealerValid, setDealerValid] = useState("");
    const [dealerError, setDealerError] = useState("");
    const [dealerLoading, setDealerLoading] = useState("");

    const dispatch = useDispatch()
    function handleDealerSubmit(){
            console.log("InHandleDealer")
            setDealerLoading(true);
            setDealerError(null);
            setDealerInfo({})
            setDealerValid(false)

            let dealer=null
            let dealerCodeUpperCase = dealerCode.toUpperCase()
            firestore().collection("dealers").where("dealerCode", "==", dealerCodeUpperCase).where("isAllowed" , "==" , true)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    dealer = {id: doc.id , ...doc.data()}
                });
                setDealerLoading(false)
                if(dealer){
                    setDealerValid(true)
                    setDealerInfo(dealer)
                    dispatch(AddDealerCode(dealerCodeUpperCase))
                    setDealerError(null) 
                    setCouponValid(false) 
                }
                else{
                    setDealerValid(false)
                    setDealerInfo({})
                    setDealerError("Enter a Valid Dealer Code")

                }
                console.log(dealer)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                setDealerLoading(false)
                setDealerError("Please try again, Something went Wrong");
                setDealerValid(false);
                setDealerInfo({});
            });

    }
    function handleCouponSumbit(){
        console.log("in Handle Coupon")
        setCouponLoading(true);
        setCouponError(null);
        setCouponInfo({})
        setCouponValid(false)

        let coupon=null
        let couponCodeUpperCase = couponCode.toUpperCase()
        console.log(couponCodeUpperCase)
        firestore().collection("coupons").where("couponCode", "==", couponCodeUpperCase).where("isActive" , "==" , true)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                coupon = {id: doc.id , ...doc.data()}
            });
            setCouponLoading(false)
            if(coupon){
                setCouponValid(true)
                setCouponInfo(coupon)
                setCouponError(null)
                setDealerValid(false)
            }
            else{
                setCouponValid(false)
                setCouponInfo({})
                setCouponError("Enter a Valid Coupon Code")


            }
            console.log(coupon)
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
            setCouponLoading(false)
            setCouponError("Please try again, Something went Wrong");
            setCouponValid(false);
            setCouponInfo({})
        });

}

    return {couponCode, setCouponCode, couponValid,setCouponValid ,couponInfo, couponLoading, couponError, dealerCode, setDealerCode,dealerInfo, dealerValid,setDealerValid, dealerError, dealerLoading, handleDealerSubmit,handleCouponSumbit}
}

export default useCouponandDealer;
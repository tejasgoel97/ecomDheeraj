import firestore from '@react-native-firebase/firestore'


const RectifyCartAction = () =>async ()=> {
    console.log(" H i ")
    const cartSnapShot = await firestore.collection('products').where("id" , "in" , ["1N3FPhjNI11jheJ5o1He", "1evALvzYsbhufo6JhU3X"]).get()
    console.log("CARTT", cartSnapShot)
}


export default RectifyCartAction;
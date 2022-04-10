import React from "react";
import {StyleSheet, View, Text} from 'react-native'
import FlexView from "../bootstrap/FlexView";
import TextPara from "../bootstrap/TextPara";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { themeColor } from "../static/AppColors";

const StarRating = ({rating}) =>{
    let arr = [0,1,2,3,4]
    if(rating ==0 || !rating ){
        return <FlexView row alignItems="c">
            {arr.map(i=>{
                return <FontAwesome name="star-o"style={styles["m-1"]} color={themeColor}/>
            })}
            <TextPara> (No Ratings Yet)</TextPara>

        </FlexView>
    }

    return <FlexView row alignItems="c">
        {arr.map(i=>{
            let gap = rating - i
            if(gap>1) return <FontAwesome name="star" style={styles["m-1"]} color={themeColor}/>
            if(gap<0) return <FontAwesome name="star-o"style={styles["m-1"]} color={themeColor}/>
            if(gap >0.5) return <FontAwesome name="star"style={styles["m-1"]} color={themeColor}/>
            if(gap==0.5 || gap>0) return <FontAwesome name="star-half-empty"style={styles["m-1"]} color={themeColor}/>
        })}
        <TextPara> ({rating} out of 5)</TextPara>
    </FlexView>
}
const styles = StyleSheet.create({
    "m-1":{
        marginRight: 1
    }
})

export default StarRating;
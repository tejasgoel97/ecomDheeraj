import React from 'react'
import {Text } from "react-native"

import { textColorDark } from '../static/AppColors'

const TextPara = (props) =>{
    const {color, children, style} = props;
    const styles = {color: textColorDark};
    if(color) styles= {...styles, color: color }
    return <Text {...props} style={[styles, style]}>{children}</Text>
}

export default TextPara;
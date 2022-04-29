import React from 'react'
import {Text } from "react-native"

import { textColor, textColorDark } from '../static/AppColors'

const TextPara = (props) =>{
    const {color, children, style, size} = props;
    let styles = {color: textColor};
    if(color) styles= {...styles, color: color }
    if(size && !isNaN(size)) styles = {...styles, fontSize:size}
    return <Text {...props} style={[styles, style]}>{children}</Text>
}

export default TextPara;
import { StyleSheet, Text, View } from 'react-native'
import React from 'react' 
const FlexView = (props) =>{
    const {style, row, rowR, colR, bgColor, p, m, children, justify, alignItems} = props



    let myStyle={}
    if(bgColor) myStyle={...myStyle, backgroundColor:bgColor};
    if(row) myStyle={...myStyle, flexDirection: "row"};
    if(rowR) myStyle={...myStyle, flexDirection:"row-reverse"}
    if(colR) myStyle={...myStyle,flexDirection:"column-reverse"}
    if(p) myStyle={...myStyle,padding:p}
    if(m) myStyle={...myStyle,margin:m}
    switch (justify) {
        case 'c':
            myStyle={...myStyle, justifyContent: 'center'}
            break;
    
        default:
            break;
    }
    switch (alignItems) {
        case 'c':
            myStyle={...myStyle, alignItems: 'center'}
            break;
        case 'fs':
            myStyle={...myStyle, alignItems: 'flex-start'}
            break;
        case 'fe':
            myStyle={...myStyle, alignItems: 'flex-end'}
            break;
        case 'bl':
            myStyle={...myStyle, alignItems: 'baseline'}
            break;
        case 'st':
            myStyle={...myStyle, alignItems: 'stretch'}
            break;
    
        default:
            break;
    }
    return(
        <View style={[myStyle,style]}>
            {children}
        </View>
    )
} 

export default FlexView;
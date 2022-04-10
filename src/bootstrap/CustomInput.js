import * as React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { textColor, themeColor } from '../static/AppColors';

const CustomInput = ({label, text, setText, style, type='default'}) => {

  function handleTextChange(text){
    setText(text)
  }

  return (
    <>
    <TextInput
      mode='outlined'
      style={[{marginBottom: 10, color:"yellow",backgroundColor:"white",color:"black" }, style]}
      label={label}
      value={text}
      outlineColor={textColor}
      selectionColor={textColor}
      placeholderTextColor={textColor}
      activeOutlineColor={textColor}
      dense
      underlineColor='yellow'
      activeUnderlineColor="yellow"
      underlineColorAndroid="yellow"
      onChangeText={(text) => handleTextChange(text)} 
      keyboardType={type}
      theme={{ colors: { text: textColor, placeholder:"grey"} }}
      // right={<TextInput.Icon name="arm-flex-outline" />}
    />
    </>
  );
};

export default CustomInput;
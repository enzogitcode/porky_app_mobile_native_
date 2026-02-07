import {
  RegisteredStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
} from "react-native";
import React from "react";

interface ButtonCustomProps {
  title: string;
  onPress?: () => void;
  darkMode?: boolean;
  btnTitleStyle?: StyleProp<TextStyle>;
  btnStyle?: StyleProp<ViewStyle>;
  lightStyle?: StyleProp<ViewStyle>;
  darkStyle?: StyleProp<ViewStyle>;
  disabled?:boolean
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({
  title,
  onPress,
  btnTitleStyle,
  darkMode,
  btnStyle,
  lightStyle,
  darkStyle,
  disabled
}) => {
  return (
    <TouchableHighlight
    disabled={disabled}
      onPress={onPress}
      style={[
        
        styles.btnDefaultStyle,
        btnStyle,
        darkMode ? darkStyle : lightStyle,
      ]}
    >
      <Text style={[btnTitleStyle, styles.btnTextCenter]}>{title}</Text>
    </TouchableHighlight>
  );
};

export default ButtonCustom;

const styles = StyleSheet.create({
  btnDefaultStyle: {},
  btnTextCenter: {
    textAlign:'center'
  }
});

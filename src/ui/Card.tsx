import { StyleSheet, Text, View, StyleProp, ViewStyle } from "react-native";
import React,{ReactNode} from "react";

interface CardProps {
  title?: string;
  img?: string;
  children?: ReactNode;
  cardContainerStyleProp?: StyleProp<ViewStyle>;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <View style={[styles.cardContainer, props.cardContainerStyleProp]}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{props.title}</Text>
      </View>
      <View>{props.children}</View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 2,
    padding: 2,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#cccccc",
  },
  titleContainer: {
    backgroundColor: "#eeeeee",
  },
  titleText: {
    fontSize: 20,
  },
});

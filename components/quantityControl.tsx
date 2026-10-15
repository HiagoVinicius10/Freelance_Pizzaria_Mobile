import { colors } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";


interface QuantityControlProps {
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

export function QuatityControl({ quantity, onIncrement, onDecrement }: QuantityControlProps)  {



    return (
        <View style={styles.container}>
            <Pressable style={[styles.button, quantity <= 1 && { opacity: 0.5 }]} onPress={onDecrement}>
                <Text style={styles.buttonText} >-</Text>
            </Pressable>

            <View style={styles.quantityContainer}>
            <Text style={styles.buttonText}>{quantity}</Text>
            </View>
            <Pressable style={styles.button} onPress={onIncrement}>
                <Text style={styles.buttonText}>+</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center", 
        gap: 15,
    },
    button: {
        width: 35,
        height: 35,
        borderRadius: 15,
        backgroundColor: colors.brand,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "bold",
    },
    quantityContainer: {
        alignSelf: "center",
    }   
    
})
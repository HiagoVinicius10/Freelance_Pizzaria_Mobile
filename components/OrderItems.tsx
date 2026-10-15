import { colors, spacing } from "@/constants/theme";
import { ItemProps } from "@/types";
import { formatPrice } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";


interface OrderItemsProps{
    item: ItemProps;
    onRemove: (item_id: string) => void;
}

export function OrderItems({item, onRemove}: OrderItemsProps) {


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.productName}> { item.product?.name} </Text>
                <Text style={styles.itemDetails}>
                     {item.amount}x - {formatPrice(item.product.price * item.amount)} 
                </Text>
            </View>

              <Pressable style={ styles.removeButton} onPress={() => onRemove(item.id)}>
                    <Ionicons name="trash" size={24} color="white"/>
                </Pressable>
        </View>
    )
}

const styles =  StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundInput,
        borderRadius: 8,
        padding: spacing.md,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderColor,
    },
    content: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.primary,
    },
    itemDetails: {
        fontSize: 14,
        color: colors.gray,
        marginTop: 5,
    },
    removeButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.brand,
        padding: 8,
        borderRadius: 8,
    }
})
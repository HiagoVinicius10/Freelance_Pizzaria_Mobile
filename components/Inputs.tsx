import { borderRadius, colors, fontSize } from "@/constants/theme";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps{
    label?: string;
}

export function Input({label, style, ...rest}:  InputProps) {

    return(
        <View style={styles.Container}>
              {label && <Text style={styles.label}> {label} </Text>}

                 <TextInput
                    style={[styles.input, style]}
                    {...rest}      
                    />
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: "100%",
        marginBottom: 10
    },
    label:{
        color: colors.gray,
        marginBottom: 5,
    },
    input: {
        height: 50,
        backgroundColor: "#101026",
        color: colors.primary,
        borderRadius: borderRadius.md,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colors.borderColor,
        fontSize: fontSize.lg,
    }
})
import { borderRadius, colors, spacing } from "@/constants/theme";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: "primary" | "secondary";
    loading?: boolean;
}


export function Button({ title, variant = "primary", loading = false, disabled, style, ...rest }: ButtonProps){

    const backgroundColor = variant === "primary" ? colors.green : colors.brand

    return(
       <TouchableOpacity 
       style={[
        { backgroundColor: backgroundColor},
        styles.button,
        (disabled || loading) && styles.buttonDisabled,
        style,
       ]}
       {...rest}
       >

       {loading ?(
        <ActivityIndicator size="small" color={colors.background} />
       ) : (
         <Text style={styles.titleButton}>{title}</Text>
       )}

       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    titleButton: {
        color: colors.background,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
})

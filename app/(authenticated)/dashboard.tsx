import { Button } from "@/components/Button";
import { Input } from "@/components/Inputs";
import { borderRadius, colors, fontSize, spacing } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { OrderProps } from "@/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Dashboard() {
    const { signOut } = useAuth();
    const insets = useSafeAreaInsets();
    const [loading, setLoading] = useState(false);
    const [tableNumber, setTableNumber] = useState("");
    const router = useRouter();

    async function handleOpenTable(){
        if(!tableNumber){
            Alert.alert("ATENÇÃO", "Informe o número da mesa");
            return;
        }

        const table = parseInt(tableNumber);

        if(isNaN(table) || table <= 0){
            Alert.alert("ATENÇÃO", "O número da mesa deve ser um número inteiro");
            return;
        }

        try{
            setLoading(true);
            const response = await api.post<OrderProps>("/order", {
                table: table,
                
            })

            router.push({
                pathname: "/(authenticated)/order",
                params: { table: response.data.table.toString(), order_id: response.data.id },
            });

            setTableNumber("");
        }catch(err){
            Alert.alert("ERRO", "Ocorreu um erro ao abrir a mesa.");
        }finally{
            setLoading(false);
        }
    }

    return(
        <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background}/>

            <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            >

            <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            >
                <View style={[styles.header, {paddingTop: insets.top + spacing.lg}]}>
                    <TouchableOpacity onPress={signOut} style={styles.signoutButton}>
                        <Text style={styles.signOutText}>Sair</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                     <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>
                            Pizzaria<Text  style={styles.brandText}>Cardo</Text>
                        </Text>
                    </View>

                    <Text style={styles.subTitleText}> Novo Pedido </Text>
                    <Input
                    style={styles.input}
                    placeholder="Número da mesa..."
                    placeholderTextColor={colors.gray}
                    onChangeText={setTableNumber}
                    keyboardType="numeric"
                    />

                     <Button
                      title="Abrir Pedido" 
                      onPress={handleOpenTable}
                      style={styles.buttonOpenOrder}
                      />
                </View>
            </ScrollView>

            </KeyboardAvoidingView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    keyboardContainer: {
        flex: 1,
    },
    scrollContainer:{
        flexGrow: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.sm,
    },
    signoutButton: {
        backgroundColor: colors.brand,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.md,
    },
    signOutText: {
        color: colors.primary,
        fontSize: fontSize.md,
        fontWeight: "bold",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: spacing.md,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: spacing.xl,
    },
    logoText: {
        fontSize: 38,
        fontWeight: "bold",
        color: colors.primary,
    },
    brandText:{
        color: colors.brand,
    },
    subTitleText:{
        fontSize: fontSize.xxl,
        color: colors.primary,
        textAlign: "center",
        fontWeight: "500",
        marginBottom: spacing.sm,
    },
    input:{
        paddingHorizontal: spacing.md,
    },
    buttonOpenOrder: {
        
    }
})
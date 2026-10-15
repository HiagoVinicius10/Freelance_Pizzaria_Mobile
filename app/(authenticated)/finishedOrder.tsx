
import { Button } from "@/components/Button";
import { Input } from "@/components/Inputs";
import { colors } from "@/constants/theme";
import { api } from "@/services/api";
import { SendOrderRequest } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";


export default function FinishedOrder() {
    const router = useRouter();
    const { order_id, table } = useLocalSearchParams<{ order_id: string, table: string }>();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");

    async function handleFinishOrder(){
        
        try{
            setLoading(true);

            await api.put<SendOrderRequest>("/order/send", {
                name: name || "Sem nome",
                order_id: order_id,
                table: table,
            })

            Alert.alert("Sucesso", "Pedido enviado para cozinha!");
            router.dismissAll(); // Dismiss all, Server para zerar a pilha de navegação e evitar que o usuário volte para a tela anterior.
            router.replace("/(authenticated)/dashboard");

        }catch(error){
            Alert.alert("ERRO", "Ocorreu um erro ao tentar finalizar o pedido.");
        }finally{
            setLoading(false);
        }
    }

    

    return(
        <View style={styles.container}>
            <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
            
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Deseja finalizar o pedido ?</Text>

                <Text style={styles.mesa}> Mesa {table} </Text>

                <Input
                    placeholder="Nome do cliente..."
                    placeholderTextColor={colors.gray}
                    value={name}
                    onChangeText={setName}
                />

                <Button
                    title="Finalizar Pedido"
                    variant="primary"
                    onPress={handleFinishOrder}
                    loading={loading}
                />
            </View>

            </KeyboardAvoidingView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:  colors.background
    },    
    keyboardContainer: {
        flex: 1,
    },
    contentContainer: {
        justifyContent: "center",
        width: "100%", 
        height: "100%",
        flexDirection: "column",
        gap: 20,
        paddingHorizontal: 12,
    },
    title: {
        fontSize: 18,
        fontStyle: "italic",
        fontWeight: "400",
        color: colors.primary,
        textAlign: "center",
    },
    mesa: {
        fontSize: 30,
        fontStyle: "normal",
        fontWeight: "600",
        color: colors.primary,
        textAlign: "center",
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
    }
})
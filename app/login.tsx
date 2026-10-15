import { Button } from "@/components/Button";
import { Input } from "@/components/Inputs";
import { colors, spacing } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";

 

 export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const router = useRouter()

   async function handleLogin(){
       if(!email.trim() || !password.trim()) {
         Alert.alert("ATENÇÃO", "Preencha todos os campos!");
         return;
       }

      try{
        setLoading(true);
        await signIn(email, password);
        router.replace("/(authenticated)/dashboard")
      }catch(err){
        Alert.alert("ERRO", "Ocorreu um erro ao tentar fazer login.");
        throw err;
      }

    }
    
    return(
        <KeyboardAvoidingView 
        style={styles.container}
        behavior={"padding"}
        >
            <ScrollView 
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            >
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>
                        Pizzaria<Text  style={styles.brandText}>Cardo</Text>
                    </Text>
                    <Text  style={styles.subTitleText}>
                        Garçom app
                    </Text>
                </View>


                <View style={styles.formContainer}>
                  <Input
                    label="Email"
                    placeholder="Digite seu email..."
                    placeholderTextColor={colors.gray}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                  />
                  <Input
                    label="Senha"
                    placeholder="Digite sua senha..."
                    placeholderTextColor={colors.gray}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                  />

                   <Button 
                    loading={loading}
                    title="Acessar"
                    onPress={handleLogin}
                    />
                </View>

               
            </ScrollView>
            
        </KeyboardAvoidingView>
    )
 }

 const styles = StyleSheet.create({
     container: {
        backgroundColor: colors.background,
        flex:1,
    },
    scrollContent: {
        justifyContent: "center",
        flexGrow:1,
        paddingHorizontal: spacing.xl,
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
    subTitleText: {
        fontSize: 18,
        color: colors.gray,
    },
    formContainer: {

    },
 });
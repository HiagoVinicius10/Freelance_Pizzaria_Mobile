import { api } from "@/services/api";
import { LoginProps, UserProps } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

interface AuthContextProps {
    children: React.ReactNode;
}

interface AuthContextData {
    user: UserProps | null;
    signed: boolean; // Se usuário está logado ou não
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthContextProps) {
    const [signed, setSigned] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ user, setUser] = useState<UserProps | null>(null);

    useEffect(() => {
        async function loadData(){
            await loadStorageData();
        }

        loadData();
    }, [])

    async function loadStorageData(){
        try{
            setLoading(true);
            const storedToken = await AsyncStorage.getItem("@token:PizzariaMobile");
            const storedUser = await AsyncStorage.getItem("@user:PizzariaMobile");

            if(storedToken && storedUser){
                setUser(JSON.parse(storedUser));
                setSigned(true);
            }

        }catch(error) {
            Alert.alert("ERRO", "Ocorreu um erro ao abrir a mesa.");
        }finally{
            setLoading(false);
        }
        
    }

    async function signIn( email: string, password: string) {
        try{
            const response = await api.post<LoginProps>("/session", {
                email,
                password,
            })

            Alert.alert("Sucesso", "Login realizado com sucesso!");
            const { token,  ...userData} = response.data;
            
             await AsyncStorage.setItem("@token:PizzariaMobile", token);
             await AsyncStorage.setItem("@user:PizzariaMobile", JSON.stringify(userData));

             setUser(userData);
        }catch(error: any){
            if(error.response?.data?.error){
                Alert.alert("ERRO", error.response.data.error);
                return;
            } else {
                Alert.alert("ERRO", "Ocorreu um erro ao fazer login.");
            }

            throw error;
        }
    }

    async function signOut(){
        await AsyncStorage.multiRemove(["@token:PizzariaMobile", "@user:PizzariaMobile"]);
        setUser(null);
    }

    return(
        <AuthContext value={{signed: !!user, loading, signIn, user, signOut }}>
            { children}
        </AuthContext>
    )
}

// Pratica de fazer um Hook para pegar o contexto
export function useAuth(){
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("Contexto não foi encontrado!");
    }
    return context;
}


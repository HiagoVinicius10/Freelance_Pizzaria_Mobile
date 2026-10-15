import { Button } from "@/components/Button";
import { OrderItems } from "@/components/OrderItems";
import { QuatityControl } from "@/components/quantityControl";
import { Select } from "@/components/select";
import { colors, spacing } from "@/constants/theme";
import { api } from "@/services/api";
import { CategoryProps, ItemProps, ProductsProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";



export default function Order() {
    const  router = useRouter();
    const { order_id, table } = useLocalSearchParams<{ order_id: string, table: string}>();

    const [ categories, setCategories ] = useState<CategoryProps[]>([])
    const [ selectingCategory, setSelectingCategory ]  = useState("");

    const [ loading, setLoading ]  = useState(true);
    const [ loadingProduct, setLoadingProduct ]  = useState(false);

    const [ products, setProducts ]  = useState<ProductsProps[]>([]);
    const [ selectedProduct, setSelectedProduct ] = useState("");

    const [ quantity, setQuantity ] = useState(1);
    const [ loadingAddItem, setLoadingAddItem ] = useState(false);

    const [ items, setItems ] = useState<ItemProps[]>([]);

    const insets = useSafeAreaInsets();

    useEffect(() => {
        async function loadDataCategory() {
            await loadCategories();
        }
        loadDataCategory();
    },[])


    useEffect(() => {
        if(selectingCategory){
            loadProducts(selectingCategory);
        }else{
            setProducts([]);
            setSelectingCategory("");
        }
    },[selectingCategory])

    const loadCategories = async () =>{
        try{
            setLoading(true);
            const response = await api.get<CategoryProps[]>(`/category`);
            setCategories(response.data);
        }catch(error){
            Alert.alert("ERRO", "Ocorreu um erro ao carregar as categorias.");
        }finally{
            setLoading(false);
        }
    }

    async function loadProducts (category_id: string) { 
        try{
            setLoadingProduct(true);
            const response = await api.get<ProductsProps[]>("category/product", {
                params: {
                    category_id: category_id
                }
            })

        setProducts(response.data);
        }catch(error){
            Alert.alert("ERRO", "Ocorreu um erro ao carregar os produtos.");
        }finally{
            setLoadingProduct(false);
        }
    }

    if(loading){
        return(
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={colors.brand} />
            </View>
        )
    }

    async function signOut(order_id: string){

        if(!order_id){
            return;
        }
    
        try{
        setLoading(true);
          const response = await api.delete("/order", {
            params: {
                order_id: order_id
            }
          });

          Alert.alert("Sucesso", "Mesa fechada com sucesso!");
        }catch(error){
            Alert.alert("ERRO", "Ocorreu um erro ao tentar fechar a mesa.");
        }finally{
            setLoading(false);
        }

       router.back() 
    }

    async function handleAddProduct() {
        if(!selectedProduct || !quantity){
            return;
        }

        try{
            setLoadingAddItem(true)

            const response = await api.post<ItemProps>("/order/add",{
                order_id: order_id,
                product_id: selectedProduct,
                amount: quantity
            })

        setItems([...items, response.data]);

        setSelectedProduct("");
        setSelectingCategory("");
        setQuantity(1);

        }catch(error){
            Alert.alert("ERRO", "Ocorreu um erro ao adicionar item ao pedido.");
        }finally{
            setLoadingAddItem(false)
        }
    }

    async function handleRemoveItem(item_id: string) {

        if(!item_id){
            return;
        }

        try{

            await api.delete("/order/remove", {
                params: {
                   item_id: item_id 
                }
            })

            const updatedItems = items.filter((item) => item.id !== item_id);
            setItems(updatedItems);
           Alert.alert("Item removido",  "Seu item foi removido da mesa!");

        }catch(error){
            Alert.alert("Atenção", "Ocorreu um erro ao remover item do pedido!");
        }
    }


    function handleAdvance() {
        if(items.length === 0){
            Alert.alert("Atenção", "Adicione pelo menos um item ao pedido!");
            return;
        }
        
        router.push({
            pathname: "/(authenticated)/finishedOrder",
            params: {
                order_id: order_id,
                table: table
            }
        })
    }

    return (
        <View style={ styles.container }>

            <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
           

            <View style={ [ styles.header, { paddingTop: insets.top + 30}] }>
                <View style={ styles.headerContent }>
                    <Text style={ styles.headerText }> Mesa: { table } </Text>
                     <Pressable onPress={() => signOut(order_id)} style={styles.buttonClose}>
                        <Ionicons name="trash" size={20} color={colors.primary} /> 
                     </Pressable>
                </View>
            </View>

            <ScrollView 
            style={styles.scrollContainer}
            contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
            keyboardShouldPersistTaps="handled"
            >   
                <Select 
                label="Categoria"
                options={categories.map((category) => ({ label: category.name, value: category.id }))}
                placeholder="Selecione uma categoria..."
                selectedValue={selectingCategory}
                onValueChange={setSelectingCategory}
                />

                {loadingProduct ? (
                    <ActivityIndicator size="large" color={colors.brand} />
                ): (
                    selectingCategory && <Select
                    placeholder=" Selecione um produto... "
                    options={products.map((product) => ({ label: product.name, value: product.id }))}
                    selectedValue={selectedProduct}
                    onValueChange={setSelectedProduct}
                    />
                )}

                {selectedProduct && (
                    <View style={styles.quantitySection}>
                        <Text style={styles.quantityText}> Quantidade </Text>
                        <QuatityControl 
                        quantity={quantity}
                        onIncrement={() => setQuantity( quantity  => quantity + 1 )}
                        onDecrement={() => {
                            if(quantity <= 1){
                                setQuantity(1);
                                return;
                            }else{
                                setQuantity( quantity  => quantity - 1 ) ;
                            }
                        }}
                        />
                    </View>
                )}
            
            {selectedProduct && (
               <Button
               title="Adicionar"
               onPress={handleAddProduct}
               variant="primary"
               />
            )}

            {items.length > 0 && (
                <View style={styles.itemsSection}>
                        <Text style={styles.itemsHeaderText}> Items do pedido </Text>
                        {items.map((item) => (
                            <OrderItems
                            item={item}
                            key={item.id}
                            onRemove={ handleRemoveItem }
                            />
                        ))}
                </View>
            )}

            {items.length > 0 && (
                <View style={styles.footer}>
                    <Button
                    title="Avançar"
                    onPress={handleAdvance}
                    variant="secondary"
                    />

                </View>
            )}

            </ScrollView>
        </KeyboardAvoidingView>

        </View>
    )
}



const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.background,
    },
    keyboardContainer:{
        flex: 1
    },
   
    header:{
        paddingHorizontal: 25,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.gray,
        paddingBottom: 30,
    },
    headerContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerText:{
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primary,
    },
    buttonClose:{
        backgroundColor: colors.brand,
        padding: 8,
        borderRadius: 8,
    },
     scrollContainer:{
        padding: spacing.lg,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background
    },
    quantitySection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: spacing.md,
        
    },
    quantityText: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primary,
    },
    itemsSection: {
        marginTop: spacing.lg,
    },
    itemsHeaderText: {
        fontSize: 18,
        color: colors.primary,
        fontWeight: "bold",
        marginBottom: spacing.md,
    },
    footer:{
        paddingTop: spacing.md,
        borderTopWidth: 0.5,
        borderTopColor: colors.gray,
    },
})
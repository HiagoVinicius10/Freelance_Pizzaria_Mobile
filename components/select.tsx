import { colors, fontSize, spacing } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";


interface SelectOptions{
    label: string;
    value: string;
}

interface SelectProps{
    label?: string;
    options: SelectOptions[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
}

export function Select({
    label,
    options,
    selectedValue,
    onValueChange,
    placeholder = "Selecione uma opção...",
}: SelectProps ){

    const [ modalVisible, setModalVisible ] = useState(false);

    const selectedOption = options.find((option) => option.value === selectedValue);
    const displaytext = selectedOption?.label || placeholder;
    

    function handleChange(value: string) {
        setModalVisible(false);
        onValueChange(value);
    }

    return(
        <View style={styles.container}>
              {label && <Text style={styles.label}> {label} </Text>}

            <Pressable
            style={styles.selectButton}
            onPress={() => setModalVisible(true)}
            >
                <Text style={styles.selectButtonText}>
                    {displaytext}
                </Text>
                <Feather name="chevron-down" size={16} color={colors.primary} />
            </Pressable>

            <Modal
            visible={modalVisible}
            animationType="fade"
            transparent
            onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                style={styles.modalOverlay}
                onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {label || "Selecione uma opção"}
                            </Text>

                            <Pressable onPress={() => setModalVisible(false)}>
                                <Feather name="x" size={24} color={colors.red} />
                            </Pressable>
                        </View>

                        <FlatList
                        data={options}
                        keyExtractor={(item) => item.value}
                        renderItem={({ item }) => (
                            <Pressable style={styles.optionItem} onPress={() =>  handleChange(item.value)}>
                                <Text style={[styles.optionText, item.value === selectedValue  && styles.optionSelectedText]}>
                                    {item.label}
                                </Text>
                            </Pressable>
                        )}
                        />

                    </View>
                </Pressable>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 10
    },
    label:{
        color: colors.primary,
        fontSize: fontSize.xl,
        fontWeight: "500",
        marginBottom: 8,
    },
    selectButton:{
        height: 50,
        backgroundColor: "#101026",
        color: colors.primary,
        borderRadius: 8,
       paddingHorizontal: 12,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: colors.borderColor,
        fontSize: fontSize.lg,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    selectButtonText:{
        color: colors.primary,
        fontSize: fontSize.md,
        flex: 1
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "center",
        alignItems: "center",
        padding: spacing.lg,
    },
    modalContent: {
        backgroundColor:  colors.background,
        width: "100%",
        maxHeight: "70%",
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.borderColor,
        padding: spacing.lg,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor
        
    },
    modalTitle: {
        fontSize: fontSize.xl,
        fontWeight: "bold",
        color: colors.primary,
    },
    optionItem: {
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    optionText: {
        fontSize: fontSize.md,
        color: colors.primary
    },
    optionSelectedText: {
        color: colors.green,
        fontWeight: "bold"
    }
})
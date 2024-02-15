import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView, Modal, TouchableOpacity, Keyboard } from 'react-native';


export const Home = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tareas, setTareas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

    const handleAgregarTarea = () => {
        const nuevaTarea = {
            id: Date.now(), 
            titulo: titulo,
            descripcion: descripcion,
            fecha: new Date().toLocaleString()
        };
        setTareas([...tareas, nuevaTarea]);
        setTitulo('');
        setDescripcion('');
        Keyboard.dismiss();
    };

    const handleEliminarTarea = () => {
        const nuevasTareas = tareas.filter(tarea => tarea.id !== tareaSeleccionada.id);
        setTareas(nuevasTareas);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese el título de la tarea"
                    value={titulo}
                    onChangeText={text => setTitulo(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese la descripción de la tarea"
                    value={descripcion}
                    onChangeText={text => setDescripcion(text)}
                    multiline
                />
                <Button
                    title="Agregar Tarea"
                    onPress={handleAgregarTarea}
                />
            </View>
            <ScrollView
                style={styles.listaTareas}
                horizontal={true} 
                contentContainerStyle={styles.listaTareasContent}
            >
                {tareas.map((tarea, index) => (
                    <Tarea key={index} tarea={tarea} onPressEliminar={() => {
                        setTareaSeleccionada(tarea);
                        setModalVisible(true);
                    }} />
                ))}
            </ScrollView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>¿Desea borrar la tarea "{tareaSeleccionada && tareaSeleccionada.id}"?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={handleEliminarTarea}
                            >
                                <Text style={styles.textStyle}>Sí</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: "#FF0000" }}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.textStyle}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const Tarea = ({ tarea, onPressEliminar }) => {
    return (
        <View style={styles.tarjeta}>
            <Text style={styles.titulo}>{tarea.titulo}</Text>
            <Text style={styles.fecha}>{tarea.fecha}</Text>
            <Text style={styles.descripcion}>{tarea.descripcion}</Text>
            <Button title="Eliminar" onPress={onPressEliminar} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:"rgba(239, 242, 221, 0.5)",
        flex: 1,
        justifyContent: 'flex-start', 
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 50
        
    },
    inputContainer: {
        paddingHorizontal: 85,
        backgroundColor:"rgba(239, 242, 221, 0.8)",
        width: '100%',
        alignItems: 'center'    
    },
    input: {
        marginTop:10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    listaTareas: {
        marginTop: 20,
        width: '100%',
        maxHeight: 200,
    },
    listaTareasContent: {
        flexDirection: 'row', 
    },
    tarjeta: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        flexGrow: 1, 
        marginRight: 10, 
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        
    },
    descripcion: {
        marginBottom: 5,
    },
    fecha: {
        color: '#888',
        fontSize: 12,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    openButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 5,
        minWidth: 100,
        alignItems: "center"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
});


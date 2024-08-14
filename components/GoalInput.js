import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, Image } from 'react-native';
function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState('');

    function goalInputHandler(enteredText) {
        console.log("goalInputHandler called " + enteredText);
        setEnteredGoalText(enteredText);
    }

    function addGoalHandler() {
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText('');
    }

    console.log("GoalInput rendered");

    return (
        <Modal visible={props.checkModalVisible} animationType='slide'>
            <View style={stylesItem.inputContainer}>
                <Image style={stylesItem.image}
                    source={require('../assets/images/goal.png')} />
                <TextInput style={stylesItem.textInput} placeholder="Your course goal" onChangeText={goalInputHandler} value={enteredGoalText} />
                <View style={stylesItem.buttonContainer}>
                    <View style={stylesItem.button}>
                        <Button title="Add Goal" onPress={addGoalHandler} color="#b180f0" />

                    </View>
                    <View style={stylesItem.button}>
                        <Button title="Cancel" onPress={props.onCancel} color="#f31282" />
                    </View>


                </View>
            </View>
        </Modal>
    );
};



export default GoalInput;


const stylesItem = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#311b6b'
    },
    image: {
        width: 100,
        height: 100,
        margin: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e4d0ff',
        backgroundColor: '#e4d0ff',
        borderRadius: 6,
        width: '100%',
        padding: 8,
        color: '#120438',
        padding: 16
    },
    buttonContainer: {
        marginTop: 16,
        flexDirection: 'row'
    },
    button: {
        width: 100,
        marginHorizontal: 8,
        color: '#5e0acc'
    }


});
import { StyleSheet, View } from "react-native"
import Colors from "../../constants/colors";
function Card({ children }) {
    return <View style={styles.card}>{children}</View>
}

export default Card;


const styles = StyleSheet.create({

    card: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 24,
        borderRadius: 8,
        padding: 16,
        backgroundColor: Colors.primary800,
        marginTop: 30,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25
    },

})
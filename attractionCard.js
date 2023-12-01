import { useState } from "react";
import { FlatList, Image, Modal, Pressable, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import useFetch from "./fetchActivities";
import axios from "axios";
// StAuth10244: I Sharansh Garg, 000870996 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else

const AttractionCard = (placedata) => {
    const place = placedata.placedata;
    // console.log(placedata);
    const [modalVisible, setModalVisible] = useState(false);
    const onPress = () => setModalVisible(true);
    // const [ImageUrl, setImageUrl] = useState("");
    // console.log(place.photos[0].photo_reference);

    const image_api = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=AIzaSyDTF-yID1noiJvFgYklfMnd4PtZV60KHHw`;
    // console.log(image_api);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.placeContainer}>
                            <Text style={styles.placeName}>{place.name}</Text>
                            <Text style={styles.placeAddress}>{place.formatted_address}</Text>
                            <Text style={styles.placeRating}>Rating: {place.rating}</Text>
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity onPress={onPress} style={styles.gradient}>
                <View style={styles.container}>
                    <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 700 }}>{place.name}</Text>
                    <Text

                        style={{
                            position: "absolute",
                            color: '#0000FF', bottom: 0, right: 0
                        }}>
                        Click for more Info
                    </Text>
                    <View style={{
                        position: "absolute", bottom: 0, left: 0, backgroundColor: '#F3F4F8'
                        , color: '#000', paddingHorizontal: 0, paddingVertical: 2, borderRadius: 20
                    }}>
                        <Text>
                            {place.rating} ☆

                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>




    );
}

const AttractionCards = (data) => {
    // console.log(data.data);
    // const dataatt = JSON.parse(data.data);

    return (<>
        <View style={{ marginTop: 10, marginBottom: 10 }}>
            {data.data.map((place, index) => (
                <AttractionCard key={index} placedata={place} />
            ))}
        </View>
    </>);
}

const styles = StyleSheet.create({
    placeContainer: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    placeName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    placeAddress: {
        fontSize: 14,
        color: '#555',
    },
    placeRating: {
        fontSize: 16,
        color: 'green',
    },
    placePhoto: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: 10,
    },

    gradient: {
        minHeight: 70,
        flex: 1,
        borderRadius: 20, padding: 13,
        width: '100%',
        backgroundColor: '#F3F4F8',
    },
    container: {
        position: 'relative',
        height: 45
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        padding: 8,
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default AttractionCards;
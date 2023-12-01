// StAuth10244: I Sharansh Garg, 000870996 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else

import {
    ScrollView, Text, Image,
    TouchableOpacity, TextInput, StatusBar, StyleSheet, SafeAreaView, View, FlatList
} from 'react-native';
import { Dimensions } from 'react-native';

import { COLORS, SIZES } from '../app/constant';
import { useEffect, useState } from 'react';
import axios from "axios";
import AttractionCards from './attractionCard';

var win = 0;

export default function Home() {
    win = Dimensions.get('window');

    const [searchTerm, setSearchTerm] = useState("");
    const [searchTermFinal, setSearchTermFinal] = useState("");
    const [reloadData, setreloadData] = useState(false);

    StatusBar.setBarStyle('dark-content', true);

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * 
     */
    const options = {
        method: 'GET',
        url: `https://8gkcva1oj3.execute-api.us-east-1.amazonaws.com/?city=${searchTerm}`,

    };

    /**
     * 
     */

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);

            setData(response.data.results);

            // console.log(data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchData()

        setreloadData(false);
    }, [reloadData])

    const handleClick = () => {
        setData([]);
        setreloadData(true);
        setSearchTermFinal(searchTerm);
    }
    return (

        <>
            <SafeAreaView style={styles.main}>

                <ScrollView>
                    <View style={styles.container}>
                        <Image
                            style={styles.imageBackground}
                            source={require('../assets/earth.jpg')}
                        />

                        <View style={styles.textInImage}>
                            <Text style={styles.attractionsText}>Attractions</Text>
                        </View>
                    </View>


                    <View style={styles.searchContainer}>
                        <View style={styles.searchWrapper}>
                            <TextInput
                                style={styles.searchInput}
                                value={searchTerm}
                                onChangeText={(text) => setSearchTerm(text)}
                                placeholder='What are you looking for?'
                            />
                        </View>

                        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
                            <Image
                                source={require('../assets/search.png')}
                                resizeMode='contain'
                                style={styles.searchBtnImage}
                            />
                        </TouchableOpacity>



                    </View>
                    {searchTermFinal && (<View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 17, fontWeight: 400 }}>Places to visit in {searchTermFinal}</Text>

                    </View>)}

                    {data && <AttractionCards data={data} />}
                </ScrollView>
            </SafeAreaView>
        </>

    );
}

const styles = StyleSheet.create({
  
    container: {
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
      },
      
      imageBackground: {
        width: win.width,
        height: 250,
        alignItems: 'center',
      },
    
      textInImage: {
        position: 'absolute',
        padding: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        bottom: 16,
        left: 35,
        right: 35,
        borderRadius: 10,
      },
    
      attractionsText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
      },
    
      main: {
        backgroundColor: '#fff',
        height: '100%',
        margin: 8,
      },
    
      searchContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: SIZES.large,
        height: 50,
      },
    
      searchWrapper: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginRight: SIZES.small,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.medium,
        height: "100%",
      },
    
      searchInput: {
        width: "100%",
        height: "100%",
        paddingHorizontal: SIZES.medium,
      },
    
      searchBtn: {
        width: 50,
        height: "100%",
        backgroundColor: '#000',
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
      },
    
      searchBtnImage: {
        width: "50%",
        height: "50%",
        tintColor: COLORS.white,
      },
});

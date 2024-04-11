import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/commonStyles';
import { getPhotoImage } from '../../api/postAPI.js';
import { FontAwesome } from '@expo/vector-icons';
import { getTownById } from '../../api/authAPI.js';


const SinglePost = ({title, likes, post, dislikes, image, date}) => {

    const [photoUri, setPhotoUri] = React.useState(null);
    const [townName, setTownName] = React.useState('');

    const fetchImage = async () =>
    {
        try {
            const photoData = await getPhotoImage(image);

            setPhotoUri(photoData);
        } catch (error) {
            console.log("Something went wrong in getting this photo, sorry.");
        }
    }
    const fetchTownName = async (postId) => {
        try {
            const response = await getTownById(postId);
            //console.log(response.name);
            setTownName(response.name);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    React.useEffect(() => {
        fetchTownName(post.town)
        fetchImage();
    }, []);

    const formatDate = (dateString) => {
        // console.log("Date: " + dateString);
        const dateObj = new Date(dateString);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();

        const today = new Date();
        if (day === today.getDate()) {
            return "Today";
        }
        return month + "/" + day + "/" + year;
    }

    const truncateTitle = (str) => {
        return str.length > 25 ? str.substring(0, 25) + "..." : str;
    }

    const truncateTown = (str) => {
        return str.length > 16 ? str.substring(0, 16) + "..." : str;
    }


    return (
        <>
        <View style={styles.background}>
        <View style={styles.item}>
            <View style={{flex: 1}}>
                <Text style={styles.title}>{title ? truncateTitle(title) : 'No post title'}</Text>
                <Text style={styles.title}>in town: <Text style={styles.unbold}>{townName ? truncateTown(townName) : 'No town name'}</Text></Text>
                <Text style={styles.title}>posted: <Text style={styles.unbold}>{date ? formatDate(date) : 'No date found'}</Text></Text>
            </View>
            <View styles={{justifyContent: 'flex-end', flexDirection: 'row'}}>
                <Text style={styles.likesdislikes}>
                    <FontAwesome
                        name={'thumbs-up'}
                        size={20}
                        color="green"
                    />
                    <Text> {likes}    </Text>
                </Text>

                <Text style={styles.likesdislikes}>
                    <FontAwesome
                        name={'thumbs-down'}
                        size={20}
                        color="red"
                    />
                    <Text> {dislikes}    </Text>
                </Text>

            </View>

        </View>
            {image ? <Image style={styles.image} source={{ uri: photoUri }} /> : 
            <Text style={styles.noImage}>No image found</Text>}

        </View>
        </>
    )
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
    },
    item: {
        flex: 1,
        width: 'auto', 
        height: 'auto', 
        backgroundColor: 'white', 
        borderRadius: 10, 
        borderWidth: 1,
        paddingLeft: '2%',
        paddingTop: '1%',
        paddingBottom: '1%',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '5%',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        opacity: 0.5,
    },
    noImage: {
        marginRight: '5%',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 20,
        marginTop: '5%',
        marginRight: '5%',
    },
    title: {
        fontSize: 18,
        fontFamily: 'Londrina-Solid',
    },
    unbold: {
        fontSize: 18,
        fontFamily: 'Londrina-Solid-Light',
    },
    likesdislikes: {
        fontSize: 16,
        fontFamily: 'Londrina-Solid',        
    },

});

export default SinglePost;
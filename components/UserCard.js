import React, { Fragment, useState } from 'react';
import { 
    View,
    StyleSheet, 
    ToastAndroid } from 'react-native';
import { 
    Avatar, 
    Card, 
    IconButton, 
    Colors, 
    Paragraph, Title } from 'react-native-paper';
import firebase from 'react-native-firebase';

const UserCard = (info) => {

    const fireBaseConfig = {
        apiKey: "AIzaSyD-2EGz_xFLWgL-SchBUzloyGntYKIzEOA",
        authDomain: "reactnative-d0844.firebaseapp.com",
        databaseURL: "https://reactnative-d0844.firebaseio.com",
        projectId: "reactnative-d0844",
        storageBucket: "reactnative-d0844.appspot.com",
        messagingSenderId: "285270964652",
        appId: "1:285270964652:web:154bd178672c3e4ba26209",
        measurementId: "G-NRWJ00VSN9"
    };

    const toastError = () => {
        ToastAndroid.showWithGravity(
          '¡Error al eliminar usuario!',
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
    };

    const toast = () => {

        ToastAndroid.showWithGravity(
          '¡Usuario eleminado!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        ToastAndroid.showWithGravity(
            '¡Deslice hacia abajo para actualizar!',
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );

    };

    const HandlerPress = (id, nombre, apellidos) => {

        if(id == 3){

            firebase.initializeApp(fireBaseConfig);
            var ref = firebase.database().ref('users/');
            var query = ref.orderByChild("reactnative-d0844/users")
            query.once("value", (snapshot) => {
    
                snapshot.forEach((data) => {

                    if(data.val().nombre == nombre && data.val().apellidos == apellidos){
                        
                        firebase.database().ref(`users/${data.key}`).remove().then(() => {

                            toast();

                        }).catch((error) => {

                            console.log(error);
                            toastError();

                        });

                    }

                })

            })

        } 

    }

    return (  
        <Fragment>
            <View style={styles.card}>
                {

                    info.data.map((data) => {

                        var json = JSON.parse(data);

                        if(info.id == 1){
                            
                            const [bool, setBool] = useState({ visible: false });
                            const [randomUrl, setRandomUrl] = useState({ url:'' });

                            const getImgApi = () => {

                                if(randomUrl.url == ''){

                                    return fetch('https://picsum.photos/400/300?random=1&blur=1')

                                    .then((response) => setRandomUrl({ url: response.url }))
                                    .catch((error) => {

                                        console.error(error);

                                    });

                                }

                            }

                            return (
    
                                <Fragment>
                                    <Card.Title
                                        title={json.nombre}
                                        subtitle={'    '+json.apellidos}
                                        left={() => <Avatar.Image 
                                            size={50} 
                                            source={require('../img/avatar-user.png')}
                                            theme={{colors : { primary: Colors.lightBlue800 }}}
                                        />}
    
                                        right={(props) => <IconButton {...props} icon={`${info.icon}`} 
                                        onPress={() => {
    
                                            if(info.id == 2){
    
                                                info.nav.navigate('Update', {params: json});
                                                
    
                                            } else if(info.id == 1){
    
                                                if(bool.visible){
                                    
                                                    setBool({ visible: false });
                                    
                                                } else {
                                    
                                                    setBool({ visible: true });
                                                    getImgApi();
                                                  
                                                }
                                    
                                            } else {
                                                
                                                HandlerPress(info.id, json.nombre, json.apellidos)
    
                                            }
    
    
                                        }} />}
                                        
                                    />
                                    {
    
                                        bool.visible?
                                        <Card>
                                            <Card.Cover source={{ 
                                                
                                                uri: randomUrl.url

                                            }} />
                                            <Card.Content>
                                                <Title>{json.nombre}</Title>
                                                <Paragraph>Apellidos  {json.apellidos}</Paragraph>
                                                <Paragraph>Edad  {json.edad}</Paragraph>
                                                <Paragraph>Genero  {json.sexo}</Paragraph>
                                                <Paragraph>Email  {json.email}</Paragraph>
                                            </Card.Content>
                                        </Card>: console.log()

                                    }

                                </Fragment>
    
                            )

                        } else {


                            return (
    
                                <Fragment>
                                    <Card.Title
                                        title={json.nombre}
                                        subtitle={'    '+json.apellidos}
                                        left={() => <Avatar.Image 
                                            size={50} 
                                            source={require('../img/avatar-user.png')}
                                            theme={{colors : { primary: Colors.lightBlue800 }}}
                                        />}
    
                                        right={(props) => <IconButton {...props} icon={`${info.icon}`} 
                                        onPress={() => {
    
                                            if(info.id == 2){
    
                                                info.nav.navigate('Update', {params: json});
                                                
    
                                            } else if(info.id == 1){
    
                                                if(bool){
                                    
                                                    setBool(false);
                                                    //bool = false;
                                                    console.log('false');
                                                   
                                    
                                                } else {
                                    
                                                    setBool(true);
                                                    //bool = true;
                                                    console.log('true');
                                                  
                                                }
                                    
                                            } else {
                                                
                                                HandlerPress(info.id, json.nombre, json.apellidos)
    
                                            }
    
    
                                        }} />}
                                        
                                    />
    
                                </Fragment>
    
                            )

                        }



                    })

                }
            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({

    card : {

        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
        
    }

});
 
export default UserCard;
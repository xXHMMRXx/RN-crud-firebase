import React, { Fragment, useState, useEffect } from 'react';
import Fab from '../components/Fab';
import UserCard from '../components/UserCard';
import firebase from 'react-native-firebase';
import { 
    View, 
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    RefreshControl, Text } from 'react-native';
import { Colors, Paragraph } from 'react-native-paper';

const Dashboard = (props) => {

    const [user, setUser] = useState([]);

    const [refreshing, setRefreshing] = React.useState(false);

    const [isNull, setIsNull] = useState(true);

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

    const onRefresh = React.useCallback(() => {
        
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    
    useEffect(() => {

        function timer(){
                
            db();
    
        }

        if(props.state){

            setTimeout(timer, 500);

        }

    },[]);

    const getDatos = (data) => {

        var cadena, posicion0, posicionfn, cadena1, cadenaInicial, cadenaFinal='', final;
        var string = data.toJSON();
        var json = JSON.stringify(string)
        var temp = 0;

        cadena = json.substring(24, json.length -1);

        while(temp == 0){

            if(cadena.includes(',"-')){

                posicion0 = cadena.indexOf('}');
                posicionfn = posicion0 + 1;
                cadena1 = cadena.substring(0, posicionfn);
                cadenaInicial = cadena.substring(posicionfn, cadena.length);
                cadenaFinal += cadena1+' ,';
                
                cadena = cadenaInicial.substring(24, json.length -1);

            } else {

                temp++;

            }

            if(temp != 0){

                final = cadenaFinal+cadena;

            }
 
        }

        setUser(final.split(' ,'));
    }

    function wait(timeout) {

        return new Promise(resolve => {
          setTimeout(resolve, timeout);
          db();
        });

    }

    function db(){

        firebase.initializeApp(fireBaseConfig);
        var ref = firebase.database().ref('users/');
        var query = ref.orderByChild("reactnative-d0844/users")
        query.once("value", (data) => {
    
            if(data.val() == null){

                setIsNull(true);
                setUser([])
                
            } else {
                
                setIsNull(false);
                getDatos(data);

            }

        })

    }

    return (  
        <Fragment>
                <View >
                    <SafeAreaView >
                        <ScrollView 
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                              }
                            decelerationRate='fast'
                            style={styles.scrollView}>
                                <UserCard 
                                    data={user} 
                                    icon={props.icon} 
                                    id={props.id} 
                                    nav={props.nav}
                                    url={props.url} />
                                {
                                    isNull?
                                    <Paragraph style={styles.paragraph}>
                                        <Text>¡No se encontraron registros!</Text>
                                    </Paragraph>:console.log()
                                }
                        </ScrollView>
                    </SafeAreaView>
                </View>
            <Fab nav={props.nav} />
        </Fragment>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: `${Colors.blueGrey50}`,
      },
      scrollView: {
        backgroundColor: `${Colors.blueGrey50}`,
        marginHorizontal: 5,
        height: 450
      },

      paragraph:{

        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        fontStyle: "italic",
        color: 'grey',
        marginTop: 180

      }
});

export default Dashboard;
import React, { Fragment, useState } from 'react';
import { 
  StyleSheet, 
  View,
  ScrollView,
  SafeAreaView } from 'react-native';
  import { 
    TextInput, 
    RadioButton, 
    Colors, 
    TouchableRipple, 
    Paragraph,
    Avatar, 
    Button } from 'react-native-paper';
import firebase from 'react-native-firebase';
import Modal from '../components/Modal';
import NavBarBack from '../components/NavBarBack';

const Registry = (props) => {

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

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  
  const [radioBtn, setRadioBtn] = useState({});
  
  const [userData, setUserData] = useState({});

  const pressHandler = () => {

    setLoading(true);

    //firebase.app()

    firebase.initializeApp(fireBaseConfig);
    firebase.database().ref('users/').push({
      
      nombre: userData.nombre,
      apellidos: userData.apellidos,
      edad: userData.edad,
      sexo:userData.sexo,
      email: userData.email,
      pass: userData.pwd
    
    }).then(() => {
    
      console.log('Inserted');
      
    }).catch((error) => {
      
      console.log(error);
      
    });

  }

  const pressHandlerMale = () => {

    setRadioBtn({checked: 'Masculino'});
    setUserData({...userData, sexo:'Masculino'});
  
  }

  const pressHandlerFemale = () => {

    setRadioBtn({checked: 'Femenino'});
    setUserData({...userData, sexo:'Femenino'});

  }

    return (  
      <Fragment>
      <View style={styles.container}>
      <NavBarBack nav={props.nav} name='Registro' />
        <SafeAreaView>
          <ScrollView 
            decelerationRate='fast'
            style={styles.scrollView}>
            <View style={styles.img}>
              <Avatar.Image 
                size={110} 
                source={require('../img/avatar-user.png')}
                theme={{colors : { primary: Colors.lightBlue100 }}}
              />
            </View>
            <TextInput 
              autoCapitalize='words'
              onChangeText={(text) => setUserData({...userData, nombre:text})}
              theme={{colors : { primary: Colors.blue300 }}}
              style={styles.textInput}
              mode='outlined'
              label='Nombre(s)'
            />
            <TextInput 
              autoCapitalize='words'
              onChangeText={(text) => setUserData({...userData, apellidos:text})}
              theme={{colors : { primary: Colors.blue300 }}}
              style={styles.textInput}
              mode='outlined'
              label='Apellido(s)'
            />
            <TextInput 
              onChangeText={(text) => setUserData({...userData, edad:text})}
              maxLength={2}
              keyboardType='numeric'
              theme={{colors : { primary: Colors.blue300 }}}
              style={styles.textInput}
              mode='outlined'
              label='Edad'
            />
            <TouchableRipple onPress={pressHandlerMale} style={styles.textInput}>
              <View style={styles.row}>
                <Paragraph style={styles.paragraphTwo}>Masculino</Paragraph>
                <View pointerEvents="none">
                  <RadioButton
                    value="first"
                    color={Colors.blue300}
                    status={
                      radioBtn.checked === 'Masculino' ? 'checked' : 'unchecked'
                    }
                  />
                </View>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={pressHandlerFemale} style={styles.textInput}>
              <View style={styles.row}>
                <Paragraph style={styles.paragraphTwo}>Femenino</Paragraph>
                <View pointerEvents="none">
                  <RadioButton
                    value="second"
                    color={Colors.pink300}
                    status={
                      radioBtn.checked === 'Femenino' ? 'checked' : 'unchecked'
                    }
                  />
                </View>
              </View>
            </TouchableRipple>
            <TextInput 
              onChangeText={(text) => setUserData({...userData, email:text})}
              keyboardType='email-address'
              theme={{colors : { primary: Colors.blue300 }}}
              style={styles.textInput}
              mode='outlined'
              label='Correo electronico'
            />
            <TextInput 
              scrollEnabled={true}
              onChangeText={(text) => setUserData({...userData, pwd:text})}
              secureTextEntry={true}
              maxLength={20}
              textContentType='password'
              theme={{colors : { primary: Colors.blue300 }}}
              style={styles.textInput}
              mode='outlined'
              label='Contraseña'
            />
            <TextInput 
              onChangeText={(text) => {

                if(text == userData.pwd){

                  setError(false);

                } else {

                  setError(true)

                }

              }}
              error={error}
              secureTextEntry={true}
              maxLength={20}
              textContentType='password'
              theme={{colors : { primary: Colors.blue300}}}
              style={styles.textInput}
              mode='outlined'
              label='Repetir contraseña'
            />
            <View style={styles.viewBtn}>
              <Button 
                mode="contained" 
                style={styles.btn}
                color={Colors.blueGrey900}
                onPress={pressHandler}>
                <Paragraph style={styles.paragraph}>Registrate</Paragraph>
              </Button>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
      {
        loading?
        <Modal nav={props.nav} message='Guardando registro' />:console.log('load ...')
      }
    </Fragment>
  );
}

const styles = StyleSheet.create({

  container: {
    flex:1,
    backgroundColor: `${Colors.blueGrey50}`
  },

  textInput: {

    marginTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
    height: 45

  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  scrollView: {
    backgroundColor: `${Colors.blueGrey50}`,
    marginHorizontal: 5,
  },

  img:{

    marginTop: 10,
    padding: 10,
    alignItems: 'center'

  },

  btn: {

    marginTop: 20,
    textAlign: 'center',
    marginBottom: 70,
    height: 45

  },

  viewBtn: {

    paddingRight: 20,
    paddingLeft: 20

  },

  paragraph : {

    color: `${Colors.blue200}`,
    fontWeight: 'bold'

  },

  paragraphTwo : {

    color: 'gray',
    fontWeight: 'bold'

  }
});
 
export default Registry;
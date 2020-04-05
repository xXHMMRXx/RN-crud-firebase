import React, { Fragment, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Colors, Provider, Menu, Paragraph } from 'react-native-paper';
import Dashboard from '../components/Dashboard';

const Home = (props) => {
    
    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(false);
    const [del, setDel] = useState(false);
    const [icon, setIcon] = useState({ 

        id: 1,
        icon: 'account-card-details'

     });
    
    const [url, setUrl] = useState({

        url: 'https://picsum.photos/400/300?random=1&blur=1'

    });

    return (  
        <Fragment>
            <View style={styles.container}>
                <Provider >
                    <Appbar.Header theme={{colors : { primary: Colors.blueGrey900}}} >
                        <Appbar.Content
                            title="Usuarios"
                            color={Colors.blue200}
                        />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end'
                            }}>
                            <Appbar.Action icon="magnify" color={Colors.blue200} />
                                <Menu
                                    contentStyle={styles.menu}
                                    style={{marginTop: 40}}
                                    visible={visible}
                                    onDismiss={() => {setVisible(false)}}
                                    anchor={
                                        <Appbar.Action 
                                            icon="dots-vertical" 
                                            color={Colors.blue200} 
                                            onPress={() => {setVisible(true)}} />
                                    }
                                >
                                    <Menu.Item
                                        title={
                                            <Paragraph style={styles.title}>Información</Paragraph>
                                        }
                                        icon='account-card-details' 
                                        onPress={() => {
                                            
                                            console.log('Informacion');
                                            setIcon({ id: 1, icon: 'account-card-details' });

                                            function timer(){

                                                setVisible(false);
                                                setDel(false);
                                                setEdit(false);
                                            }

                                            setTimeout(timer ,300);
                                        
                                        }} />
                                    <Menu.Item 
                                        title={
                                            <Paragraph style={styles.title}>Editar</Paragraph>
                                        }
                                        icon='square-edit-outline'
                                        onPress={() => {

                                            console.log('Editar');
                                            setIcon({ id: 2, icon:'square-edit-outline' });

                                            function timer(){

                                                setVisible(false);
                                                setEdit(true);
                                                setDel(false);

                                            }

                                            setTimeout(timer ,300);
                                            
                                        }} />
                                    <Menu.Item
                                        title={
                                            <Paragraph style={styles.title}>Eliminar</Paragraph>
                                        }
                                        icon='delete-empty' 
                                        onPress={() => {
                                            
                                            console.log('Eliminar');
                                            setIcon({ id: 3, icon:'delete-empty' });

                                            function timer(){

                                                setVisible(false);
                                                setDel(true);
                                                setEdit(false);

                                            }

                                            setTimeout(timer ,300);
                                        
                                        }} />
                                </Menu>
                            </View>
                    </Appbar.Header>
                    <Dashboard 
                        nav={props.nav} 
                        state={props.state} 
                        edit={edit} 
                        del={del} 
                        icon={icon.icon} 
                        id={icon.id} 
                        url={url.url} />
                </Provider>
            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({

    container: {
        flex:1
      },
    
    menu:{

        backgroundColor: Colors.blueGrey50,

    },

    title : {

        fontWeight: 'bold'
    
    }

});

export default Home;
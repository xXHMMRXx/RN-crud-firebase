import React, { Fragment } from 'react';
import { 
    StyleSheet, 
    View } from 'react-native';
import { FAB, Colors } from 'react-native-paper';

const Fab = (props) => {

    return (  
        <Fragment>
            <View style={styles.container}>
                <FAB
                    theme={{colors : { primary: Colors.blueGrey900}}}
                    color={Colors.blue200}
                    style={styles.fab}
                    icon="plus"
                    onPress={() => props.nav.navigate('Registry')}
                />
            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: `${Colors.blueGrey50}`
      },

    fab: {
        backgroundColor: `${Colors.blueGrey900}`,
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
    }
  })
 
export default Fab;
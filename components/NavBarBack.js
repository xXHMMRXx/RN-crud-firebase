import React, { Fragment } from 'react';
import { Appbar, Colors } from 'react-native-paper';

const NavBarBack = (props) => {
    return (  
        <Fragment>
            <Appbar.Header theme={{colors : { primary: Colors.blueGrey900}}}>
                <Appbar.BackAction
                    color={Colors.blue200}
                    onPress={() => props.nav.navigate('Home')}
                />
                <Appbar.Content
                    title={props.name}
                    color={Colors.blue200}
                />
                {/*<Appbar.Action icon="magnify" onPress={this._handleSearch} />*/}
                {/*<Appbar.Action icon="dots-vertical" onPress={this._handleMore} />*/}
            </Appbar.Header>
        </Fragment>
    );
}
 
export default NavBarBack;
import React, { Fragment, useState } from 'react';
import { ProgressDialog } from 'react-native-simple-dialogs';

const Modal = (props) => {

    const [load, setLoad] = useState(true);

        var timer = () => {

            setLoad(false);
            Back();

        }

        setTimeout(timer, 2000);

    const Back = () => {

        props.nav.navigate('Home');

    }

    return (  
        <Fragment>
            <ProgressDialog 
                visible={load} 
                title={props.message}
                message="Por favor, espere..."
            />
        </Fragment>
    );
}
 
export default Modal;
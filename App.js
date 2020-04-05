
import React, { Fragment } from 'react';
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Registry from './screens/Registry';
import Update from './components/Update';

function HomeScreen({ navigation }) {
  return (
    <Home nav={navigation} state={true} />
  );
}

function RegistryScreen({ navigation }) {
  return (
    <Registry nav={navigation} />
  );
}

function UpdateScreen({ navigation, route }) {

  const { params } = route.params;

  return (
    <Update nav={navigation} params={params} />
  );
}

const App = () => {

  console.disableYellowBox = true;

  const Stack = createStackNavigator ( );

  return (  
    <Fragment>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='Home'
          screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name='Home' component={HomeScreen}/>
          <Stack.Screen name='Registry' component={RegistryScreen}/>
          <Stack.Screen name='Update' component={UpdateScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
}

export default App;
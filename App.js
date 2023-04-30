import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {useFonts} from 'expo-font'
import Login from './screens/Login';
import Signup from './screens/Signup';
import CommunityTimeline from './screens/CommunityTimeline';
import AskCommunity from './screens/AskCommunity';
import IndividualQuery from './screens/IndividualQuery'
import DetectionScreen from './screens/DetectionScreen';
import DetectionScreen2 from './screens/DetectionScreen2';
import ForgotPassword from './screens/ForgotPassword';
import HomeScreen from './screens/HomeScreen';
import Loader from './screens/Loader';
import Scanner from './screens/Scanner'
import PlantCareTips from './screens/PlantCareTips';
import DiseaseInfo from './screens/DiseaseInfo';
import SinglePCT from './screens/SinglePCT';
import SingleDB from './screens/SingleDB';
import DiseaseBox from './components/DiseaseBox';
import { TabBar } from './components';
import UserProfile from './screens/UserProfile';
import ImageUpload from './screens/ImageUpload';

const Stack=createNativeStackNavigator()

const theme={
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
}

export default function App() {
  const [loaded]=useFonts({
    InterBold: require('./assets/fonts/Inter-Bold.ttf'),
    InterSemiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
    InterMedium: require('./assets/fonts/Inter-Medium.ttf'),
    InterRegular: require('./assets/fonts/Inter-Regular.ttf'),
    InterLight: require('./assets/fonts/Inter-Light.ttf')
  }) 

  if(!loaded) return null;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Signup">
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Signup' component={Signup}/>
        <Stack.Screen name='ForgotPassword' component={ForgotPassword}/>
        <Stack.Screen name='CommunityTimeline' component={CommunityTimeline}/>
        <Stack.Screen name='AskCommunity' component={AskCommunity}/>
        <Stack.Screen name='IndividualQuery' component={IndividualQuery}/>
        <Stack.Screen name='DetectionScreen' component={DetectionScreen}/>
        <Stack.Screen name='DetectionScreen2' component={DetectionScreen2}/>
        <Stack.Screen name='HomeScreen' component={HomeScreen}/>
        <Stack.Screen name='Loader' component={Loader}/>
        <Stack.Screen name='Scanner' component={Scanner}/>
        <Stack.Screen name='PlantCareTips' component={PlantCareTips}/>
        <Stack.Screen name='DiseaseInfo' component={DiseaseInfo}/>
        <Stack.Screen name='SinglePCT' component={SinglePCT}/>
        <Stack.Screen name='DiseaseBox' component={DiseaseBox}/>
        <Stack.Screen name='SingleDB' component={SingleDB}/>
        <Stack.Screen name='UserProfile' component={UserProfile}/>
        <Stack.Screen name='ImageUpload' component={ImageUpload}/>
        <Stack.Screen name='TabBar' component={TabBar}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

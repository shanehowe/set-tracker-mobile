import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChooseSignInMethodScreen } from '../screens/ChooseSignInMethodScreen';
import { ChooseSignUpMethod } from '../screens/ChooseSignUpMethodScreen';
import { SignInEmailPasswordScreen } from '../screens/SignInEmailPasswordScreen';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName='SignIn'>
            <Stack.Screen 
                name="SignIn"
                component={ChooseSignInMethodScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='SignUp'
                component={ChooseSignUpMethod}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='SignInEmailPassword'
                component={SignInEmailPasswordScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../pages/LoginPage";
import Main from "../pages/MainPage";

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name="Main" component={Main} options={{headerShown: false}}></Stack.Screen>
        </Stack.Navigator>
    )
}
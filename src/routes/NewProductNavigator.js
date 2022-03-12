import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormNewProduct from "../pages/ProductsPage/formNewProduct";

const RootStack = createNativeStackNavigator();

export default function NewProductNavigator() {
  return (
    <RootStack.Navigator>
        <RootStack.Screen
          name="teste"
          component={FormNewProduct}
          options={{ headerShown: false }}
        />
    </RootStack.Navigator>
  );
}

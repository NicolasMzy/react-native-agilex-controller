import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer} from "react-navigation";
import home from '../screens/home';
import control from '../screens/control';


const screens = {
    
    home: {
        screen: home,
    },

    joystick : {
        screen: control,
    },
 
}

const HomeStack = createStackNavigator(screens,{defaultNavigationOptions:{
    
        headerShown: false,
    }
});

export default createAppContainer(HomeStack);
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import ScanButton from '../src/components/ScanButton';
import Scan from '../src/components/Scan';

const screens = {
    ScanButton: {
        screen: ScanButton
    },
    Scan: {
        screen: Scan
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
import { createStackNavigator } from 'react-navigation';
import Login from './Login';
import TaskForm from './TaskForm';
import DisplayScreen from './DisplayScreen';

export default createStackNavigator({
    'Login': { screen: Login },
    'TaskForm': { screen: TaskForm },
    'DisplayScreen': { screen: DisplayScreen }
},
    {
        initialRouteName: 'Login',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        }
    }
)
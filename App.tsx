import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthProvider} from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;

// import React from 'react';
// import {Button, Text, View} from 'react-native';
// import {Provider, useDispatch, useSelector} from 'react-redux';
// import {store} from './src/store';
// import {decremnt, increment, resetValue} from './src/slice/createSlice';

// const DummyData = () => {
//   const value = useSelector((state: any) => state.counter.value);
//   const dispatch = useDispatch();
//   return (
//     <View>
//       <Text>{value}</Text>
//       <Button
//         color="red"
//         title="Increment"
//         onPress={() => {
//           dispatch(increment(1));
//         }}></Button>
//       <Button
//         color="red"
//         title="Decrement"
//         onPress={() => {
//           dispatch(decremnt(2));
//         }}></Button>
//       <Button
//         color="red"
//         title="Reset"
//         onPress={() => {
//           dispatch(resetValue());
//         }}></Button>
//     </View>
//   );
// };
// const App = () => {
//   return (
//     <Provider store={store}>
//       <DummyData />
//     </Provider>
//   );
// };

// export default App;

import React from 'react';
import AppNavigator from './src/navigators/AppNavigator';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;

import React from 'react';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducer from './store/reducers';
import MainScreen from './screens/MainScreen/MainScreen';
import './App.css';

function App() {

  const store = createStore(reducer, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>

    
    <div className="App">
     <MainScreen/>
    </div>
    </Provider>
  );
}

export default App;

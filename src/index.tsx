import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { compose, createStore  } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/root-reducer';

const composeEnhancers =
typeof window === 'object' &&
(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers()

export const store = createStore(rootReducer, enhancer); 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

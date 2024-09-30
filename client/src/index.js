import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes';
import { Provider } from 'react-redux'
import { store } from './store/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
  <RouterProvider router={router}>
  </RouterProvider>
  </Provider>

);
reportWebVitals();

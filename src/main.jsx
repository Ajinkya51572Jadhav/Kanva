import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
// import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";

import App from './App.jsx'
import { store } from './redux/store.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <ConfigProvider locale={enUS}>
        <App />
      </ConfigProvider>
      {/* </PersistGate> */}
    </Provider>
  </StrictMode>,
);
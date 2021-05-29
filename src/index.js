import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ChakraProvider, extendTheme } from "@chakra-ui/react"

import { RecoilRoot } from 'recoil'
const theme = extendTheme({
  colors: {
    brandgray: {
      50: '#718093',
      100: '#23262E',
      200: '#292C34',
      900: '#14171C'
    },
    brandpurple: {
      100: '#8C7AE6'
    },
    brandred: {
      50: '#FF7676',
      100: '#FF4D4D'
    },
    brandgreen: {
      50: '#83B76D',
      100: '#6AB04C'
    },
    brandblue: {
      50: '#94C6CB',
      100: '#57A2A9'
    }
  },
  styles: {
    global: {
      body: {
        bg: "#23262E",
      },
    },
  },
})


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
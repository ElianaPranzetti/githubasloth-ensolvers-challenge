import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react'
import { Context } from './hooks/Context'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeScript />
    <BrowserRouter>
      <Context>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </Context>

    </BrowserRouter>
  </React.StrictMode>
)

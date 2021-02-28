import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'fontsource-roboto'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffab40',
    },
    secondary: {
      main: '#00695c',
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

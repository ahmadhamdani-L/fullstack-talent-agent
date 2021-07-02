import React from 'react'
import { hydrate } from 'react-dom'
import App from './App'
import './assets/styles/index.css';
import {Provider} from 'react-redux'
import store from './views/store'



hydrate(<Provider store={store}><App/></Provider>, document.getElementById('root'))

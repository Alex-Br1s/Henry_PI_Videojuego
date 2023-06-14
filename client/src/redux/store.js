import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk';

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;// esta linea sirve para conectar nuetra App con la extensión REDUX DEVTOOLS del NAVEGADOR

const store = createStore(
    reducer, composeEnhancers(applyMiddleware(thunkMiddleware)));//esta linea sirve para que podamos hacer peticiones a una API/SERVIDOR

export default store;





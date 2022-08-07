import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store/index';
import './index.css';
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

/*
* REDUX:
* it's the same fucking thing as context API, but it's more cake.
*
* 1. so, first you create the store (see store/index.js) and wrap your app with Provider from react-redux.
*
* 2. then you create each slice. each slice is a part of store that holds some states. createSlice() has a routine that
* you can see in cart-slice.js.
* each slice holds some data and has some reducer functions. reducer functions are responsible for changing the data.
* each reducer function gets two arguments: state and action. state is the current state of the slice which can be
* mutated. action is the action that was dispatched from the component.
* after that you export the actions. actions are the functions that you can call from the component.
*
* 3. in components:
*   a) you can use the actions from the slice by useDispatch() hook and importing the actions. (to change state of
*      the slice)
*   b) you can use the state data from the slice by useSelector().

* */
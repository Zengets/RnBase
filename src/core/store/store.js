import { createStore } from 'redux'
import themeReducer from '../reducer/reducer';

let store = createStore(themeReducer);

export default store
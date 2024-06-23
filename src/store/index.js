import { createStore, combineReducers, compose, applyMiddleware} from 'redux';
import filters from '../reducers/filtersSlice';
import heroes from '../reducers/heroesSlice';
import ReduxThunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit';
const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);

    const oldDispatch = store.dispatch;
    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return oldDispatch({
                type: action
            })
        }
        return oldDispatch(action)
    }
    return store;
}
// const store = createStore( 
//     combineReducers({heroes, filters}),
//     compose(applyMiddleware(ReduxThunk),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     ));

const store  =  configureStore({
    reducer:{heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools:process.env.NODE_ENV !== "production"
})

export default store;
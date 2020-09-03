import { configureStore, combineReducers } from '@reduxjs/toolkit'
import reducers from './reducers'
const rootReducer = combineReducers(reducers)
export default configureStore({
    reducer: rootReducer,
})

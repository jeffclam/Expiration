import { configureStore } from '@reduxjs/toolkit'
import expirationReducer from './reducers/expirables'

export default configureStore({
    reducer: expirationReducer,
})

import { configureStore } from '@reduxjs/toolkit'
import expirationReducer from './expirables/expirablesReducer'

export default configureStore({
    reducer: expirationReducer,
})

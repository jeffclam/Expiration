import { ACTIONS } from '../const'
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    expirables: [],
    fetchErr: null,
    saveErr: null,
}

export const expirablesReducer = createReducer(initialState, {
    [ACTIONS.FETCH_EXPIRABLES_COMPLETE]: (state, action) => {
        const { payload } = action
        const { expirables, err } = payload
        if (err) {
            return Object.assign({}, state, {
                fetchErr: err,
            })
        }
        return Object.assign({}, state, {
            expirables,
            fetchErr: null,
        })
    },
    [ACTIONS.SAVE_EXPIRABLE_COMPLETE]: (state, action) => {
        const { payload } = action
        const { expirable, err } = payload
        if (err) {
            return Object.assign({}, state, {
                saveErr: err,
            })
        }
        return Object.assign({}, state, {
            expirables: [...state.expirables, expirable],
            saveErr: null,
        })
    },
})

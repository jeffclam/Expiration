import { ACTIONS } from '../const'
import { createReducer } from '@reduxjs/toolkit'
import { GetDateString } from '../../common/utils'

const initialState = {
    focusDate: GetDateString(new Date()),
}

export const dateReducer = createReducer(initialState, {
    [ACTIONS.SET_DATE]: (state, action) => {
        const { payload } = action
        const { newDate } = payload
        return Object.assign(state, {
            focusDate: newDate,
        })
    }
})

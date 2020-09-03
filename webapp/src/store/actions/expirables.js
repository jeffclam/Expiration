import * as api from '../../api'
import { ACTIONS, APIPaths } from '../const'

// fetchExpirables fetches the list of expirables from the server
export const fetchExpirables = () => {
    return (dispatch) => {
        dispatch({
            type: ACTIONS.FETCH_EXPIRABLES,
        })

        return api.call(APIPaths.expirable, 'GET').then(
            (expirables) => {
                dispatch({
                    type: ACTIONS.FETCH_EXPIRABLES_COMPLETE,
                    payload: { expirables }
                })
            },
            (err) => {
                dispatch({
                    type: ACTIONS.FETCH_EXPIRABLES_COMPLETE,
                    payload: { err }
                })
            }
        )
    }
}

// saveExpirable sends an expirable item to the server to be saved
export const saveExpirable = (expirable) => {
    return (dispatch) => {
        return api.call(APIPaths.expirable, 'POST', expirable).then(
            (expirable) => {
                dispatch({
                    type: ACTIONS.SAVE_EXPIRABLE_COMPLETE,
                    payload: { expirable },
                })
            },
            (err) => {
                dispatch({
                    type: ACTIONS.SAVE_EXPIRABLE_COMPLETE,
                    payload: { err }
                })
            }
        )
    }
}

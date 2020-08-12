import * as api from '../../api'

// saveExpirable sends an expirable item to the server to be saved
export const saveExpirable = (expirable) => {
    return api.call(api.APIPath.expirable, api.Method.POST, expirable)
}

export const fetchExpirables = () => {
    return api.call(api.APIPath.expirable, api.Method.GET)
}

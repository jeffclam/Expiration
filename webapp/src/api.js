export const Method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
}

export const APIPath = {
    expirable: '/api/expirable'
}

export const call = (url, method, payload) => {
    const option = {
        method: method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
    }

    return fetch(url, option)
        .then(response => response.json())
        .then(data => data)
}

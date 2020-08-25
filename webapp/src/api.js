export const call = (url, method, payload) => {
    const option = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }

    return fetch(url, option)
        .then(response => response.json())
        .then(data => data)
}

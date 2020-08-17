export const GetDateString = (date) => {
    return date.toISOString().split('T')[0]
}

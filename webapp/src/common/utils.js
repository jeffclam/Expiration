export const GetDateString = (date) => {
    return date.toISOString().split('T')[0]
}

export const GetDiffInDays = (date1, date2) => {
    return Math.ceil((date1 - date2) / (1000 * 60 * 60 * 24))
}

import React, { useState, useEffect } from 'react'
import styles from './Calendar.module.css'
import _ from 'lodash'
import { GetDateString } from '../../common/utils'

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const Calendar = ({ expirables, focusDate }) => {
    const [monthsItems, setMonthsItems] = useState({})

    useEffect(() => {
        const items = _.filter(expirables, item => {
            return new Date(item.expirationDate).getFullYear() === focusDate.getFullYear()
        })
        const sortedItems = _.groupBy(items, item => item.expirationDate)
        setMonthsItems(sortedItems)
    }, [expirables, focusDate])

    const renderDay = (date) => {
        const daysItems = monthsItems[GetDateString(date)]
        const expiredStyle = date < focusDate ? styles.expired : ''
        const list = _.map(daysItems, item => {
            return <div className={expiredStyle} key={item._id}>{item.itemName}</div>
        })

        return (
            <div className={styles.day} key={`${date.getMonth()}-${date.getDate()}`}>
                <div className={styles.day_number}>{date.getDate()}</div>
                <div className={styles.day_list}>{list}</div>
            </div>
        )
    }

    const renderWeek = (week) => {
        const day1 = new Date(week[0])
        const r = _.range(day1.getDay())
        _.each(r, () => {
            week.unshift(new Date(day1.setDate(day1.getDate() - 1)))
        })

        const lastDay = new Date(week[week.length - 1])
        const r2 = _.range(lastDay.getDay(), 6)
        _.each(r2, () => {
            week.push(new Date(lastDay.setDate(lastDay.getDate() + 1)))
        })

        const days = _.map(week, (day) => {
            return renderDay(day)
        })

        return <div className={styles.week} key={`${week[0].getDate()}`}>{days}</div>
    }

    const renderMonth = (month, year) => {
        const parser = new Date(year, month, 1)
        const monthDates = []
        while (parser.getMonth() === month) {
            monthDates.push(new Date(parser))
            parser.setDate(parser.getDate() + 1)
        }

        const weeks = []
        _.each(monthDates, (monthDay) => {
            if (!weeks.length || monthDay.getDay() === 0) {
                weeks.push([])
            }
            weeks[weeks.length - 1].push(monthDay)
        })

        return _.map(weeks, (week) => { return renderWeek(week) })
    }

    return (
        <div className={styles.container}>
            <div className={styles.month_name}>{focusDate.toLocaleString('default', { month: 'long' })} {focusDate.getFullYear()}</div>
            <div className={styles.weekdays}>
                {_.map(weekdays, (weekday) => { return <div className={styles.weekday} key={weekday}>{weekday}</div> })}
            </div>
            {renderMonth(focusDate.getMonth(), focusDate.getFullYear())}
        </div>
    )
}

export default Calendar

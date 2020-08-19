import React, { useState, useEffect, Fragment } from 'react'
import styles from './HomeView.module.css'
import { saveExpirable, fetchExpirables } from './api'
import { GetDateString, GetDiffInDays } from '../../common/utils'
import _ from 'lodash'
import Calendar from '../../components/Calendar'

const HomeView = () => {
    const [itemName, setItem] = useState('')
    const [category, setCategory] = useState('')
    const [expirationDate, setDate] = useState(GetDateString(new Date()))
    const [lifeSpan, setLifeSpan] = useState(0)
    const [expirables, setExpirables] = useState([])

    useEffect(() => {
        fetchExpirables().then(results => {
            setExpirables(results)
        })
    }, [])

    const submit = (event) => {
        if (itemName && category) {
            saveExpirable({ itemName, category, expirationDate, lifeSpan }).then(
                result => {
                    setExpirables([...expirables, ...result])
                    setItem('')
                    setCategory('')
                    setDate(new Date().toISOString().split('T')[0])
                }
            )
        } else {
            alert('item and category must be filled in')
        }
        event.preventDefault()
    }

    const renderExpirablesList = () => {
        const monthsExpirables = _.filter(expirables, item => {
            return new Date(item.expirationDate) > new Date()
        })

        if (!monthsExpirables.length) {
            return <div>No expirables left this month</div>
        }

        const expirableByCategory = _.groupBy(monthsExpirables, item => item.category)
        return _.map(expirableByCategory, (categorySet, categoryName) => {
            const items = _.map(categorySet, (expirable) => {
                const date = new Date(expirable.expirationDate)
                const daysLeft = GetDiffInDays(date, new Date())
                return <li className={styles.expirables_list_item} key={expirable._id}>{expirable.itemName} - {daysLeft} day(s) left</li>
            })
            return (
                <Fragment key={categoryName}>
                    <div className={styles.categoryName}>{categoryName}</div>
                    <ul className={styles.expirables_list}>{items}</ul>
                </Fragment>
            )
        })
    }

    return (
        <div className={styles.page}>
            <Calendar expirables={expirables} />
            <div className={styles.container}>
                <div className={styles.expirables_list_container}>
                    <div className={styles.title}>Expirables</div>
                    {renderExpirablesList()}
                </div>
                <form className={styles.form} onSubmit={submit}>
                    <div className={styles.title}>Insert Expirable</div>
                    <label className={styles.input_wrapper}>
                        Item:
                <input className={styles.input} type="text" value={itemName} placeholder="Item Name" onChange={({ target }) => { setItem(target.value) }} />
                    </label>
                    <label className={styles.input_wrapper}>
                        Category:
                <input className={styles.input} type="text" value={category} placeholder="Category" onChange={({ target }) => { setCategory(target.value) }} />
                    </label>
                    <label className={styles.input_wrapper}>
                        Exp. Date:
                <input className={styles.input} type="date" value={expirationDate} onChange={({ target }) => { setDate(target.value) }} />
                    </label>
                    <label className={styles.input_wrapper}>
                        Life Span:
                <input className={styles.input} type="number" value={lifeSpan} onChange={({ target }) => { setLifeSpan(target.value) }} />
                    </label>
                    <input className={styles.submit_button} type="submit" />
                </form>
            </div>
        </div>
    )
}

export default HomeView

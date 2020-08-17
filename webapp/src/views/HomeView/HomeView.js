import React, { useState, useEffect, Fragment } from 'react'
import styles from './HomeView.module.css'
import { saveExpirable, fetchExpirables } from './api'
import { GetDateString } from '../../common/utils'
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

    const renderExpirables = () => {
        const expirableByCategory = {}
        _.each(expirables, (item) => {
            if (expirableByCategory[item.category]) {
                expirableByCategory[item.category].push(item)
            } else {
                expirableByCategory[item.category] = [item]
            }
        })

        return _.map(expirableByCategory, (categorySet, categoryName) => {
            const items = _.map(categorySet, (expirable) => {
                const date = new Date(expirable.expirationDate)
                const daysLeft = Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24))
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
        <>
            <Calendar expirables={expirables}/>
            <div className={styles.container}>
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
                        Expiration Date:
                <input className={styles.input} type="date" value={expirationDate} onChange={({ target }) => { setDate(target.value) }} />
                    </label>
                    <label className={styles.input_wrapper}>
                        Life Span:
                <input className={styles.input} type="number" value={lifeSpan} onChange={({ target }) => { setLifeSpan(target.value) }} />
                    </label>
                    <input className={styles.submit_button} type="submit" />
                </form>
                <div className={styles.expirables_list_container}>
                    <div className={styles.title}>Expirables</div>
                    {renderExpirables()}
                </div>
            </div>
        </>
    )
}

export default HomeView

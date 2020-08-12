import React, { useState, useEffect } from 'react'
import styles from './HomeView.module.css'
import { saveExpirable, fetchExpirables } from './api'
import _ from 'lodash'

const HomeView = () => {
    const [itemName, setItem] = useState('')
    const [category, setCategory] = useState('')
    const [expirationDate, setDate] = useState(new Date().toISOString().split('T')[0])
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
        const items = _.map(expirables, (expirable) => {
            const date = new Date(expirable.expirationDate)
            const daysLeft = Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24))
            return (
                <li key={expirable._id}>{expirable.itemName} - {daysLeft} day(s) left</li>
            )
        })

        return <ul className={styles.expirables_list}>{items}</ul>
    }

    return (
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
    )
}

export default HomeView

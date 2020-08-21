import React, { useState } from 'react'
import styles from './ExpirableForm.module.css'
import { GetDateString } from '../../common/utils'
import { saveExpirable } from '../../common/api'

const ExpirableForm = ({ callback }) => {
    const [itemName, setItem] = useState('')
    const [category, setCategory] = useState('')
    const [expirationDate, setDate] = useState(GetDateString(new Date()))
    const [lifeSpan, setLifeSpan] = useState(0)

    const submit = (event) => {
        if (itemName && category) {
            saveExpirable({ itemName, category, expirationDate, lifeSpan }).then(
                expirables => {
                    setItem('')
                    setCategory('')
                    setDate(GetDateString(new Date()))
                    if (callback) {
                        callback(expirables)
                    }
                }
            )
        } else {
            alert('item and category must be filled in')
        }
        event.preventDefault()
    }

    return (
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
    )
}

export default ExpirableForm
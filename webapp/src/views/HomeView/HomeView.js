import React, { useState } from 'react'
import styles from './HomeView.module.css'
import { saveExpirable } from './api'

const HomeView = () => {

    const [item, setItem] = useState('')
    const [category, setCategory] = useState('')
    const [expirationDate, setDate] = useState(new Date().toISOString().split('T')[0])
    const [lifeSpan, setLifeSpan] = useState(0)

    const submit = (event) => {
        saveExpirable({item, category, expirationDate, lifeSpan})
        event.preventDefault()
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <div className={styles.form_title}>Insert Expirable</div>
            <label className={styles.input_wrapper}>
                Item:
                <input className={styles.input} type="text" value={item} placeholder="Item Name" onChange={({ target }) => {setItem(target.value)}} />
            </label>
            <label className={styles.input_wrapper}>
                Category:
                <input className={styles.input} type="text" value={category} placeholder="Category" onChange={({ target }) => {setCategory(target.value)}} />
            </label>
            <label className={styles.input_wrapper}>
                Expiration Date:
                <input className={styles.input} type="date" value={expirationDate} onChange={({ target }) => {setDate(target.value)}} />
            </label>
            <label className={styles.input_wrapper}>
                Life Span:
                <input className={styles.input} type="number" value={lifeSpan} onChange={({ target }) => {setLifeSpan(target.value)}} />
            </label>
            <input className={styles.submit_button} type="submit" />
        </form>
    )
}

export default HomeView
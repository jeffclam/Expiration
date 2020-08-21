import React, { useState, useEffect } from 'react'
import styles from './HomeView.module.css'
import { fetchExpirables } from '../../common/api'
import Calendar from '../../components/Calendar'
import ExpirablesList from '../../components/ExpirablesList'
import ExpirableForm from '../../components/ExpirableForm'

const HomeView = () => {
    const [expirables, setExpirables] = useState([])

    useEffect(() => {
        fetchExpirables().then(results => {
            setExpirables(results)
        })
    }, [])

    return (
        <div className={styles.page}>
            <Calendar expirables={expirables} />
            <div className={styles.sidebar}>
                <ExpirablesList expirables={expirables} />
                <ExpirableForm callback={newExpirables => setExpirables([...expirables, ...newExpirables])} />
            </div>
        </div>
    )
}

export default HomeView

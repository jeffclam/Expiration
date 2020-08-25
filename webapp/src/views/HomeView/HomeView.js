import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './HomeView.module.css'
import Calendar from '../../components/Calendar'
import ExpirablesList from '../../components/ExpirablesList'
import ExpirableForm from '../../components/ExpirableForm'
import { fetchExpirables } from '../../store/expirables/expirablesActions'

const HomeView = () => {
    const dispatch = useDispatch()
    const expirables = useSelector(store => store.expirables)
    
    useEffect(() => {
        dispatch(fetchExpirables())
    }, [dispatch])

    return (
        <div className={styles.page}>
            <Calendar expirables={expirables} />
            <div className={styles.sidebar}>
                <ExpirablesList expirables={expirables} />
                <ExpirableForm />
            </div>
        </div>
    )
}

export default HomeView

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './HomeView.module.css'
import Calendar from '../../components/Calendar'
import ExpirablesList from '../../components/ExpirablesList'
import ExpirableForm from '../../components/ExpirableForm'
import { fetchExpirables } from '../../store/actions'

const HomeView = () => {
    const dispatch = useDispatch()
    const { expirables } = useSelector(({ expirablesReducer }) => expirablesReducer)
    const { focusDate } = useSelector(({ dateReducer }) => dateReducer)
    const [date, setDate] = useState(new Date(focusDate))

    useEffect(() => {
        dispatch(fetchExpirables())
    }, [dispatch])

    return (
        <div className={styles.page}>
            <Calendar expirables={expirables} focusDate={date} setDate={setDate} />
            <div className={styles.sidebar}>
                <ExpirablesList expirables={expirables} />
                <ExpirableForm />
            </div>
        </div>
    )
}

export default HomeView

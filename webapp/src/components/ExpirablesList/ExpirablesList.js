import React, { Fragment } from 'react'
import styles from './ExpirablesList.module.css'
import { GetDiffInDays } from '../../common/utils'
import _ from 'lodash'

const ExpirablesList = ({ expirables, setExpirables, saveExpirable }) => {
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
        <div className={styles.expirables_list_container}>
            <div className={styles.title}>Expirables</div>
            {renderExpirablesList()}
        </div>
    )
}

export default ExpirablesList
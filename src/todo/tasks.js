import React, { useState } from "react"
import styles from './taskstyles.module.css'

export default function Tasks(props) {
    const { tasks, editTask } = props

    const handleEdit = (id, value) => {
        //could call redux store with a debounce for better performance
        editTask({id, title: value})
    }

    return (
        <div className={styles.tasksContainer}>
        {
            tasks.map(task => {
                return (
                    <div key={task.id} className={styles.task}>
                        <div className={styles.marker}>oo</div>
                        <input
                            className={styles.title}
                            value={task.title}
                            placeholder="What do you want to do?"
                            onChange={e => handleEdit(task.id, e.target.value)}
                        />
                    </div>
                )}
            )
        }
        </div>
    )
}
import React, { useState } from "react"
import styles from './taskstyles.module.css'

export default function Tasks(props) {
    const { tasks, editTask, deleteTask } = props

    const handleEdit = (payload) => {
        //could call redux store with a debounce for better performance
        editTask(payload)
    }

    return (
        <div className={styles.tasksContainer}>
            {
                <TaskSection
                    tasks={tasks.filter(i=>i.status!=='done')}
                    sectionTitle={'Active'}
                    handleEdit={handleEdit}
                    deleteTask={deleteTask}
                />
            }
            {
                <TaskSection
                    tasks={tasks.filter(i=>i.status==='done')}
                    sectionTitle={'Completed'}
                    handleEdit={handleEdit}
                    deleteTask={deleteTask}
                />
            }
        </div>
    )
}

const TaskSection = (props) => {
    const { tasks, handleEdit, sectionTitle, deleteTask } = props
    if(tasks.length===0) return null
    return (
        <div className={styles.section}>
            <div className={styles.sectiontitle}>{sectionTitle}</div>
        {
            tasks.map(task => {
                return (
                    <div key={task.id} className={styles.task}>
                        <div
                            className={styles.marker}
                            onClick={()=>handleEdit({id: task.id, status: task.status!=='done' ? 'done' : 'active'})}
                            title="Toggle status"
                        >
                            <svg height="12" width="12">
                                <circle cx="6" cy="6" r="5" stroke-width="2"/>
                            </svg>
                        </div>
                        <input
                            className={`${styles.title} ${task.status==='done' ? styles.completed : styles.active}`}
                            value={task.title}
                            placeholder="What do you want to do?"
                            onChange={e => handleEdit({id: task.id, title: e.target.value})}
                        />
                        <div className={styles.delete} onClick={()=>deleteTask({id: task.id})} title="Delete">x</div>
                    </div>
                )}
            )
        }
        </div>
    )
}
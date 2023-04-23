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
                            onClick={()=>handleEdit({id: task.id, status: !task.status ? 'done' : 'active'})}
                        >
                            o
                        </div>
                        <input
                            className={styles.title}
                            value={task.title}
                            placeholder="What do you want to do?"
                            onChange={e => handleEdit({id: task.id, title: e.target.value})}
                        />
                        <div className={styles.delete} onClick={()=>deleteTask({id: task.id})}>X</div>
                    </div>
                )}
            )
        }
        </div>
    )
}
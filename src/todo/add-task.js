import React, { useState } from 'react'
import taskstyles from './taskstyles.module.css'

export default function AddTask(props) {
    const [task, setTask] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        //submits only when task item is not empty
        if(task.trim()!=='') {
            props.addTask({title: task})
            setTask('')
        }
    }

    return (
        <div className={`${taskstyles.task} ${taskstyles.taskinput}`}>
            {/* <div className={taskstyles.marker}>o</div> */}
            <form onSubmit={handleSubmit} >
                <input
                    className={`${taskstyles.task} ${taskstyles.taskinput}`}
                    placeholder="Add task"
                    value={task}
                    onChange={e => {setTask(e.target.value)}}
                />
            </form>
        </div>
    )
}
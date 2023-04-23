import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchTasks,
  add_task,
  edit_task,
  delete_task,
  mark_done,
} from './redux';
import AddTask from './add-task'
import Tasks from './tasks'
import styles from './index.module.css'

export function TasksContainer() {
  const loading = useSelector(state => state.tasks.loading)
  const tasks = useSelector(state => state.tasks.tasks)

  const dispatch = useDispatch()

  //fetch tasks using api right after first render
  useEffect(() => {
    console.log(`fetching tasks`)
    dispatch(fetchTasks())
  }, [])

  return (
    <>
      <div className={styles.markAll} onClick={()=>dispatch(mark_done())}>Mark All as Done</div>
      <AddTask addTask={payload => dispatch(add_task(payload))} />
      <Tasks
        loading={loading}
        tasks={tasks}
        editTask={payload => dispatch(edit_task(payload))}
        deleteTask={(payload)=>dispatch(delete_task(payload))}
      />
    </>
  );
}

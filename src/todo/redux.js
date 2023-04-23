import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get_tasks, update_task } from './api';

const initialState = {
  value: 0,
  status: 'idle',
  loading: false,
  tasks: [],
};

export const fetchTasks = createAsyncThunk(
  'tasks/get_tasks',
  async () => {
    let response = await get_tasks()
    response = await response.json()
    return response
  }
);

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload
    },
    add_task: (state, action) => {
      //getting max of ids + 1, so if rearranging is enabled, it still works
      const id = state.tasks.length===0 ? 0 : Math.max(...state.tasks.map(i=>i.id)) + 1
      //can make async calls here to update remote state, only then push to local state
      state.tasks.unshift({...action.payload, id})
    },
    edit_task: (state, action) => {
      const { tasks } = state
      const { payload: task } = action
      for(let item of tasks) {
        if(task.id===item.id) {
          if(typeof(task.title)!=='undefined')
            item.title = task.title
          if(typeof(task.status)!=='undefined')
            item.status = task.status
          //can call update api on remote server too
        }
      }
    },
    delete_task: (state, action) => {
      const { tasks } = state
      state.tasks = tasks.filter(i => i.id!==action.payload.id)
    },
    mark_done: (state, action) => {
      const { tasks } = state

      for(let item of tasks) {
        item.status = 'done'
      }
    }
  },

  //handling async actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        //adding only 5 here for demo
        state.tasks = action.payload.slice(0, 5)
        state.loading = false
      })
  },
});

export const { increment, decrement, incrementByAmount, setTasks, add_task, edit_task, mark_done, delete_task } = taskSlice.actions

export default taskSlice.reducer;

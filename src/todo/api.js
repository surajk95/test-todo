
export function get_tasks() {
  return fetch('https://jsonplaceholder.typicode.com/posts')
}

//not using these for the demo
export function add_task(task) {
  return fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

export function update_task(task) {
  return fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PUT',
    body: JSON.stringify(task),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

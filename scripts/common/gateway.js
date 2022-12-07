const baseUrl = 'https://6390e3db0bf398c73a95f78a.mockapi.io/calendar/events/';

export const updateTask = (taskId, updatedTask) =>
  fetch(`${baseUrl}${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(updatedTask),
  }).then(response => {
    if (!response.ok) throw new Error('Task didn"t updated');
  });

export const createTask = newTask =>
  fetch(`${baseUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(newTask),
  }).then(response => {
    if (!response.ok) throw new Error('Task didn"t created');
  });

export const deleteTask = taskId =>
  fetch(`${baseUrl}${taskId}`, { method: 'DELETE' }).then(response => {
    if (!response.ok) throw new Error('Task didn"t deleted');
  });

export const fetchData = () =>
  fetch(`${baseUrl}`).then(response => {
    if (response.ok) return response.json();
  });

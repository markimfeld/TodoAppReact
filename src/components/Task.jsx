import React from 'react';
import { Form } from 'react-bootstrap';


const Task = (props) => {

  const { task, onTaskUpdate, category, onTaskDelete } = props;

  if(task.status) {
    return ( 
      <>
        <div className="d-flex justify-content-between align-items-center">
          <span className="d-flex">
            <Form.Check 
              type="checkbox" 
              defaultChecked={task.status}
              onChange={async (e) => {
                const taskToUpdate = { 
                  name: task.name,
                  status: e.target.checked,
                  category_id: task.category_id
                }
                const options = {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(taskToUpdate)
                }

                const res = await fetch(`http://localhost:5000/api/tasks/${task.id}/`, options);

                if(res.ok) {
                  const updatedTask = await res.json();
                  onTaskUpdate(updatedTask);
                }
              }}
              className="d-inline mr-1" />
            <div className="d-flex flex-column">
              <span className="text-muted" style={{textDecoration: "line-through"}} >{ task.name }</span>
              <span className="text-muted" style={{fontSize: ".8rem"}}>{ category.name }</span>
            </div>
          </span>
          <button 
            onClick={async () => {

              const options = {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }
              }

              const res = await fetch(`http://localhost:5000/api/tasks/${task.id}/`, options);

              if(res.ok && res.status === 200) {
                const deletedTask = await res.json();
                onTaskDelete(deletedTask);
              }

            }}
            className="btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
          </button>
        </div>
      </>
    );
  } else {
    return ( 
      <>
        <div className="d-flex justify-content-between align-items-center">
          <span className="d-flex">
            <Form.Check 
              type="checkbox" 
              defaultChecked={task.status}
              onChange={async (e) => {
                const taskToUpdate = { 
                  name: task.name,
                  status: e.target.checked,
                  category_id: task.category_id
                }
                const options = {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(taskToUpdate)
                }
                const res = await fetch(`http://localhost:5000/api/tasks/${task.id}/`, options);

                if(res.ok) {
                  const updatedTask = await res.json();
                  onTaskUpdate(updatedTask);
                }
              }}
              className="d-inline mr-1" />
            <div className="d-flex flex-column">
              <span className="text-muted">{ task.name }</span>
              <span className="text-muted" style={{fontSize: ".8rem"}}>{ category.name }</span>
            </div>
          </span>
          <button 
            onClick={async () => {
              const options = {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }
              }

              const res = await fetch(`http://localhost:5000/api/tasks/${task.id}/`, options);

              if(res.ok && res.status === 200) {
                const deletedTask = await res.json();
                onTaskDelete(deletedTask);
              }

            }}
            className="btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
          </button>
        </div>
      </>
    );
  }

}


export default Task;
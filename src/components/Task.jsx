import React from 'react';
import { Form } from 'react-bootstrap';


const Task = (props) => {

  const { task, onTaskUpdate, category } = props;

  if(task.status) {
    return ( 
      <>
        <div className="d-flex justify-content-between align-items-center">
          <span>
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
              className="d-inline mr-3" />
            <span className="text-muted" style={{textDecoration: "line-through"}} >{ task.name }</span>
          </span>
          <span className="badge bg-success text-white">{ category.name }</span>
        </div>
      </>
    );
  } else {
    return ( 
      <>
        <div className="d-flex justify-content-between align-items-center">
          <span>
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
              className="d-inline mr-3" />
            <span className="text-muted">{ task.name }</span>
          </span>
          <span className="badge bg-success text-white">{ category.name }</span>
        </div>
      </>
    );
  }

}


export default Task;
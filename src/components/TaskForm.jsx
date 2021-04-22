import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';



const TaskForm = (props) => {
  const { categories, onNewTask, onError, onSuccess } = props;

  const [name, setName] = useState('');
  const [status, setStatus] = useState(false);
  const [category_id, setCategoryId] = useState(-1);


  const options = categories.map(category => {
    return (
      <option key={category.id} value={category.id}>{ category.name }</option>
    );
  });

  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Nombre</Form.Label>
        <Form.Control 
          type="text" 
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="What are you working on?" />
      </Form.Group>
      <Form.Group controlId="formBasicCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control 
          as="select" 
          onChange={e => setCategoryId(e.target.value)}
          value={category_id}>
          <option value={-1} key={-1} disabled>--Seleccionar categoria--</option>
            { options }
        </Form.Control>
      </Form.Group>

      <Button 
        onClick={async () => {

          const newTask = { name, status, category_id }

          console.log(newTask);

          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
          }

          const response = await fetch('http://127.0.0.1:5000/api/tasks/', options);

          if(response.ok && response.status === 200) {
            const taskSaved = await response.json();
            console.log(taskSaved);
            onNewTask(taskSaved);
            setName('');
            setCategoryId(-1);
            onSuccess('Guardado con exito!');
            
          } else if(response.status === 500) {
            onError('No se pudo guardar, ya existe esa tarea con ese nombre');
            setName('');
            setCategoryId(-1);
          }
          
        }}
        variant="primary" >
        Agregar
      </Button>
    </Form>
  );
}


export default TaskForm;
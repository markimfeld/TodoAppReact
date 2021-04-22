import React, { useState, useEffect } from 'react';
import Task from './Task';
import TaskForm from './TaskForm';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';

const ListTask = () => {

  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoriesById = new Map();

  useEffect(() => {

    const getCategories = async () => {
      const res = await fetch('http://localhost:5000/api/categories/');

      if(res.ok) {
        const data = await res.json();

        setCategories(data);
      }
    }

    getCategories();

  }, []);

  if(categories.length !== 0) {
    categories.forEach(category => {
      return categoriesById.set(category.id, category);
    })
  }

  useEffect(() => {

    const getTasks = async () => {
      const res = await fetch('http://localhost:5000/api/tasks/');

      if(res.ok) {
        const data = await res.json();

        setTasks(data);
      }
    }

    getTasks();

  }, []);

  const filteredList = tasks.filter(task => !task.status );

  const listTask = filteredList.map(task => {

    const category = categoriesById.get(task.category_id);

    return (
      <Row key={task.id} className="mb-3">
        <Col>
          <Card body>
            <Task category={category} task={task} onTaskUpdate={updateTask => 
              setTasks(currentTasks => currentTasks.filter(task => task.id !== updateTask.id))
            } />
          </Card>
        </Col>
      </Row>
    );
  })

  return (
    <>
      <Container>
        <h1 className="mb-4 mt-3 text-center">Lista de tareas</h1>
        <Row>
          <Col className="col-8">
            { listTask }
            <div className="d-flex justify-content-between">
              <span className="d-flex">
                <p className="mr-3">{ tasks.filter(task => !task.status ).length } items left</p>
                <p>{ tasks.filter(task => task.status ).length } items completed</p>
              </span>
              <span>
                <Button 
                  onClick={async () => {

                    const options = {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                    }

                    const response = await fetch('http://localhost:5000/api/tasks/clean-all/', options);

                    if(response.ok) {
                      const tasksDeleted = await response.json();

                      if(tasksDeleted.length === 0) {
                        setMessage('No hay tareas para eliminar!');
                        setVariant('warning');
                      } else {
                        setMessage(`Se eliminaron ${tasksDeleted.length} tareas.`);
                        setVariant('success');
                        setTasks([]);
                      }
                    }

                  }}
                  variant="secondary">
                    Limpiar todo
                </Button>
              </span>
            </div>
          </Col>
          <Col>

          {message !== '' &&
            <Alert
              message={() => setMessage(message)}
              variant={variant} >
                {message}
            </Alert>
          }

            <Card body>
              <TaskForm 
                onError={message => {
                  setMessage(message);
                  setVariant('danger');
                  setTimeout(() => { setMessage('')}, 3000);
                }}
                onSuccess={message => {
                  setMessage(message);
                  setVariant('success');
                  setTimeout(() => { setMessage('')}, 3000);
                }}
                onNewTask={newTask => {
                  setTasks(currentTasks => [newTask, ...currentTasks])
                }}
                categories={categories} />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );

}


export default ListTask;
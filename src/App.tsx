/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import * as todosService from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './component/Header/Header';
import { TodoList } from './component/TodoList/TodoList';
import { Footer } from './component/Footer/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | undefined>();
  const [error, setError] = useState('');
  const [status, setStatus] = useState('all');
  // const [todo, setTodo] = useState<Todo | undefined>();

  useEffect(() => {
    todosService
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
      });
  }, []);

  // function loadTodos() {
  //   todosService
  //     .getTodos()
  //     .then(setTodos)
  //     .catch(() => {
  //       setError('Unable to load todos');
  //     });
  // }

  // function addTodo({ userId, title, completed }: Todo) {
  //   todosService.createTodos({ userId, title, completed }).then(newTodo => {
  //     setTodos(currentTodos => [...currentTodos, newTodo]);
  //   });
  // }

  const handleClick = (event: React.MouseEvent) => {
    setStatus(event.currentTarget.innerHTML.toLowerCase());
  };

  //CHANGE IF
  if (error) {
    setTimeout(() => {
      setError('');
    }, 3000);
  }

  const filteredTodos = useMemo(() => {
    let fltrdTodos: Todo[] | undefined = todos;

    switch (status) {
      case 'all':
        fltrdTodos = todos;
        break;
      case 'active':
        fltrdTodos = todos?.filter(td => td.completed === false);
        break;
      case 'completed':
        fltrdTodos = todos?.filter(td => td.completed === true);
        break;
    }

    return fltrdTodos;
  }, [status, todos]);

  function deleteTodo(todoId: number) {
    todosService.deleteTodos(todoId);
    setTodos(currentTodo => currentTodo?.filter(td => td.id !== todoId));
  }

  // function updateTodo(updateTodo: Todo) {
  //   setTodos(currentTodo => {
  //     const newTodo = [...currentTodo];
  //     const index = newTodo.findIndex(td => td.id === updateTodo.id);

  //     newTodo.splice(index, 1, updateTodo);

  //     return newTodo;
  //   });
  // }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} setError={setError} />

        {todos && todos.length > 0 && (
          <TodoList todos={filteredTodos} removeTodo={deleteTodo} />
        )}

        {/* Hide the footer if there are no todos */}
        {/* CHANGE FOOTER !!!!!!!*/}
        {todos && todos.length > 0 && (
          <Footer todos={todos} status={status} handleClick={handleClick} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            setError('');
          }}
        />
        {/* show only one message at a time */}
        {error}
        {/* <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};

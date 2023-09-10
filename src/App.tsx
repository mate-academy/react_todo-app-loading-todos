/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { Todo } from './types/Todo';
import {
  createTodo,
  deleteTodo,
  editTodo,
  getTodos,
} from './api/todos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodoFilter } from './types/TodoFIlter';

export const USER_ID = 11401;

export const App: React.FC = () => {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [errorAdd, setErrorAdd] = useState(false);
  const [errorDelete, setErrorDelete] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentFilter, setCurrentFilter] = useState(TodoFilter.All);

  const updateTodos = () => {
    getTodos(USER_ID).then(items => {
      let completedTodos = [...items];

      if (currentFilter === TodoFilter.Completed) {
        completedTodos
          = completedTodos.filter((item) => item.completed === true);
      } else if (currentFilter === TodoFilter.Active) {
        completedTodos
        = completedTodos.filter((item) => item.completed === false);
      }

      setTodos(completedTodos);
    })
      .catch(() => {
        // --
      });
  };

  useEffect(() => {
    updateTodos();
  }, [currentFilter, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleDeleteTodo = (todoId: number) => {
    setLoadingId(todoId);

    deleteTodo(todoId)
      .then(() => {
        updateTodos();
        setLoadingId(null);
        setErrorDelete(false);
      })
      .catch(() => {
        setErrorDelete(true);
      });
  };

  const handleCreateTodo = (newTitle: string) => {
    const maxId = Math.max(...todos.map(todo => todo.id));

    createTodo({
      id: maxId + 1,
      title: newTitle,
      completed: false,
      userId: USER_ID,
    })
      .then(() => {
        updateTodos();
        setErrorAdd(false);
      })
      .catch(() => {
        setErrorAdd(true);
      });
  };

  const handleEditTodo = (
    property: string,
    value: any,
    todoId: number,
  ) => {
    setLoadingId(todoId);
    const existingTodo = todos.find((todo) => todo.id === todoId);

    if (existingTodo) {
      const updatedTodo: Todo = { ...existingTodo, [property]: value };

      editTodo(updatedTodo, todoId)
        .then(() => {
          updateTodos();
          setLoadingId(null);
          setErrorUpdate(false);
        })
        .catch(() => {
          setErrorUpdate(true);
        });
    }
  };

  const handleToggleAll = () => {
    const isAllCompleted = todos.every(todo => todo.completed === true);

    if (isAllCompleted) {
      todos.forEach(todo => {
        handleEditTodo('completed', false, todo.id);
      });
    } else {
      todos.forEach(todo => {
        handleEditTodo('completed', true, todo.id);
      });
    }
  };

  const handleCloseError = () => {
    setErrorAdd(false);
    setErrorDelete(false);
    setErrorUpdate(false);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          handleToggleAll={handleToggleAll}
          handleCreateTodo={handleCreateTodo}
        />

        <TodoList
          todos={todos}
          handleDeleteTodo={handleDeleteTodo}
          handleEditTodo={handleEditTodo}
          loadingId={loadingId}
        />

        {/* Hide the footer if there are no todos */}
        <Footer
          todos={todos}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
          handleDeleteTodo={handleDeleteTodo}
        />
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorAdd && !errorDelete && !errorUpdate },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={handleCloseError}
        />

        {/* show only one message at a time */}
        {errorAdd && (
          <>
            Unable to add a todo
            <br />
          </>
        )}
        {errorDelete && (
          <>
            Unable to delete a todo
            <br />
          </>
        )}
        {errorUpdate && (
          <>
            Unable to update a todo
            <br />
          </>
        )}
      </div>

    </div>
  );
};

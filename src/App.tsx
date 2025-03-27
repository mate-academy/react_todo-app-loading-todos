/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
// import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';
import { TodoList } from './components/TodoList';
import { FilterBy } from './types/FilterBy';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Errors } from './types/Errors';

function filterTodos(todos: Todo[], show: string) {
  if (show === FilterBy.All) {
    return todos;
  }

  switch (show) {
    case FilterBy.Active: {
      return todos.filter(todo => !todo.completed);
    }

    case FilterBy.Completed: {
      return todos.filter(todo => todo.completed);
    }

    default:
      return todos;
  }
}

export const App: React.FC = () => {
  // if (!USER_ID) {
  //   return <UserWarning />;
  // }
  // console.log('render app');

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  const changeErrorMesssage = (newErrorMessage: string) => {
    setErrorMessage(newErrorMessage);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        changeErrorMesssage(Errors.Load);
      });
  }, []);

  const filteredTodos = filterTodos(todos, filterBy);

  const getLastId = (): number => {
    const IDArray: number[] = todos.map((todo: Todo) => todo.id);

    return Math.max(...IDArray);
  };

  const handleDeleteTodo = (idToDelete: number) => {
    setTodos(() => todos.filter(todo => todo.id !== idToDelete));
  };

  const handleDeleteCompletedTodo = () => {
    setTodos(() => todos.filter(todo => !todo.completed));
  };

  const handleAddTodo = (todoTitle: string) => {
    const newTodo: Todo = {
      userId: USER_ID,
      title: todoTitle.trim(),
      completed: false,
      id: getLastId() + 1,
    };

    setTodos(() => [...todos, newTodo]);
  };

  const handleChangeCompleted = (todoId: number) => {
    setTodos(
      todos.map(todo => {
        if (todo.id !== todoId) {
          return todo;
        }

        const newTodo = { ...todo, completed: !todo.completed };

        return newTodo;
      }),
    );
  };

  const handleChangeAllIsComplated = () => {
    if (todos.every(todo => todo.completed)) {
      setTodos(
        todos.map(todo => {
          const newTodo = { ...todo, completed: false };

          return newTodo;
        }),
      );

      return;
    }

    setTodos(
      todos.map(todo => {
        const newTodo = { ...todo, completed: true };

        return newTodo;
      }),
    );
  };

  const handleChangeTodo = (todoId: number, newTodoTitle: string) => {
    const newTodos = todos.map(todo => {
      if (todo.id !== todoId) {
        return todo;
      }

      const newTodo = { ...todo, title: newTodoTitle };

      return newTodo;
    });

    setTodos(newTodos);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          changeAllIsComplated={handleChangeAllIsComplated}
          addTodo={handleAddTodo}
          setNewError={changeErrorMesssage}
        />

        {todos.length !== 0 && (
          <>
            <TodoList
              todos={filteredTodos}
              deleteTodo={handleDeleteTodo}
              changeCompleted={handleChangeCompleted}
              changeTodo={handleChangeTodo}
            />

            <Footer
              todos={todos}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              deleteCompleted={handleDeleteCompletedTodo}
            />
          </>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { addTodos, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './Components/TodoList/TodoList';
import { Footer } from './Components/Footer/Footer';
import { SortType } from './types/SortType';
/* eslint-disable-next-line max-len */
import { ErrorNotification } from './Components/ErrorNotification/ErrorNotification';
import { Header } from './Components/Header/Header';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortType, setSortType] = useState<SortType>(SortType.all);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');

    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);

        throw new Error();
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (sortType) {
      case SortType.Active: {
        return !todo.completed;
      }

      case SortType.Completed: {
        return todo.completed;
      }

      case SortType.all:
      default:
        return todo;
    }
  });

  function addData(listValue: string) {
    const normalValue = listValue.trim();

    if (!normalValue) {
      setErrorMessage('Title should not be empty');

      setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return;
    }

    const newTodoData = {
      title: listValue,
      completed: false,
      userId: USER_ID,
    };

    addTodos(newTodoData)
      .then(newTodo => {
        setTodos(currentTodo => [...currentTodo, newTodo]);
      })
      .catch(() => {
        if (!normalValue) {
          setErrorMessage('Unable to add a todo');

          return;
        }

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);

        throw new Error();
      });
  }

  const activeTodoCount = todos.filter(todo => !todo.completed).length;

  const hasCompletedTodos = todos.length > activeTodoCount;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header active={activeTodoCount} onChange={addData} />

        {todos.length > 0 && (
          <>
            <TodoList filteredTodos={filteredTodos} />

            <Footer
              activeTodosCount={activeTodoCount}
              currentSortType={sortType}
              onSortChange={setSortType}
              hasCompletedTodos={hasCompletedTodos}
            />
          </>
        )}
      </div>

      <ErrorNotification
        error={errorMessage}
        setError={catchError => setErrorMessage(catchError)}
      />
      {/* <br />
          Unable to delete a todo
          <br />
          Unable to update a todo */}
    </div>
  );
};

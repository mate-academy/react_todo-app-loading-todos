/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import * as todosServers from '../src/utils/fetchClient';
import Footer from './commponents/Footer';
import Header from './commponents/Header';
import TodoList from './commponents/TodoList';
import ErrorMessage from './commponents/ErrorMessage';
import { ErrorMessages } from './constanst/errors';

type Status = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  //  #region States
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>(
    ErrorMessages.None,
  );
  const [filterStatus, setFilterStatus] = useState<Status>('all');
  const [inputValue, setInputValue] = useState<string>('');
  //  #endregion

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // #region useEffect
  useEffect(() => {
    if (errorMessage) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const id = setTimeout(() => {
        setErrorMessage(ErrorMessages.None);
      }, 3000);

      timeoutRef.current = id;
    }
  }, [errorMessage]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(err => {
        setErrorMessage(ErrorMessages.LoadTodos);
        throw err;
      });
  }, []);
  //  #endregion
  // #region functions
  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleSubmitForm(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (inputValue.length < 1) {
      setErrorMessage(ErrorMessages.EmptyTitle);

      return;
    }

    const todo = {
      userId: USER_ID,
      title: inputValue,
      completed: false,
    };

    todosServers.client
      .post('/todos', todo)
      .then(newPost => {
        setTodos(currentTodos => [...currentTodos, newPost as Todo]);
        setErrorMessage(ErrorMessages.None);
        setInputValue('');
      })
      .catch(err => {
        setErrorMessage(ErrorMessages.AddTodos);
        throw err;
      });
  }

  function filterTodos(status: Status) {
    if (status === 'active') {
      return [...todos].filter(tod => !tod.completed);
    } else if (status === 'completed') {
      return [...todos].filter(tod => tod.completed);
    }

    return todos;
  }

  const visibleTodos = filterTodos(filterStatus);

  const deleteTodo = (postId: number) => {
    const currentTodos = [...todos];

    todosServers.client.delete(`/todos/${postId}`).catch(error => {
      setTodos(currentTodos);
      setErrorMessage(ErrorMessages.DeleteTodo);
      throw error;
    });

    setTodos(currentPosts => currentPosts.filter(post => post.id !== postId));

    // return todosServers.client.delete(`/todos/${postId}`)
  };

  function handleCheckedId(id: number) {
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      }),
    );
  }
  //  #endregion

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          handleInput={handleInput}
          handleSubmitForm={handleSubmitForm}
          inputValue={inputValue}
        />

        {todos.length > 0 && (
          <TodoList
            deleteTodo={deleteTodo}
            handleCheckedId={handleCheckedId}
            visibleTodos={visibleTodos}
          />
        )}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            setFilterStatus={setFilterStatus}
            filterStatus={filterStatus}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

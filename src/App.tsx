/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, updateTodo, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { FilterType } from './types/FilterType';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [updatingTodoId, setUpdatingTodoId] = useState<number | null>(null);
  const [allTodos, setAllTodos] = useState<Todo[] | null>(null);
  const [activeFilter, setActivefilter] = useState<FilterType>(FilterType.All);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setAllTodos(todosFromServer);
        setErrorMessage('');
        inputRef.current?.focus();
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  const toggleTodo = async (id: number) => {
    setUpdatingTodoId(id);
    const todoToUpdate = todos?.find(todo => todo.id === id);

    if (!todoToUpdate) {
      return;
    }

    try {
      await updateTodo(id, { completed: !todoToUpdate.completed });
      setTodos(prevTodos =>
        (prevTodos as Todo[]).map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
      setAllTodos(prevTodos =>
        (prevTodos as Todo[]).map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    } catch {
      setErrorMessage('Unable to update a todo');
    } finally {
      setUpdatingTodoId(null);
    }
  };

  const handleFilter = (filterType: FilterType) => {
    let filteredTodos;

    setActivefilter(filterType);

    switch (filterType) {
      case FilterType.All: {
        filteredTodos = allTodos;
        break;
      }

      case FilterType.Active: {
        filteredTodos = allTodos?.filter(todo => !todo.completed);
        break;
      }

      case FilterType.Completed: {
        filteredTodos = allTodos?.filter(todo => todo.completed);
        break;
      }

      default: {
        filteredTodos = allTodos;
      }
    }

    if (filteredTodos) {
      setTodos(filteredTodos);
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} inputRef={inputRef} />
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          updatingTodoId={updatingTodoId}
        />

        {/* Hide the footer if there are no todos */}
        {(allTodos ?? []).length > 0 && (
          <Footer
            allTodos={allTodos}
            activeFilter={activeFilter}
            handleFilter={handleFilter}
            todos={todos}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
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
        {/* show only one message at a time */}
        {errorMessage}
        {/* <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};

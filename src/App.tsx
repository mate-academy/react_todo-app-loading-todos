import React, { useState, useEffect, useCallback } from 'react';
import * as todosService from './api/todos';

import { ErrorMessages } from './components/ErrorsMessage';
import TodoList from './components/TodoList';
import { Footer } from './components/Footer';
import Header from './components/Header';

import { Todo } from './types/Todo';
import { Field } from './types/Field';
import { filterByTodos, preparedTodos } from './service/service';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [field, setField] = useState<Field>(Field.ALL);

  useEffect(() => {
    todosService
      .getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  const todosCounter = filterByTodos(todos);

  useEffect(() => {
    const timerId = window.setTimeout(() => setErrorMessage(''), 4000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  const changeComplete = useCallback(
    (todoChanged?: Todo) => {
      const changedTodos = todos.map(todo => {
        if (todo.id !== todoChanged?.id) {
          return todo;
        } else {
          return { ...todo, completed: !todo.completed };
        }
      });

      setTodos(changedTodos);
    },
    [todos],
  );

  const filteredTodos = preparedTodos(todos, field);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          setTodos={setTodos}
          todosCounter={todosCounter.length}
          changeComplete={changeComplete}
        />

        {!!todos.length && (
          <TodoList
            filteredTodos={filteredTodos}
            changeComplete={changeComplete}
            setTodos={setTodos}
          />
        )}

        {!!todos.length && (
          <Footer
            field={field}
            setField={setField}
            activeTodos={todosCounter.length}
          />
        )}
      </div>

      <ErrorMessages
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

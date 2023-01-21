/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import {
  ErrorNotification,
} from './components/ErrorNotification/ErrorNotification';

import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.all);
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => (
          setErrorMessage('Unable to load a todos')
        ));
    }
  }, []);

  const incompleteTodos = useMemo(
    () => todos.filter(todo => !todo.completed),
    [todos],
  );

  const completeTodos = useMemo(
    () => todos.filter(todo => todo.completed),
    [todos],
  );

  const filterTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case Filter.completed:
          return todo.completed;

        case Filter.active:
          return !todo.completed;

        default:
          return todo;
      }
    });
  }, [todos, filter]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={filterTodos} />

            <Footer
              incompleteTodos={incompleteTodos}
              completeTodos={completeTodos}
              filter={filter}
              setFilter={setFilter}
            />
          </>
        )}
      </div>

      {errorMessage && (
        <ErrorNotification
          error={errorMessage}
          onChange={setErrorMessage}
        />
      )}
    </div>
  );
};

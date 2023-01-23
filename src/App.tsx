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
import {getFilterTodos} from "./components/helperFunction";

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [completedFilter, setCompletedFilter] = useState<Filter>(Filter.all);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const handleError = () => {
    setTimeout(() => setErrorMessage(''), 3000);
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => {
          setErrorMessage('Unable to load a todos');
          handleError();
        });
    }
  }, []);

  const incompleteTodos = useMemo(
    () => todos.filter(todo => !todo.completed),
    [todos],
  );

  const completeTodosLength = useMemo(
    () => todos.filter(todo => todo.completed).length,
    [todos],
  );

  const filterTodos = useMemo(() => {
    return getFilterTodos(todos, completedFilter);
  }, [todos, completedFilter]);

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
              completeTodosLength={completeTodosLength}
              completedFilter={completedFilter}
              setCompletedFilter={setCompletedFilter}
            />
          </>
        )}
      </div>

      {errorMessage && (
        <ErrorNotification
          error={errorMessage}
          closeNotification={setErrorMessage}
        />
      )}
    </div>
  );
};

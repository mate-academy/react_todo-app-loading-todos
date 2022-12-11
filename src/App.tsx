/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';

import { AuthContext } from './components/Auth/AuthContext';
import { getTodos, getActiveTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { Filter } from './components/Filter/Filter';
import { NewTodo } from './components/NewTodo/NewTodo';
import { ErrorsComponent } from './components/ErrorsComponent/ErrorsComponent';

export const App: React.FC = () => {
  const [getErrorStatus, setGetErrorStatus] = useState(false);
  const [activeTodos, setActiveTodos] = useState<Todo[] | null>(null);
  const [allTodos, setAllTodos] = useState<Todo[] | null>(null);
  const [visibleTodos, setVisibleTodos] = useState<Todo[] | null>(null);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const setErrorStatus = () => {
    setGetErrorStatus(true);
    setTimeout(() => setGetErrorStatus(false), 3000);
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(userTodos => {
          setVisibleTodos(userTodos);
          setAllTodos(userTodos);
        })
        .catch(setErrorStatus);

      getActiveTodos(user.id)
        .then(userTodos => setActiveTodos(userTodos));
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo
          newTodoField={newTodoField}
          activeTodos={activeTodos}
          allTodos={allTodos}
        />
        <TodoList visibleTodos={visibleTodos} />

        <Filter
          allTodos={allTodos}
          activeTodos={activeTodos}
          user={user}
          setVisibleTodos={setVisibleTodos}
        />
      </div>

      <ErrorsComponent
        getErrorStatus={getErrorStatus}
        setGetErrorStatus={setGetErrorStatus}
      />
    </div>
  );
};

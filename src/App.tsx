/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { Error, Filter } from './utils/Enum';
import { getTodos } from './api/todos';
import { TodoFooter } from './components/TodoFooter';
import { TodoHeder } from './components/TodoHeder';
import { TodoList } from './components/TodoList';
import { TodoError } from './components/TodoError';

const USER_ID = 11211;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(Error.NOTHING);
  const [filterTodo, setFilterTodo] = useState(Filter.ALL);
  const [isActive, setIsActive] = useState(false);
  const [isComplited, setIsComplited] = useState(false);

  const filteredTodos = useMemo(() => {
    switch (filterTodo) {
      case Filter.COMPLETED:
        return todos.filter(todo => todo.completed);

      case Filter.ACTIVE:
        return todos.filter(todo => !todo.completed);

      default:
        return todos;
    }
  }, [filterTodo, todos]);

  useEffect(() => {
    getTodos(USER_ID)
      .then((data) => setTodos(data))
      .catch(() => setHasError(Error.FETCH));
  }, []);

  useEffect(() => {
    if (!todos.find(todo => !todo.completed) && todos.length) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    if (todos.find(todo => todo.completed)) {
      setIsComplited(true);
    }
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeder
          activeButton={isActive}
        />

        <TodoList
          filteredTodos={filteredTodos}
        />

        {todos.length > 0 && (
          <TodoFooter
            todos={todos}
            filterTodos={filterTodo}
            setFilterTodos={setFilterTodo}
            clearButton={isComplited}
          />
        )}

        {hasError !== Error.NOTHING && (
          <TodoError
            hasError={hasError}
            setHasError={setHasError}
          />
        )}

      </div>
    </div>
  );
};

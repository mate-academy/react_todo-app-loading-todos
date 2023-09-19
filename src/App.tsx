/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { Header } from './components/Header/Header';
import { filterBy } from './utils/filterBy';
import { FilterType } from './types/TodoStatus';
import { UNABLE_DOWNLOAD_ERROR_MESSAGE, USER_ID } from './utils/constants';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage(UNABLE_DOWNLOAD_ERROR_MESSAGE));
  }, []);

  const visibleTodos = useMemo(() => {
    return filterBy(todos, filterType);
  }, [filterType, todos]);

  const handleFilterChange = (type: FilterType) => {
    setFilterType(type);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={visibleTodos} />

        {Boolean(todos.length) && (
          <TodoFooter
            onTypeChange={handleFilterChange}
            filterType={filterType}
            todos={todos}
          />
        )}
      </div>

      {errorMessage && (
        <ErrorMessage error={errorMessage} />
      )}
    </div>
  );
};

// I need this comment for future tasks
// {/* This todo is in loading state */}
// <div className="todo">
//   <label className="todo__status-label">
//     <input type="checkbox" className="todo__status" />
//   </label>
//
//   <span className="todo__title">Todo is being saved now</span>
//   <button type="button" className="todo__remove">×</button>
//
//   {/* 'is-active' class puts this modal on top of the todo */}
//   <div className="modal overlay is-active">
//     <div className="modal-background has-background-white-ter" />
//     <div className="loader" />
//   </div>
// </div>

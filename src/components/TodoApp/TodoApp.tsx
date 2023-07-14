/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';

import './todoApp.scss';

// Data
import { getTodos } from '../../api/todos';

// Components
import { TodoAppHeader } from './TodoAppHeader/TodoAppHeader';
import { TodoAppBody } from './TodoAppBody/TodoAppBody';
import { TodoAppFooter } from './TodoAppFooter/TodoAppFooter';

import { Notification } from '../Notification/Notification';

// Helpers
import { filterTodos } from '../../utils/sortTodos';

// Types
import { Todo } from '../../types/Todo';
import { SortType } from '../../types/SortType';

type Props = {
  userId: number,
};

export const TodoApp: React.FC<Props> = ({ userId }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortType, setSortType] = useState(SortType.ALL);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos(userId)
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(() => {
        setHasError(true);
        setErrorMessage('Unable to load Todos');
      });
  }, []);

  const handleSortTypeChange = (sortedType: SortType) => {
    setSortType(sortedType);
  };

  const activeTodos = todos.filter(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAppHeader />

        {todos.length !== 0 && (
          <>
            <TodoAppBody
              todos={filterTodos(sortType, todos)}
            />

            <TodoAppFooter
              activeTodosCount={activeTodos.length}
              sortType={sortType}
              handleSortTypeChange={handleSortTypeChange}
            />
          </>
        )}
      </div>

      {hasError && (
        <Notification
          errorText={errorMessage}
          hasError={hasError}
          setHasError={(param: boolean) => setHasError(param)}
        />
      )}
    </div>
  );
};

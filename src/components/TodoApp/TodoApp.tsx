/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';

import './todoApp.scss';

import { getTodos } from '../../api/todos';

import { TodoAppHeader } from './TodoAppHeader/TodoAppHeader';
import { TodoAppBody } from './TodoAppBody/TodoAppBody';
import { TodoAppFooter } from './TodoAppFooter/TodoAppFooter';

import { Notification } from '../Notification/Notification';

import { filterTodos } from '../../utils/sortTodos';

import { Todo } from '../../types/Todo';
import { SortType } from '../../types/SortType';
import { ErrorNames } from '../../types/ErrorNames';

type Props = {
  userId: number,
};

export const TodoApp: React.FC<Props> = ({ userId }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortType, setSortType] = useState(SortType.ALL);
  const [errorMessage, setErrorMessage] = useState(ErrorNames.None);

  useEffect(() => {
    getTodos(userId)
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(() => setErrorMessage(ErrorNames.LoadingError));
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

      {errorMessage !== ErrorNames.None && (
        <Notification
          errorText={errorMessage}
          setHasError={() => setErrorMessage(ErrorNames.None)}
        />
      )}
    </div>
  );
};

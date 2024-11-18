/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { useAppContext } from '../../context/AppContext';
import { useRemoveCompletedTodos } from '../../utils/todoHandlers';
import { Filter } from './Filter/Filter';

export const FilteringPanel: React.FC = () => {
  const { todos } = useAppContext();
  const [isDisabledClearButton, setIsDisabledClearButton] = useState(true);
  const notCompletedTodosLength = todos.filter(todo => !todo.completed).length;

  const removeCompletedTodos = useRemoveCompletedTodos();

  function handleRemoveCompletedTodos() {
    removeCompletedTodos();
  }

  useEffect(() => {
    setIsDisabledClearButton(!todos.some(todo => todo.completed));
  }, [todos]);

  return (
    <footer className="todoapp__filtering-panel" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTodosLength} items left
      </span>

      <Filter />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={isDisabledClearButton}
        onClick={handleRemoveCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};

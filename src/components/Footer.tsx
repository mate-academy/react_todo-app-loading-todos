import React, { useContext } from 'react';
// eslint-disable-next-line import/no-cycle
import { TodosFilter } from './TodosFilter';
import { Status } from '../types/Status';
// eslint-disable-next-line import/no-cycle
import { TodoContext } from './TodosContext';

export const Footer: React.FC = () => {
  const { todos, handlerDeleteCompleted } = useContext(TodoContext);
  const uncompletedTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${uncompletedTodos.length} ${uncompletedTodos.length === 1 ? 'item' : 'items'} left`}
      </span>

      <TodosFilter filter={Status.ALL} setFilter={() => {}} />

      {/* don't show this button if there are no completed todos */}
      {uncompletedTodos.length < todos.length && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={handlerDeleteCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

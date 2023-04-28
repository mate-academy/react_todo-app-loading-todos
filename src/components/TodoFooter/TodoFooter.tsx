import React from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../Filter/Filter';

type Props = {
  todos: Todo[],

};

export const TodoFooter: React.FC<Props> = ({ todos }) => {
  const todosLeft = todos.filter(todo => todo.completed === false).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todosLeft} items left`}
      </span>

      <Filter />

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={todos.length === todosLeft}
      >
        Clear completed
      </button>
    </footer>
  );
};

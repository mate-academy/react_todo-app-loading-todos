import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  handleChangeCompletedAllTodos: () => void;
};

export const Header: React.FC<Props> = ({
  todos,
  handleChangeCompletedAllTodos,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: todos.every(todo => todo.completed),
        })}
        // "todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        onClick={handleChangeCompletedAllTodos}
      />
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

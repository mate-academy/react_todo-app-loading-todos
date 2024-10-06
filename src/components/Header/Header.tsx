import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  onTodosChange: (toggledTodos: Todo[]) => void;
};

export const Header: React.FC<Props> = ({ todos, onTodosChange }) => {
  const areAllTodosCompleted = todos.every(todo => todo.completed);

  const handleToggleCompleteStatus = () => {
    onTodosChange(todos.map(todo => ({
      ...todo,
      completed: !areAllTodosCompleted,
    })))
  }

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
        type="button"
        className={cn('todoapp__toggle-all', { active: areAllTodosCompleted })}
        data-cy="ToggleAllButton"
        onClick={handleToggleCompleteStatus}
      />
      )}

      {/* Add a todo on form submit */}
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

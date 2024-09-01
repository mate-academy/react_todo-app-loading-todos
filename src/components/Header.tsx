import cn from 'classnames';
import { Todo } from '../types/Todo';
import React from 'react';

type Props = {
  todos: Todo[];
};

const Header: React.FC<Props> = ({ todos }) => {
  // Проверка, все ли Todos выполнены
  const allTodosCompleted = todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: allTodosCompleted })}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    </header>
  );
};

export default Header;

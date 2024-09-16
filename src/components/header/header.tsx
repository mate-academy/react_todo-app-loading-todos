import React, { FormEvent, useState } from 'react';
import { TodoServiceApi } from '../../services/todoService';
import classNames from 'classnames';

type Props = {
  areTodosActive: boolean;
};

export const Header: React.FC<Props> = ({ areTodosActive }) => {
  const [todoText, setTodoText] = useState<string>('');
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    TodoServiceApi.addTodo(todoText);
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: areTodosActive,
        })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleFormSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoText}
          onChange={event => setTodoText(event.target.value)}
        />
      </form>
    </header>
  );
};

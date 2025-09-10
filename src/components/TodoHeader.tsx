import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  onSetTitleError: (errorMessage: string) => void;
  todos: Todo[];
};

export const TodoHeader: React.FC<Props> = ({ onSetTitleError, todos }) => {
  const [title, setTitle] = useState('');

  const AllTodosCompleted = todos.every(todo => todo.completed);

  function handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    onSetTitleError('');

    if (!title.trim()) {
      onSetTitleError('Title should not be empty');
    }
  }

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: AllTodosCompleted,
          })}
          data-cy="ToggleAllButton"
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleChangeTitle}
        />
      </form>
    </header>
  );
};

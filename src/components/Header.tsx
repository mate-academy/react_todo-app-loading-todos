import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
type Props = {
  todos: Todo[];
  addTodo: (title: string) => void;
  clearCompleted: () => void;
  setError: (message: string) => void;
  showError: (message: string) => void;
};

export const Header: React.FC<Props> = ({
  todos,
  addTodo,
  clearCompleted,
  setError,
  showError,
}) => {
  const allTodoCompleted = todos.every(todo => todo.completed);
  const [title, setTitle] = React.useState('');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.trim());
    setError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      showError('Title should not be empty');

      return;
    }

    addTodo(title);
    setTitle('');
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: allTodoCompleted && todos.length > 0,
        })}
        data-cy="ToggleAllButton"
        onClick={clearCompleted}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          value={title}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={handleInput}
          autoFocus
        />
      </form>
    </header>
  );
};

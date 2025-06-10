import { useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { USER_ID } from '../api/todos';

type Props = {
  onSubmit: (todo: Omit<Todo, 'id'>) => void;
  todos: Todo[];
};

export const Header: React.FC<Props> = ({ onSubmit, todos }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue) {
      return;
    }

    onSubmit({
      userId: USER_ID,
      title: inputValue,
      completed: false,
    });

    setInputValue('');
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: todos.length > 0 && todos.every(todo => todo.completed),
        })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
      </form>
    </header>
  );
};

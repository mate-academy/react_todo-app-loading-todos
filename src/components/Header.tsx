import React, { useContext, useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../types/Todo';
import { DispatchContex } from '../utils/ErrorContext';

type Props = {
  todos: Todo[]
};

export const Header: React.FC<Props> = ({ todos }) => {
  const activeTodos = todos.filter(todo => !todo.completed);
  const [value, setValue] = useState('');
  const newTodo = value.trim();
  const setError = useContext(DispatchContex);

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newTodo) {
      setError('Title should not be empty');
      setValue('');
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: activeTodos },
        )}
        data-cy="ToggleAllButton"
        aria-label="toggle-all"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={addTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={event => setValue(event.target.value)}
          onBlur={addTodo}
          onClick={() => setError('')}
        />
      </form>
    </header>
  );
};

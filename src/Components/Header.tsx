import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[],
  addTodo: (todo: Todo) => void,
}

const USER_ID = 11723;

export const Header: React.FC<Props> = ({ todos, addTodo }) => {
  const [query, setQuery] = useState('');

  const handleSubmitForm = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      id: +new Date(),
      title: query.trim(),
      userId: USER_ID,
      completed: false,
    };

    if (query.trim()) {
      addTodo(newTodo);
      setQuery('');
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          aria-label="Toggle All"
        />
      )}
      <form
        action="/"
        method="Post"
        onSubmit={handleSubmitForm}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};

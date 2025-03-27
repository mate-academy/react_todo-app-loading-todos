import React, { useState } from 'react';
import { Errors } from '../../types/Errors';

type Props = {
  addTodo: (title: string) => void;
  setNewError: (newErrorMessage: string) => void;
};

export const NewTodoForm: React.FC<Props> = ({ addTodo, setNewError }) => {
  // console.log('render newTodo');

  const [query, setQuery] = useState('');

  const createTodo = (todoTitle: string) => {
    if (!todoTitle.trim()) {
      setNewError(Errors.EmptyTitle);

      return;
    }

    addTodo(todoTitle);
    setQuery('');
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        createTodo(query);
      }}
    >
      <input
        autoFocus
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
    </form>
  );
};

import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | undefined;
  setError: (error: string) => void;
};

export const Header: React.FC<Props> = ({ todos, setError }) => {
  const [query, setQuery] = useState('');

  const reset = () => {
    setQuery('');
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setQuery(event.target.value);
  };

  //fix submit
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!query) {
      setError('Title should not be empty');

      return;
    }

    // setTodo({
    //   id: 0, //refactor?
    //   userId: 2816, //refactor?
    //   title: query,
    //   completed: false,
    // });

    // if (!todo) {
    //   return;
    // }

    // addTodo(todo);

    reset();
  };

  return (
    <header className="todoapp__header">
      {todos && todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${todos?.filter(todo => todo.completed === true).length === todos.length ? 'active' : ''}`}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={handleQueryChange}
          autoFocus
        />
      </form>
    </header>
  );
};

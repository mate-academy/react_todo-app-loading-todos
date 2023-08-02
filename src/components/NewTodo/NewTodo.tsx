import React, { useState } from 'react';
import { createTodo } from '../../api/todos';
import { Todo } from '../../types/Todo';

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setErrorMessage: (v: string) => void;
};

export const NewTodo: React.FC<Props> = React.memo(({
  setTodos, setErrorMessage,
}) => {
  const [query, setQuery] = useState('');

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query.trim() === '') {
      setQuery('');

      return;
    }

    createTodo({
      userId: 11253,
      title: query.trim(),
      completed: false,
    })
      .then(newTodo => {
        setTodos((currentTodos: Todo[]) => [...currentTodos, newTodo]);
      })
      .catch(() => {
        setErrorMessage('Unable to add a todo');

        throw new Error();
      });
    setQuery('');
  };

  return (
    <form onSubmit={addTodo}>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
    </form>
  );
});

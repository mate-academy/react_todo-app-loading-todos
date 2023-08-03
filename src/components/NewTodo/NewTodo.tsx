import React, { useState } from 'react';
import { createTodo } from '../../api/todos';
import { Todo } from '../../types/Todo';

type Props = {
  USER_ID: number;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setErrorMessage: (v: string) => void;
};

export const NewTodo: React.FC<Props> = React.memo(({
  USER_ID, setTodos, setErrorMessage,
}) => {
  const [query, setQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (query.trim() === '') {
      setQuery('');

      return;
    }

    setIsAdding(true);
    createTodo({
      userId: USER_ID,
      title: query.trim(),
      completed: false,
    })
      .then(newTodo => {
        setTodos((currentTodos: Todo[]) => [...currentTodos, newTodo]);
      })
      .catch(error => {
        setErrorMessage('Unable to add a todo');

        throw error;
      })
      .then(() => setQuery(''))
      .finally(() => setIsAdding(false));
  };

  return (
    <form onSubmit={addTodo}>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={event => setQuery(event.target.value)}
        disabled={isAdding}
      />
    </form>
  );
});

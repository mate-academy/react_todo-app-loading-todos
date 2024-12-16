import React, { useEffect, useRef, useState } from 'react';
import * as todosService from '../api/todos';

import { Todo } from '../types/Todo';

type Props = {
  setTodos: (todos: Todo[] | ((prevTodos: Todo[]) => Todo[])) => void;
};
export const Form: React.FC<Props> = ({ setTodos }) => {
  const [query, setQuery] = useState('');

  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    field.current?.focus();
  }, []);

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    todosService
      .createTodo({
        userId: todosService.USER_ID,
        title: query,
        completed: false,
      })
      .then(newTodo => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
      });

    setQuery('');
  };

  return (
    <form onSubmit={handleAddTodo}>
      <input
        ref={field}
        value={query}
        onChange={handleChangeQuery}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};

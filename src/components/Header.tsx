/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { getTodo } from '../api/todos';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  newTodoTitle: string,
  setNewTodoTitle: (event: string) => void,
};

export const Header: React.FC<Props> = (
  {
    todos,
    onSubmit,
    newTodoTitle,
    setNewTodoTitle,
  },
) => {
  const [onetodo, setOneTodo] = useState<Todo>();

  useEffect(() => {
    if (onetodo) {
      getTodo(onetodo.id).then(setOneTodo);
    }
  });

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn(
          'todoapp__toggle-all',
          { active: todos.some((todo) => !todo.completed) },
        )}
      />

      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={(event) => setNewTodoTitle(event.target.value)}
        />
      </form>
    </header>
  );
};

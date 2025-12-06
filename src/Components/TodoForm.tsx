import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { filterTodo } from '../Services/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  onSubmit: (title: string) => Promise<void>;
};

const TodoFormComponent: React.FC<Props> = ({ todos, onSubmit }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const resetForm = () => {
    setQuery('');
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit(query.trim()).then(() => resetForm());
  };

  const completedTodos = filterTodo(todos, 'completed');

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: todos.length === completedTodos.length,
        })}
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleSubmit}>
        <input
          onChange={event => handleChangeInput(event)}
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

export const TodoForm = React.memo(TodoFormComponent);

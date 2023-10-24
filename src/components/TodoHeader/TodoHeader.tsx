import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  userId: number;
  addTodo: (todo: Todo) => void;
};

export const TodoHeader: React.FC<Props> = ({
  todos,
  userId,
  addTodo,
}) => {
  const [title, setTitle] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim()) {
      addTodo({
        id: +new Date(),
        title,
        userId,
        completed: false,
      });

      setTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every((todo) => todo.completed),
          })}
          data-cy="ToggleAllButton"
          aria-label="Toggle All"
        />
      )}
      {/* Add a todo on form submit */}
      <form action="/" method="POST" onSubmit={handleSubmit}>
        <input
          value={title}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};

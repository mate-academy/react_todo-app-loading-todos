/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getTodo } from '../api/todos';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  onAdd: (todoData: string) => void,
};

export const NewTodoForm: React.FC<Props> = ({ todos, onAdd }) => {
  const [todo, setTodo] = useState<Todo>();
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (todo) {
      getTodo(todo.id).then(setTodo);
    }
  });

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: todos.some((td) => !td.completed) },
        )}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={(event) => {
        event.preventDefault();
        onAdd(title);
        setTitle('');
      }}
      >
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </form>
    </header>
  );
};

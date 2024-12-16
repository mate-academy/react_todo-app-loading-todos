/* eslint-disable react/jsx-filename-extension */

import { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { USER_ID } from '../api/todos';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const TodoHeader: React.FC<Props> = ({ todos, setTodos }) => {
  const [todoTitle, setTodoTitle] = useState('');
  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    const newTodo: Todo = {
      id: Math.random(),
      title: todoTitle,
      completed: false,
      userId: USER_ID,
    };

    if (todos) {
      setTodos([...todos, newTodo]);
      setTodoTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={event => setTodoTitle(event.target.value)}
          ref={titleRef}
        />
      </form>
    </header>
  );
};

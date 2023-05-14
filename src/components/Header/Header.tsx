import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  createTodo: (data: Todo) => void;
  handleError: (value: string) => void;
}

export const Header: React.FC<Props> = ({ createTodo, handleError }) => {
  const [todoTitle, setTodoTitle] = useState('');
  const HandleSubmit = (title: string) => {
    if (!title) {
      handleError("Title can't be empty");

      return;
    }

    const newTodo = {
      id: 1,
      userId: 10364,
      title,
      completed: false,
    };

    createTodo(newTodo);
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label  */}
      <button type="button" className="todoapp__toggle-all active" />

      {/* Add a todo on form submit */}
      <form onSubmit={() => HandleSubmit(todoTitle)}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={(event) => setTodoTitle(event.target.value)}
        />
      </form>
    </header>
  );
};

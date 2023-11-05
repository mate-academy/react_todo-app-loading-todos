import React, { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  addNewTodo: (item: Todo) => void;
};

export const Form: React.FC<Props> = ({ addNewTodo }) => {
  const [title, setTitle] = useState('');

  const handleBlur = () => {
    if (title.trim().length < 1) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      userId: +new Date(),
      title,
      completed: false,
    };

    setTitle('');
    addNewTodo(newTodo);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleBlur();
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        data-cy="NewTodoField"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleBlur}
      />
    </form>
  );
};

// <form>
//  <input
//    data-cy="NewTodoField"
//    type="text"
//    className="todoapp__new-todo"
//   placeholder="What needs to be done?"
// />
// </form>;

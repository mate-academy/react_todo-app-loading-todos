import React, { ChangeEvent, useState } from 'react';
import { updateTodos, createTodos, USER_ID } from '../api/todos';
import { Todo } from '../types/Todo';
import cn from 'classnames';

type Props = {
  posts: Todo[];
};

export const Header: React.FC<Props> = ({ posts }) => {
  const [value, setValue] = useState('');

  const setCompleted = () => {
    posts.map(post => {
      const id = post.id;

      updateTodos({ id, objectData: { completed: !post.completed } });
    });
  };

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const addPost = (e: ChangeEvent<HTMLFormElement>) => {
    if (!value) {
      return;
    }

    e.preventDefault();
    setValue('');
    createTodos({
      completed: false,
      title: value,
      userId: USER_ID,
    });
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        data-cy="ToggleAllButton"
        className={cn('todoapp__toggle-all', {
          active: posts.every(post => post.completed),
        })}
        onClick={setCompleted}
      />

      <form onSubmit={addPost}>
        <input
          data-cy="NewTodoField"
          type="text"
          onChange={onTextChange}
          value={value}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

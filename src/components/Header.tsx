import React, { useState, useContext } from 'react';
import cn from 'classnames';
import { DispatchContext, StateContext } from '../managment/TodoContext';
import { USER_ID } from '../api/todos';

export const Header: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const [title, setTitle] = useState('');
  const { todos } = useContext(StateContext);

  const allCompleted = todos.every(todo => todo.completed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim()) {
      dispatch({
        type: 'addTodo',
        title,
        userId: USER_ID,
      });
    }

    setTitle('');
  };

  const handleChangeStatusAll = () => {
    dispatch({
      type: 'changeStatusAll',
      payload: !allCompleted,
    });
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: allCompleted })}
          data-cy="ToggleAllButton"
          aria-label="Toggle all completed"
          onClick={handleChangeStatusAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={handleSubmit}
        />
      </form>
    </header>
  );
};

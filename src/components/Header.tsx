import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../management/TodoContext';

export const Header: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { userId, todos } = useContext(StateContext);
  const [title, setTitle] = useState('');

  const completedAll = todos.every(todo => todo.completed);

  const hendleAddedTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch({
        type: 'addTodo',
        title,
        userId,
      });
    }

    setTitle('');
  };

  const hendleChangeStatusAll = () => {
    dispatch({
      type: 'changeStatusAll',
      payload: !completedAll,
    });
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: completedAll,
          })}
          data-cy="ToggleAllButton"
          aria-label="Toggle all completed"
          onClick={hendleChangeStatusAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={hendleAddedTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={hendleAddedTodo}
        />
      </form>
    </header>
  );
};

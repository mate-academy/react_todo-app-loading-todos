import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { DispatchContext, StateContext } from '../../Store';
import { USER_ID } from '../../lib/user';

export const TodoHeader: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);
  const [newTitle, setNewTitle] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({
      type: 'addTodo',
      payload: {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        userId: USER_ID,
        title: newTitle,
        completed: false,
      },
    });
    setNewTitle('');
  };

  return (
    <header className="todoapp__header">

      {todos.length > 0 && (
        <button
          type="button"
          data-cy="ToggleAllButton"
          aria-label="Toggle all"
          className={cn('todoapp__toggle-all', {
            active: !todos.some(todo => !todo.completed),
          })}
          onClick={() => dispatch({ type: 'toggleAllCompletions' })}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="NewTodoField"
          value={newTitle}
          placeholder="What needs to be done?"
          className="todoapp__new-todo"
          onChange={event => setNewTitle(event.target.value)}
        />
      </form>
    </header>
  );
};

import React, { useContext } from 'react';
import cn from 'classnames';
import { DispatchContext, StateContext } from '../context/ContextReducer';

export const TodoAppHeader: React.FC = () => {
  const { totalLength, query } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleAddSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch({ type: 'addTodo' });
  };

  const currentButton = totalLength.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        onClick={() =>
          dispatch({ type: 'setAllCompleted', currentComleted: currentButton })
        }
        className={cn('todoapp__toggle-all', {
          active: currentButton && totalLength.length,
        })}
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleAddSubmit}>
        <input
          onChange={event =>
            dispatch({ type: 'setQuery', value: event.target.value })
          }
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
        />
      </form>
    </header>
  );
};

/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import cn from 'classnames';
import { DispatchContext, StateContext } from '../Context/StateContext';

export const Header: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const allCompleted = todos.every(todo => todo.completed);

  const handlerToggleAll = () => {
    dispatch({
      type: 'toggleCompleted',
      payload: !allCompleted,
    });
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: allCompleted,
        })}
        data-cy="ToggleAllButton"
        onClick={handlerToggleAll}
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

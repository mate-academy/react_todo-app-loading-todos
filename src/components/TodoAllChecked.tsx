/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoContext } from './TodoContext';
import '../styles/todoapp.scss';

export const TodoAllChecked: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);

  const isChecked = todos.length > 0 && todos.every((todo) => todo.completed);

  const handleToggleAllChange = () => {
    const allCompleted = todos.every((todo) => todo.completed);

    setTodos(todos.map((todo) => ({ ...todo, completed: !allCompleted })));
  };

  return (
    <>
      {!!todos.length && (
        <>
          <button
            type="button"
            id="toggle-all"
            className={`todoapp__toggle-all ${isChecked ? 'active' : ''}`}
            data-cy="ToggleAllButton"
            onClick={handleToggleAllChange}
          />
        </>
      )}
    </>
  );
};

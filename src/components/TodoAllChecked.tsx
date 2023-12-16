/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState, useEffect } from 'react';
import { TodoContext } from './TodoContext';
import '../styles/todoapp.scss';

export const TodoAllChecked: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [isChecked, setIsChecked] = useState(
    todos.every((todo) => todo.completed),
  );

  useEffect(() => {
    if (todos.every((todo) => todo.completed)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [todos]);

  const handleToggleAllChange = () => {
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }

    setTodos(todos.map((todo) => ({ ...todo, completed: !isChecked })));
  };

  return (
    <>
      {!!todos.length && (
        <>
          <button
            type="button"
            id="toggle-all"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
            onClick={handleToggleAllChange}
          />
        </>
      )}
    </>
  );
};

import React, { useContext, useState } from 'react';

import './Header.scss';
import { TodosContext } from '../TodosContext';

export const Header: React.FC = () => {
  const { dispatch } = useContext(TodosContext);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  // const [isChecked, setIsChecked] = useState(false);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTodoTitle('');
    }

    if (event.key === 'Enter') {
      if (newTodoTitle.trim().length) {
        dispatch({
          type: 'add',
          payload: {
            id: +new Date(),
            title: newTodoTitle,
            completed: false,
          },
        });
      }

      setNewTodoTitle('');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  // const handleToggleAllClick = () => {
  //   setIsChecked(!isChecked);
  //   dispatch({
  //     type: 'toggleAll',
  //     payload: !isChecked,
  //   });
  // };

  return (
    <header className="todoapp__header">
      {/* <button
        type="button"
        id="toggle-all"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        checked={isChecked}
        onClick={handleToggleAllClick}
      /> */}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
      </form>
    </header>
  );
};

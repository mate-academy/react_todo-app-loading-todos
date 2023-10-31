/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { TodosContext } from '../../store/store';
import { Dispatchers } from '../../types/enums/Dispatchers';

const USER_ID = 11806;

export const Header: React.FC = () => {
  const [value, setValue] = useState('');
  const { todos, dispatcher } = useContext(TodosContext);
  const [isAllComplited, setIsAllComplited] = useState(false);

  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValue(event.target.value);
  };

  const handleCreateNewTodo = () => {
    const newTodo = {
      title: value.trim(),
      completed: false,
      userId: USER_ID,
    };

    if (!value.trim()) {
      return;
    }

    dispatcher({ type: Dispatchers.Add, payload: newTodo });
    setValue('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleCreateNewTodo();
  };

  const toggleAllStatuses = (): void => {
    if (isAllComplited === false) {
      dispatcher({ type: Dispatchers.ChangeAllStatuses, payload: true });
    }

    if (isAllComplited === true) {
      dispatcher({ type: Dispatchers.ChangeAllStatuses, payload: false });
    }
  };

  useEffect(() => {
    setIsAllComplited(todos.every(elem => elem.completed));
  }, [todos]);

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className={cn(
          'todoapp__toggle-all',
          { active: isAllComplited },
        )}
        data-cy="ToggleAllButton"
        onClick={toggleAllStatuses}
      />

      <form
        onSubmit={handleSubmit}
        action="/#"
      >
        <input
          value={value}
          onChange={handleValueChange}
          onBlur={handleCreateNewTodo}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

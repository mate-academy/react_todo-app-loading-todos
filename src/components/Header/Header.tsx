import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todosToRender: Todo[];
  setTodosToRender: (arr: Todo[]) => void;
};

export const Header: React.FC<Props> = ({
  todosToRender,
  setTodosToRender,
}) => {
  const [value, setValue] = useState('');

  const onInputChange = (str: string) => {
    setValue(() => str);
  };

  // this would be handled using methods later
  const toggleAll = () => {
    if (todosToRender) {
      setTodosToRender([...todosToRender].map(todo => {
        return todosToRender.every(item => item.completed)
          ? {
            ...todo,
            completed: !todo.completed,
          }
          : {
            ...todo,
            completed: true,
          };
      }));
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={`todoapp__toggle-all${todosToRender?.some(todo => !todo.completed) ? ' active' : ''}`}
        onClick={toggleAll}
        aria-label="Toggle all"
      />

      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={(e) => onInputChange(e.target.value)}
        />
      </form>
    </header>
  );
};

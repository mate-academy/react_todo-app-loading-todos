import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { FILTER_OPTIONS } from '../../utils/constants';

type Props = {
  todos: Todo[],
  todosToRender: Todo[]
  setTodosToRender: (arr: Todo[]) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  todosToRender,
  setTodosToRender,
}) => {
  const [selectedButton, setSelectedButton] = useState('All');
  const itemsLeft
  = todos.reduce((acc, item) => (!item.completed ? acc + 1 : acc), 0);

  const filterTodos = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setTodosToRender(todos.filter(({ completed }) => {
      switch (e.currentTarget.innerText) {
        case 'All':
          return true;
        case 'Active':
          return !completed;
        case 'Completed':
          return completed;
        default:
      }

      return false;
    }));
    setSelectedButton(e.currentTarget.innerText);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft} items left`}
      </span>

      <nav className="filter">
        {FILTER_OPTIONS.map(item => (
          <a
            href={`"#/${item !== 'All' ? item.toLowerCase() : ''}"`}
            className={`filter__link${selectedButton === item ? ' selected' : ''}`}
            onClick={filterTodos}
            key={item}
          >
            {item}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={!todosToRender.some((item: Todo) => item.completed)}
      >
        Clear completed
      </button>

    </footer>
  );
};

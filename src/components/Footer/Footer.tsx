import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { getTodos } from '../../api/todos';
import { Filter } from '../../types/filter';

interface Props {
  todos: Todo[];
  setTodos: (b: Todo[]) => void;
  filtered: string;
  setFiltered: (b: Filter) => void;
}

export const Footer = ({ todos, setTodos, filtered, setFiltered }: Props) => {
  const [todoLength, setTodoLength] = useState(0);

  useEffect(() => {
    getTodos().then(todoses => {
      switch (filtered) {
        case Filter.active:
          setTodos(todoses.filter(todo => !todo.completed));
          break;
        case Filter.completed:
          setTodos(todoses.filter(todo => todo.completed));
          break;
        default:
          setTodos(todoses);
      }
    });
  }, [filtered, setTodos]);

  const Clear = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  useEffect(() => {
    getTodos().then(todoses => {
      setTodoLength(todoses.filter(todo => !todo.completed).length);
    });
  }, [todos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      {/* Hide the footer if there are no todos */}
      <span className="todo-count" data-cy="TodosCounter">
        {`${todoLength} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filtered === Filter.all })}
          data-cy="FilterLinkAll"
          onClick={() => setFiltered(Filter.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filtered === Filter.active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFiltered(Filter.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filtered === Filter.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFiltered(Filter.completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        disabled={todos.every(todo => !todo.completed)}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={Clear}
      >
        Clear completed
      </button>
    </footer>
  );
};

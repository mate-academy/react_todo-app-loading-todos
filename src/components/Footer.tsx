import React from 'react';
import { SelectedTasks, Todo } from '../types/Types';
import classNames from 'classnames';

type FooterProps = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  selectedTasks: SelectedTasks;
  setSelectedTasks: (selectedTasks: SelectedTasks) => void;
};

export const Footer = ({
  todos,
  setTodos,
  selectedTasks,
  setSelectedTasks,
}: FooterProps) => {
  const todosLeft = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosLeft} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectedTasks === SelectedTasks.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setSelectedTasks(SelectedTasks.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selectedTasks === SelectedTasks.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setSelectedTasks(SelectedTasks.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selectedTasks === SelectedTasks.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setSelectedTasks(SelectedTasks.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => setTodos([])}
      >
        Clear completed
      </button>
    </footer>
  );
};

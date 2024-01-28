import React from "react";
import { Todo } from "../../types/Todo";
import classNames from "classnames";

type Props = {
  posts: Todo[];
  setPosts: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const Footer: React.FC<Props> = ({ posts, setPosts, filter, setFilter }) => {
  const activeTodos = posts.filter(todo => todo.completed === false);
  const todosCounter = activeTodos.length;
  const completedTodos = posts.filter(todo => todo.completed);

  const clearCompleted = () => {
    setPosts([...activeTodos]);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todosCounter} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            'selected': filter === 'all'
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            'selected': filter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            'selected': filter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter('completed')}
        >
          Completed
        </a>
      </nav>

      {/* {completedTodos.length > 0 && ( */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompleted}
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>
      {/* )} */}
    </footer>
  )
};

import React from 'react'
import cn from 'classnames';

import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

type Props = {
  filter: Filter,
  setFilter: (item: Filter) => void,
  todos: Todo[],
}

const TodoFooter: React.FC<Props> = ({ filter, setFilter, todos }) => {
  const filters = [
    { name: 'All', value: Filter.All, link: '#/', dataCy: 'FilterLinkAll' },
    { name: 'Active', value: Filter.Active, link: '#/active', dataCy: 'FilterLinkActive' },
    { name: 'Completed', value: Filter.Completed, link: '#/completed', dataCy: 'FilterLinkCompleted' },
  ];

  const currentTodosLength = todos.filter(todo => !todo.completed).length;

  const currentTodosMessage = currentTodosLength === 1
    ? ('1 item left')
    : (`${currentTodosLength} items left`);

  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer" >
      <span className="todo-count" data-cy="TodosCounter">
        {currentTodosMessage}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filters.map(item => (
          <a
            data-cy={item.dataCy}
            href={item.link}
            className={cn('filter__link', { selected: filter === item.value })}
            onClick={() => setFilter(item.value)}
          >
            {item.name}
          </a>
        ))}
      </nav>

      {/* don't show this button if there are no completed todos */}
      {hasCompletedTodos &&
        (
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        )}

    </footer >
  )
}

export default TodoFooter

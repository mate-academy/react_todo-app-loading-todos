import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { filterTodos } from './Todolist';
import { Todo } from '../types/Todo';

interface T {
  todos: Todo[]
  setTodos: Dispatch<SetStateAction<Todo[]>>
  filterType: string
  setFilterType: Dispatch<SetStateAction<string>>
}

export const TodosFooter: React.FC<T> = (
  {
    todos,
    setTodos,
    filterType,
    setFilterType,
  },
) => {
  const localFilterTodos = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {localFilterTodos !== 1 ? `${localFilterTodos} items left` : '1 item left'}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          data-cy="FilterLinkAll"
          className={classNames('filter__link',
            { selected: filterType === 'all' })}
          onClick={() => setFilterType('all')}
        >
          All
        </a>

        <a
          href="#/active"
          data-cy="FilterLinkActive"
          className={classNames('filter__link',
            { selected: filterType === 'active' })}
          onClick={() => setFilterType('active')}
        >
          Active
        </a>
        <a
          href="#/completed"
          data-cy="FilterLinkCompleted"
          className={classNames('filter__link',
            { selected: filterType === 'completed' })}
          onClick={() => setFilterType('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className={classNames('todoapp__clear-completed',
          { hidden: filterTodos(todos, 'completed').length === 0 })}
        data-cy="ClearCompletedButton"
        onClick={() => setTodos(todos.filter(todo => !todo.completed))}
      >
        Clear completed
      </button>
    </footer>
  );
};

// <footer className="todoapp__footer" data-cy="Footer">
// <span className="todo-count" data-cy="TodosCounter">
//   3 items left
// </span>

// {/* Active filter should have a 'selected' class */}
// <nav className="filter" data-cy="Filter">
//   <a
//     href="#/"
//     className="'filter__link' selected"
//     data-cy="FilterLinkAll"
//   >
//     All
//   </a>

//   <a
//     href="#/active"
//     className="'filter__link'"
//     data-cy="FilterLinkActive"
//   >
//     Active
//   </a>

//   <a
//     href="#/completed"
//     className="'filter__link'"
//     data-cy="FilterLinkCompleted"
//   >
//     Completed
//   </a>
// </nav>

// {/* don't show this button if there are no completed todos */}
// <button
//   type="button"
//   className="todoapp__clear-completed"
//   data-cy="ClearCompletedButton"
// >
//   Clear completed
// </button>
// </footer>

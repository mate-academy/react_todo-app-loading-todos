import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[] | null,
};

export const TodoList = ({ todos }: Props) => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[] | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  useEffect(() => {
    setVisibleTodos(todos);
  }, [todos]);

  const handleTodosFilter = (filter: string) => {
    setActiveFilter(filter);

    if (!todos) {
      return;
    }

    let filteredTodos = [...todos];

    switch (filter) {
      case 'Active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case 'Completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    setVisibleTodos(filteredTodos);
  };

  return (
    <>
      {visibleTodos?.map(todo => (
        <div
          data-cy="Todo"
          className={classNames({ 'todo completed': todo.completed })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}
          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          {/* overlay will cover the todo while it is being updated */}
          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
      {visibleTodos
              && (
                <footer className="todoapp__footer" data-cy="Footer">
                  <span className="todo-count" data-cy="TodosCounter">
                    {`${visibleTodos.length} items left`}
                  </span>

                  {/* Active filter should have a 'selected' class */}
                  <nav className="filter" data-cy="Filter">
                    <a
                      href="#/"
                      className={classNames('filter__link', {
                        selected: activeFilter === 'All',
                      })}
                      data-cy="FilterLinkAll"
                      onClick={() => handleTodosFilter('All')}
                    >
                      All
                    </a>

                    <a
                      href="#/active"
                      className={classNames('filter__link', {
                        selected: activeFilter === 'Active',
                      })}
                      data-cy="FilterLinkActive"
                      onClick={() => handleTodosFilter('Active')}
                    >
                      Active
                    </a>

                    <a
                      href="#/completed"
                      className={classNames('filter__link', {
                        selected: activeFilter === 'Completed',
                      })}
                      data-cy="FilterLinkCompleted"
                      onClick={() => handleTodosFilter('Completed')}
                    >
                      Completed
                    </a>
                  </nav>

                  {/* don't show this button if there are no completed todos */}
                  <button
                    type="button"
                    className="todoapp__clear-completed"
                    data-cy="ClearCompletedButton"
                  >
                    Clear completed
                  </button>
                </footer>
              )}
    </>
  );
};

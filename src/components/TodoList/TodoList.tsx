import { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { FilterType } from '../../types/FilterType';

type Props = {
  todos: Todo[];
};

const getTodos = (todos: Todo[], filterMethod: FilterType): Todo[] => {
  switch (filterMethod) {
    case FilterType.Active:
      return todos.filter(todo => !todo.completed);

    case FilterType.Completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [filterType, setFilterType] = useState(FilterType.All);

  const visibleTodos = getTodos(todos, filterType);

  const activeTodos = todos.filter(todo => !todo.completed).length;

  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <>
      <header className="todoapp__header">
        {/* this buttons is active only if there are some active todos */}
        <button
          type="button"
          className={classNames(
            'todoapp__toggle-all',
            { active: !activeTodos },
          )}
        >
          {}
        </button>

        {/* Add a todo on form submit */}
        <form>
          <input
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      <section className="todoapp__main">
        {visibleTodos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
          />
        ))}
      </section>

      {todos.length > 0 && (
        <footer className="todoapp__footer">
          <span className="todo-count">
            {`${activeTodos} items left`}
          </span>

          <nav className="filter">
            <a
              href="#/"
              className={classNames(
                'filter__link',
                {
                  selected: filterType === FilterType.All,
                },
              )}
              onClick={() => {
                if (filterType !== FilterType.All) {
                  setFilterType(FilterType.All);
                }
              }}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames(
                'filter__link',
                {
                  selected: filterType === FilterType.Active,
                },
              )}
              onClick={() => {
                if (filterType !== FilterType.Active) {
                  setFilterType(FilterType.Active);
                }
              }}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames(
                'filter__link',
                {
                  selected: filterType === FilterType.Completed,
                },
              )}
              onClick={() => {
                if (filterType !== FilterType.Completed) {
                  setFilterType(FilterType.Completed);
                }
              }}
            >
              Completed
            </a>
          </nav>

          <button type="button" className="todoapp__clear-completed">
            {completedTodos.length > 0 && (
              'Clear completed'
            )}
          </button>
        </footer>
      )}
    </>
  );
};

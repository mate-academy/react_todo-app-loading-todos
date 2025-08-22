import { useState } from 'react';
import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
};
enum Filters {
  All,
  Active,
  Completed,
}
function TodoMain({ todos }: Props) {
  const [filter, setFilter] = useState<Filters>(Filters.All);
  const filterTodos = () => {
    switch (filter) {
      case Filters.Active: {
        return todos.filter(todo => !todo.completed);
      }
      case Filters.Completed: {
        return todos.filter(todo => todo.completed);
      }
      case Filters.All:
      default:
        return todos;
    }
  };
  const filteredTodos = filterTodos();
  const allCompleted = todos.every(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed).length;
  const handleChangeFilter = (value: Filters) => {
    if (value !== filter) {
      setFilter(value);
    }
  };
  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">
        {filteredTodos.length > 0 && (
          <>
            {filteredTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </>
        )}
      </section>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {activeTodos} items left
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: filter === Filters.All,
              })}
              data-cy="FilterLinkAll"
              onClick={() => handleChangeFilter(Filters.All)}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: filter === Filters.Active,
              })}
              data-cy="FilterLinkActive"
              onClick={() => handleChangeFilter(Filters.Active)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: filter === Filters.Completed,
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => handleChangeFilter(Filters.Completed)}
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={!allCompleted}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
}

export default TodoMain;

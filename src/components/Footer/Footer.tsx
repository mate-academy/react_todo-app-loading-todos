import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoFilter } from '../../types/TodoFIlter';
import './Footer.scss';

type FooterProps = {
  todos: Todo[];
  currentFilter: TodoFilter;
  setCurrentFilter: React.Dispatch<React.SetStateAction<TodoFilter>>;
  handleDeleteTodo: (todoId: number) => void;
};

export const Footer: React.FC<FooterProps> = ({
  todos,
  currentFilter,
  setCurrentFilter,
  handleDeleteTodo,
}) => {
  const counterActive = todos.filter(todo => !todo.completed).length || 0;
  const counterCompleted = todos.filter(todo => todo.completed).length || 0;

  const handleFilter = (filter: TodoFilter) => {
    setCurrentFilter(filter);
  };

  const handleClearCompleted = () => {
    todos.forEach(todo => {
      if (todo.completed) {
        handleDeleteTodo(todo.id);
      }
    });
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${counterActive} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: currentFilter === TodoFilter.All },
          )}
          onClick={() => {
            handleFilter(TodoFilter.All);
          }}
        >
          {TodoFilter.All}
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: currentFilter === TodoFilter.Active },
          )}
          onClick={() => {
            handleFilter(TodoFilter.Active);
          }}
        >
          {TodoFilter.Active}
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: currentFilter === TodoFilter.Completed },
          )}
          onClick={() => {
            handleFilter(TodoFilter.Completed);
          }}
        >
          {TodoFilter.Completed}
        </a>
      </nav>

      <button
        type="button"
        className={classNames(
          'todoapp__clear-completed',
          { 'todoapp__clear-completed--disabled': !counterCompleted },
        )}
        onClick={() => {
          handleClearCompleted();
        }}
      >
        Clear completed
      </button>

    </footer>
  );
};

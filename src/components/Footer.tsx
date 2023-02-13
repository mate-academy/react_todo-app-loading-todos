import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  onSelected: string
  onSetSelected: (value: string) => void
  Todos: Todo[]
  onDeleteTodo: (value: number) => void
};

export const Footer: React.FC<Props>
  = ({
    onSelected, onSetSelected, Todos, onDeleteTodo,
  }) => {
    const completedTodos = Todos.filter(todo => todo.completed);
    const todosLeft = Todos.filter(todo => !todo.completed);

    return (
      <footer className="todoapp__footer">
        <span className="todo-count">
          {`${todosLeft.length} items left`}
        </span>

        {/* Active filter should have a 'selected' class */}
        <nav className="filter">
          <a
            href="#/"
            className={cn('filter__link', {
              selected: onSelected === 'All',
            })}
            onClick={() => onSetSelected('All')}
          >
            All
          </a>

          <a
            href="#/active"
            className={cn('filter__link', {
              selected: onSelected === 'Active',
            })}
            onClick={() => onSetSelected('Active')}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={cn('filter__link', {
              selected: onSelected === 'Completed',
            })}
            onClick={() => onSetSelected('Completed')}

          >
            Completed
          </a>
        </nav>

        {/* don't show this button if there are no completed todos */}
        {Todos.find(todo => todo.completed) && (
          <button
            type="button"
            className="todoapp__clear-completed"
            onClick={() => {
              completedTodos.forEach(todo => {
                onDeleteTodo(todo.id);
              });
            }}
          >
            Clear completed
          </button>
        )}

      </footer>

    );
  };

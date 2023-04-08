import classNames from 'classnames';
import { Dispatch, FC, SetStateAction } from 'react';
import { Todo } from '../../types/Todo';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  todos: Todo[],
  todoStatus: TodoStatus,
  setTodoStatus: Dispatch<SetStateAction<TodoStatus>>,
};

export const TodoFilter: FC<Props> = ({
  todos,
  todoStatus,
  setTodoStatus,
}) => {
  const numberOfRemainingTodos = todos
    .filter(({ completed }) => !completed)
    .length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${numberOfRemainingTodos} items left`}
      </span>

      <nav className="filter">
        {Object.values(TodoStatus).map(status => (
          <a
            key={status}
            href={`#${status}`}
            className={classNames(
              'filter__link',
              {
                selected: todoStatus === status,
              },
            )}
            onClick={() => setTodoStatus(status)}
          >
            {status.slice(0, 1).toUpperCase() + status.slice(1)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className={classNames(
          'todoapp__clear-completed',
          {
            'is-invisible': todos.every(todo => !todo.completed),
          },
        )}
      >
        Clear completed
      </button>
    </footer>
  );
};

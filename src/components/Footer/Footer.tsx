import cn from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { getTodos } from '../../api/todos';
import { Todo } from '../../types/Todo';
import { AuthContext } from '../Auth/AuthContext';

type Props = {
  onTodosChange: (value: Todo[]) => void;
};

export const Footer: React.FC<Props> = ({
  onTodosChange,
}) => {
  const [clickedValue, setClickedValue] = useState<number>(0);
  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);

  const user = useContext(AuthContext);

  useEffect(() => {
    const findActiveTodos = async () => {
      const todosFromServer = user && await getTodos(user.id);

      const filteredTodos = todosFromServer
        && todosFromServer.filter(todo => todo.completed === false);

      if (filteredTodos) {
        setActiveTodos(filteredTodos);
      }
    };

    findActiveTodos();
  }, [activeTodos]);

  const handleFilter = async (todosStatus: boolean) => {
    const todosFromServer = user && await getTodos(user.id);

    const filterTodoByStatus = (actualTodos: Todo[], status: boolean) => {
      return actualTodos.filter(todo => todo.completed === status);
    };

    if (todosFromServer) {
      onTodosChange(filterTodoByStatus(todosFromServer, todosStatus));
    }
  };

  const showAllHandler = async () => {
    const todosFromServer = user && await getTodos(user.id);

    return todosFromServer && onTodosChange(todosFromServer);
  };

  const questionTags = [
    { label: 'All', value: 0 },
    { label: 'Active', value: 1 },
    { label: 'Completed', value: 2 },
  ];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={cn(
            'filter__link',
            { selected: clickedValue === 0 },
          )}
          onClick={() => {
            showAllHandler();
            setClickedValue(0);
          }}
        >
          {questionTags[0].label}
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={cn(
            'filter__link',
            { selected: clickedValue === 1 },
          )}
          onClick={() => {
            handleFilter(false);
            setClickedValue(1);
          }}
        >
          {questionTags[1].label}
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={cn(
            'filter__link',
            { selected: clickedValue === 2 },
          )}
          onClick={() => {
            handleFilter(true);
            setClickedValue(2);
          }}
        >
          {questionTags[2].label}
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};

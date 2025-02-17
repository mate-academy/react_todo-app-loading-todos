import { deleteTodo } from '../../api/todos';

import { useTodosContext } from '../../context/TodosContext';

import { Status } from '../../types/Status';

type FooterProps = {
  status: Status;
  setStatus: (key: Status) => void;
  isClearAllCompletedActive: boolean;
};

export const Footer: React.FunctionComponent<FooterProps> = ({
  isClearAllCompletedActive,
  status,
  setStatus,
}) => {
  const { todos, setTodos, setLoadingIds, setErrorMessage } = useTodosContext();

  const statuses = Object.values(Status);

  const activeTodos = todos.filter(activeTodo => !activeTodo.completed);

  const handleDeleteAllCompletedTodos = async () => {
    const completedIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    setLoadingIds(completedIds);

    await Promise.all(
      completedIds.map(id =>
        deleteTodo(id)
          .then(() => {
            setTodos(todos.filter(todo => !completedIds.includes(todo.id)));
          })
          .catch(() => {
            setErrorMessage('Unable to delete completed todos');
          })
          .finally(() => {
            setLoadingIds([]);
          }),
      ),
    );
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {statuses.map(filter => (
          <a
            key={filter}
            href={`#/${filter !== 'All' ? filter : ''}`}
            className={`filter__link ${status === filter ? 'selected' : ''}`}
            data-cy={`FilterLink${filter}`}
            onClick={() => setStatus(filter as Status)}
          >
            {filter}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleDeleteAllCompletedTodos}
        disabled={!isClearAllCompletedActive}
      >
        Clear completed
      </button>
    </footer>
  );
};

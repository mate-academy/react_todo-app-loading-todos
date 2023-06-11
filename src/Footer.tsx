import { TodoStatus } from './types/TodoStatus';

interface Props {
  handleFilterTodos:(status: TodoStatus) => void,
  status: TodoStatus,
  itemsLeft: number,
}

export const Footer: React.FC<Props> = (
  {
    handleFilterTodos,
    status,
    itemsLeft,
  },
) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={`filter__link ${status === TodoStatus.all ? 'selected' : ''}`}
          onClick={
            () => handleFilterTodos(TodoStatus.all)
          }
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${status === TodoStatus.active ? 'selected' : ''}`}
          onClick={
            () => handleFilterTodos(TodoStatus.active)
          }
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${status === TodoStatus.completed ? 'selected' : ''}`}
          onClick={
            () => handleFilterTodos(TodoStatus.completed)
          }
        >
          Completed
        </a>
      </nav>

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};

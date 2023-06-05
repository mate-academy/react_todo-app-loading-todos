type TodoStatus = 'all' | 'active' | 'completed';

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
          className={`filter__link ${status === 'all' ? 'selected' : ''}`}
          onClick={
            () => handleFilterTodos('all')
          }
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${status === 'active' ? 'selected' : ''}`}
          onClick={
            () => handleFilterTodos('active')
          }
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${status === 'completed' ? 'selected' : ''}`}
          onClick={
            () => handleFilterTodos('completed')
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

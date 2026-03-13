import { deleteTodo } from '../../../api/todos';
import { Status } from '../../../types';
import { Todo } from '../../../types';

type Props = {
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const Footer: React.FC<Props> = ({
  status,
  setStatus,
  todos,
  setTodos,
}) => {
  const itensLeft = todos.filter(todo => !todo.completed).length;

  const deleteCompleted = async () => {
    const completed = todos.filter(todo => todo.completed);

    for (const todo of completed) {
      await deleteTodo(todo.id);
    }

    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itensLeft} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className={'filter'} data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${status === 'All' ? 'selected' : ''} `}
          data-cy="FilterLinkAll"
          onClick={() => setStatus('All')}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${status === 'Active' ? 'selected' : ''} `}
          data-cy="FilterLinkActive"
          onClick={() => setStatus('Active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${status === 'Completed' ? 'selected' : ''} `}
          data-cy="FilterLinkCompleted"
          onClick={() => setStatus('Completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={async () => {
          setStatus('All');
          await deleteCompleted();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};

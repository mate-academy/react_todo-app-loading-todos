import { Filter } from '../Filter';

type Props = {
  status: string,
  setStatus: (status: string) => void,
};

export const Footer: React.FC<Props> = ({ status, setStatus }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        4 items left
      </span>

      <Filter status={status} setStatus={setStatus} />

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

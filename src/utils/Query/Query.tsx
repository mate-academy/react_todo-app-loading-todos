import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  handleError:(errorMessage: string) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredTodos: Todo[];
};

export const Query:React.FC<Props> = ({
  handleError,
  query,
  setQuery,
  filteredTodos,
}) => {
  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim()) {
      handleError('Title should not be empty');
    }
  };

  const numberOfActive = filteredTodos.filter(
    (item) => !item.completed,
  ).length;

  return (
    <header className="todoapp__header">
      {/* eslint-disable-next-line */}
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: numberOfActive > 0 },
        )}
        data-cy="ToggleAllButton"
      />
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

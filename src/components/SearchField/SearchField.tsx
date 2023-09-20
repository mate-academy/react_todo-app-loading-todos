import { FC, useContext } from 'react';
import cn from 'classnames';
import { ErrorProvider } from '../../context/TodoError';
import { waitToClose } from '../../utils/hideErrorWithDelay';

type TSearchFieldProps = {
  searchValue: string;
  allTodoCompleted: boolean;
  hasTodos: boolean;
  setSearchValue: (newValue: string) => void;
};

export const SearchField: FC<TSearchFieldProps> = ({
  setSearchValue,
  searchValue,
  allTodoCompleted,
  hasTodos,
}) => {
  const {
    setHasSearchValueError,
    hasSearchValueError,
  } = useContext(ErrorProvider);

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchValue) {
      setHasSearchValueError(true);
    }

    waitToClose(3000, setHasSearchValueError);
  };

  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);

    if (!hasSearchValueError) {
      setHasSearchValueError(false);
    }
  };

  return (
    <header className="todoapp__header">
      {hasTodos && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: allTodoCompleted,
          })}
          data-cy="ToggleAllButton"
          aria-label="toggle button"
        />
      )}

      {/* Add a todo on form submit */}
      <form
        onSubmit={handleSubmitForm}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={searchValue}
          onChange={handleSearchValue}
        />
      </form>
    </header>
  );
};

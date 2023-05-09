import { Errors } from '../../types/Errors';

type Props = {
  hasSomeTodos: boolean,
  onChangeIsError: (e: Errors) => void,
};

export const Header: React.FC<Props> = ({ hasSomeTodos, onChangeIsError }) => {
  const handleFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChangeIsError(Errors.ADD);
  };

  return (
    <header className="todoapp__header">
      {hasSomeTodos && (
      // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button type="button" className="todoapp__toggle-all active" />
      )}

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

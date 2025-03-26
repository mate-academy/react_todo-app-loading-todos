import { Form } from '../Form/Form';

type Props = {
  query: string;
  onInput: (v: string) => void;
};

export const Header: React.FC<Props> = ({ query, onInput }) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <Form query={query} onInput={onInput} />
    </header>
  );
};

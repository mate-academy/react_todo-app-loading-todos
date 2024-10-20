import { Todo } from '../../types/Todo';
import { ToggleAllButton } from '../../components/ToggleAllButton';
import { Form } from '../../components/Form';

type Props = {
  filteredTodos: Todo[];
  isAllCompleted: boolean;
};

export const Header: React.FC<Props> = ({ filteredTodos, isAllCompleted }) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {filteredTodos.length > 0 && (
        <ToggleAllButton isAllCompleted={isAllCompleted} />
      )}

      {/* Add a todo on form submit */}
      <Form />
    </header>
  );
};

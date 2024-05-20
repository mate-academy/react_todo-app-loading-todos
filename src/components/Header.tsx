import cn from 'classnames';

import { Todo } from '../types/Todo';
import { useTodosContext } from '../Context/TodosContext';

type HeaderProps = {
  newTodo: Todo;
  submit: (e: React.FormEvent<HTMLFormElement>) => void;
  changeTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Header: React.FC<HeaderProps> = ({
  newTodo,
  submit,
  changeTodo,
}) => {
  const { todos } = useTodosContext();
  const showToggleAll = todos.length > 0;
  const isToggleButtonActive = todos.every(t => t.completed);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {showToggleAll && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: isToggleButtonActive,
          })} // active
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={submit}>
        <input
          data-cy="NewTodoField"
          value={newTodo.title}
          onChange={changeTodo}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

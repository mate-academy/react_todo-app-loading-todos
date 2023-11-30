import classNames from 'classnames';
import { useContext, useState } from 'react';
import { TodosContext } from '../TodosContext';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {};

export const Header: React.FC<Props> = () => {
  const [value, setValue] = useState('');
  const { todos, setTodos } = useContext(TodosContext);

  const isChecked = todos.every(todo => todo.completed);

  const handleToggleAll = () => {
    const isAllCheked = todos.every(todo => todo.completed);
    const modifiedTodos = todos.map(todo => ({
      ...todo,
      completed: !isAllCheked,
    }));

    setTodos(modifiedTodos);
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', { active: isChecked })}
        data-cy="ToggleAllButton"
        onClick={handleToggleAll}
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </form>
    </header>
  );
};

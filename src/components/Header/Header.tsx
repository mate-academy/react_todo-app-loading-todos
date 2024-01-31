import { v4 as uuidv4 } from 'uuid';
import { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../../contexts/TodosContext';
import { USER_ID } from '../../variables';
import { createTodo } from '../../api/todos';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const Header = () => {
  const {
    title,
    setTitle,
    todos,
    setTodos,
  } = useContext(TodosContext);

  const changeValues = () => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        userId: USER_ID,
        title,
        completed: false,
      },
    ]);

    createTodo({
      userId: USER_ID,
      title,
      completed: false,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim()) {
      changeValues();
      setTitle('');
    }
  };

  const hendlerChange
    = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(
      event.target.value,
    );

  const conuterOfCompletedTodos = useMemo(() => {
    return !todos.filter(todo => !todo.completed).length;
  }, [todos]);

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all',
          { active: conuterOfCompletedTodos })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          onChange={hendlerChange}
          data-cy="NewTodoField"
          value={title}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

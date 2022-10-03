import classNames from 'classnames';
import { FormEvent, useState } from 'react';
import { addTodo } from '../../api/todos';
import { Props } from './HeaderPropTypes';

export const Header : React.FC<Props> = ({
  newTodoField,
  userId,
  addInVisibleTodos,
  setIsLoading,
  setErrorMessage,
  selectAllTodos,
  isAllSelected,
}) => {
  const [title, setTitle] = useState('');

  const onHandlerSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    if (!title.trim()) {
      setErrorMessage('title not able to be empty');
      setIsLoading(false);

      return;
    }

    setTitle('');
    try {
      const newTodo = await addTodo(userId, title);

      addInVisibleTodos(newTodo);
    } catch {
      setErrorMessage('add a todo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="todoapp__header">
      <button
        aria-label="delete"
        data-cy="ToggleAllButton"
        type="button"
        className={classNames(
          'todoapp__toggle-all', { active: isAllSelected },
        )}
        onClick={() => selectAllTodos()}
      />

      <form onSubmit={onHandlerSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};

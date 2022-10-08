import classNames from 'classnames';
import { FormEvent, useCallback, useState } from 'react';
import { addTodo } from '../../api/todos';
import { Props } from './HeaderPropTypes';

export const Header : React.FC<Props> = ({
  newTodoField,
  userId,
  addInVisibleTodos,
  setLoadingTodoId,
  setErrorMessage,
  selectAllTodos,
  isAllSelected,
  setTemporaryTodo,
}) => {
  const [title, setTitle] = useState('');

  const onHandlerSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      setLoadingTodoId(0);
      if (!title.trim()) {
        setErrorMessage('title not able to be empty');
        setLoadingTodoId(null);

        return;
      }

      if (!userId) {
        return;
      }

      setTemporaryTodo({
        title,
        id: 0,
        completed: false,
        userId,
      });

      setTitle('');
      try {
        const newTodo = await addTodo(userId, title);

        addInVisibleTodos(newTodo);
      } catch {
        const errorMesg = 'add a todo';

        setErrorMessage(errorMesg);
      } finally {
        setTemporaryTodo(null);
        setLoadingTodoId(null);
      }
    }, [title],
  );

  return (
    <header className="todoapp__header">
      <button
        aria-label="delete"
        data-cy="ToggleAllButton"
        type="button"
        className={classNames(
          'todoapp__toggle-all', { active: !isAllSelected },
        )}
        onClick={selectAllTodos}
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

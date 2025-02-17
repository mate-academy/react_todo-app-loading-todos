import { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from '../../Context/TodoContext';
import classNames from 'classnames';
import { ACTIONS } from '../../types/Actions';
import { USER_ID } from '../../api/todos';
import '../../styles/notification.scss';
import { Loader } from '../Loader';
import { useNotification } from '../../Context/NotificationContext';

export const TodoInput = () => {
  const { dispatch, state, handleAddTodo } = useContext(TodosContext);
  const { showNotification, hideNotification } = useNotification();
  const [newTodo, setNewTodo] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [isNewTodoLoading, setIsNewTodoLoading] = useState(false);
  const { isLoading, isError } = state;

  const createNewTodo = () => {
    return {
      title: newTodo.trim(),
      completed: false,
      userId: USER_ID,
    };
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleAdd = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTodo('');

      return;
    }

    if (event.key === 'Enter' && newTodo.trim() !== '') {
      const newTodoItem = createNewTodo();

      setIsNewTodoLoading(true);
      hideNotification();

      try {
        await handleAddTodo(newTodoItem);
        setNewTodo('');
      } catch (error) {
        showNotification('Failed to add todo. Please try again!');
      } finally {
        setIsNewTodoLoading(false);
      }
    }
  };

  const handleToggleAll = () => {
    dispatch({ type: ACTIONS.TOGGLE_ALL, payload: state.todos });
  };

  const toggleAllClass = classNames('todoapp__toggle-all', {
    active: state.todos.every(todo => todo.completed),
  });

  useEffect(() => {
    if (!isNewTodoLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.todos, isNewTodoLoading]);

  return (
    <header className="todoapp__header">
      <form onSubmit={e => e.preventDefault()}>
        <div className="todoapp__input-wrapper">
          {state.todos.length !== 0 && (
            <button
              type="button"
              className={toggleAllClass}
              data-cy="ToggleAllButton"
              onClick={handleToggleAll}
            />
          )}
          <input
            ref={inputRef}
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder={
              isError
                ? 'Something went wrong... we are sorry!'
                : 'What needs to be done?'
            }
            value={newTodo}
            onChange={handleChange}
            onKeyUp={handleAdd}
            disabled={isNewTodoLoading || isError}
          />
          {isNewTodoLoading && (
            <div className="todoapp__input-loader">
              <Loader />
            </div>
          )}
        </div>
      </form>

      {isError && (
        <div className="todoapp__error-wrapper">
          <p className="todoapp__error-message">
            Failed to load todos. Please try again later.
          </p>
        </div>
      )}

      {isLoading && !isError && (
        <div>
          <Loader />
        </div>
      )}
    </header>
  );
};

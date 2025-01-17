import React, { useEffect } from 'react';
import { Todo } from '../../types/Todo';
import { addTodo } from '../../api/todos';
import classNames from 'classnames';

interface HeaderProps {
  visibleTodos: Todo[];
  inputText: string;
  error: boolean;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setVisibleTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const Header: React.FC<HeaderProps> = ({
  visibleTodos,
  inputText,
  error,
  setInputText,
  setError,
  setErrorMessage,
  setVisibleTodos,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error, setError, setErrorMessage]);

  return (
    <header className="todoapp__header">
      {visibleTodos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: visibleTodos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form
        onSubmit={event => {
          event.preventDefault();
          addTodo(
            inputText,
            setError,
            setErrorMessage,
            setVisibleTodos,
            setInputText,
          );
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputText}
          onChange={event => setInputText(event.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};

/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { USER_ID, addTodos } from '../api/todos';
import { Todo } from '../types/Todo';
import { useTodosContext } from './useTodosContext';

export const Header: React.FC = () => {
  const { list, setList, setTempTodo, handleError, setLoadingTodosIds } =
    useTodosContext();
  const [title, setTitle] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const focusField = useRef<HTMLInputElement>(null);
  const allCompleted = useMemo(() => {
    return list.every((todo: Todo) => todo.completed);
  }, [list]);

  useEffect(() => {
    if (focusField.current) {
      focusField.current.focus();
    }
  }, []);

  const handleKeyPress = (event: React.FormEvent) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    if (!title.trim()) {
      handleError('Title should not be empty');
      setIsFormSubmitted(false);

      return;
    }

    const newTodo = {
      title: title.trim(),
      completed: false,
      userId: USER_ID,
    };

    const tempTodo0 = {
      id: 0,
      ...newTodo,
    };

    setTempTodo(tempTodo0);
    setLoadingTodosIds([tempTodo0.id]);

    addTodos(newTodo)
      .then(todoFromResponse => {
        setList(currentTodos => [...currentTodos, todoFromResponse]);
      })
      .catch(() => handleError('Unable to add a todo'))
      .finally(() => {
        setTitle('');
        setIsFormSubmitted(false);
        setTempTodo(null);
        setLoadingTodosIds([]);
      });
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTitle('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    handleError('');
  };

  const toggleAllTodos = useCallback(() => {
    const updatedList = list.map((todo: Todo) => ({
      ...todo,
      completed: !allCompleted,
    }));

    setList(updatedList);
  }, [list, allCompleted, setList]);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: allCompleted,
        })}
        data-cy="ToggleAllButton"
        onClick={toggleAllTodos}
        disabled={list.length === 0}
      />

      <form onSubmit={handleKeyPress}>
        <input
          type="text"
          data-cy="NewTodoField"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={focusField}
          value={title}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
          disabled={isFormSubmitted}
        />
      </form>
    </header>
  );
};

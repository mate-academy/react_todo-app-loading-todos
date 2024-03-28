/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { ErrorContext, TodosContext } from './TodoContext';
import { addTodos } from '../api/todos';
import { Todo } from '../types/Todo';

type Props = {};

export const Header: React.FC<Props> = () => {
  const { list, setList } = useContext(TodosContext);
  const { setErrorMessage } = useContext(ErrorContext);
  const [title, setTitle] = useState('');
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

    if (!title.trim()) {
      setErrorMessage('Title should not be empty');

      return;
    }

    addTodos({ title })
      .then(newTodo => {
        setList(currentTodos => [...currentTodos, newTodo]);
      })
      .catch(() => setErrorMessage('Unable to add a todo'))
      .finally(() => {
        setTitle('');
      });
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTitle('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorMessage('');
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
        />
      </form>
    </header>
  );
};

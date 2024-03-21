/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SetTodosContext, TodosContext } from '../TodosContext/TodosContext';
import { addTodos, editTodos } from '../../api/todos';
import { Todo } from '../../types/Todo';

type Props = {
  setError: (newError: string) => void;
};

export const Header: React.FC<Props> = ({ setError }) => {
  const todos = useContext(TodosContext);
  const setTodos = useContext(SetTodosContext);

  const [title, setTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title should not be empty');

      return;
    }

    addTodos({ title })
      .then(newTodo => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
      })
      .catch(() => setError('Unable to add a todo'))
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
  };

  const toggledAllCompleted = useMemo(() => {
    return !todos.some(todo => todo.completed === false);
  }, [todos]);

  const handleToggleAll = useCallback(() => {
    const updatedTodos = todos.map(todo => {
      if (todo.completed === !toggledAllCompleted) {
        return todo;
      }

      const updatedTodo: Todo = {
        ...todo,
        completed: !toggledAllCompleted,
      };

      editTodos(updatedTodo);

      return updatedTodo;
    });

    setTodos(updatedTodos);
  }, [todos, toggledAllCompleted, setTodos]);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        onClick={handleToggleAll}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          value={title}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

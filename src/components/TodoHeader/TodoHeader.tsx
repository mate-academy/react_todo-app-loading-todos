/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as todosService from '../../api/todos';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setErrorMessage: (error: string) => void,
  updateTodo: (updatedTodo: Todo) => void,
  setNewTodoId: React.Dispatch<React.SetStateAction<number[]>>
};

export const TodoHeader: React.FC<Props> = ({
  todos,
  setErrorMessage,
  setTodos,
  updateTodo,
  setNewTodoId,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [IsDisabledInput, setIsDisabledInput] = useState(false);
  const headerInputFocus = useRef<HTMLInputElement | null>(null);

  // Autofocus on main input
  useEffect(() => {
    if (headerInputFocus.current) {
      headerInputFocus.current.focus();
    }
  }, [todos]);

  // Submition the form to add new Todo
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue.trim()) {
      return;
    }

    const data = {
      title: inputValue,
      completed: false,
      userId: todosService.USER_ID,
    };

    setTodos(currentTodos => [...currentTodos, { ...data, id: 0 }]);
    setNewTodoId((currentTodos: number[]) => [...currentTodos, 0]);

    try {
      setErrorMessage('');
      setIsDisabledInput(true);
      const newTodo = await todosService.createTodo(data);

      setTodos(currentTodos => {
        currentTodos.pop();

        return [...currentTodos, newTodo];
      });
    } catch (error) {
      setErrorMessage('add');
      setTodos(currentTodos => {
        currentTodos.pop();

        return [...currentTodos];
      });
      throw error;
    } finally {
      setTimeout(() => setErrorMessage(''), 3000);
      setNewTodoId([]);
      setIsDisabledInput(false);
    }

    setInputValue('');
  };

  // Make all todos completed or uncompleted
  const completeAllTodos = async () => {
    let uncompletedTodos = [...todos].filter(todo => !todo.completed);

    if (uncompletedTodos.length < 1) {
      uncompletedTodos = [...todos].filter(todo => todo.completed);
    }

    const newTodos = await Promise.all(uncompletedTodos.map(todo => {
      return updateTodo({ ...todo, completed: !todo.completed });
    }));

    return newTodos;
  };

  // Activating the "Toggle All" button if all todos completed
  const allCompleted = useMemo(() => {
    return todos.every(todo => todo.completed);
  }, [todos]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          onClick={completeAllTodos}
          className={classNames(
            'todoapp__toggle-all',
            { active: allCompleted },
          )}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          id="todoInput"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={headerInputFocus}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          disabled={IsDisabledInput}
        />
      </form>
    </header>
  );
};

import cn from 'classnames';
import { useCallback, useContext, useMemo, useState } from 'react';
import { TodosContext, SetTodosContext } from './TodosContext';
import { Todo } from '../types';
import { USER_ID, addTodo, patchTodo } from '../api/todos';

type Props = {
  setErrorMessage: (newMessage: string) => void;
};

export const Header: React.FC<Props> = ({ setErrorMessage }) => {
  const [title, setTitle] = useState('');
  const todos = useContext(TodosContext);
  const setTodos = useContext(SetTodosContext);

  const toggledAllCompleted = useMemo(() => {
    return !todos.some(todo => todo.completed === false);
  }, [todos]);

  const handleToggleAllStatusClick = useCallback(() => {
    const updatedTodos = todos.map(todo => {
      if (todo.completed === !toggledAllCompleted) {
        return todo;
      }

      const updatedTodo: Todo = {
        ...todo,
        completed: !toggledAllCompleted,
      };

      patchTodo(updatedTodo);

      return updatedTodo;
    });

    setTodos(updatedTodos);
  }, [todos, toggledAllCompleted, setTodos]);

  const submitTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMessage('Title should not be empty');

      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id), 0);
    const todoToAdd: Todo = {
      id: maxId + 1,
      title,
      userId: USER_ID,
      completed: false,
    };

    addTodo(todoToAdd)
      .then(todo => {
        setTodos(prevTodos => prevTodos.concat(todo));
        setTitle('');
      })
      .catch(() => setErrorMessage('Unable to add todo'));
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length !== 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: toggledAllCompleted,
          })}
          data-cy="ToggleAllButton"
          aria-label="toggle All todos"
          onClick={handleToggleAllStatusClick}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={submitTodo}>
        <input
          data-cy="NewTodoField"
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

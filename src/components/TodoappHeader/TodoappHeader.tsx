import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { USER_ID, postTodo } from '../../api/todos';
import { errorNotification } from '../../utils/errorFunction';

interface TodoappHeaderProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
  setErrorNotification: (msg: string) => void;
}

export const TodoappHeader: React.FC<TodoappHeaderProps> = ({
  setTodos,
  todos,
  setErrorNotification,
}) => {
  const [newTodo, setNewTodo] = useState<string>('');
  const [activeTodo, setActiveTodo] = useState(false);

  useEffect(() => {
    const everyActive = todos.length > 0 && todos.every(todo => todo.completed);

    setActiveTodo(everyActive);
  }, [todos]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodo.trim() === '') {
      errorNotification('Title should not be empty', setErrorNotification);

      return;
    }

    const lastTodoId = Date.now();

    const newTodos = {
      userId: USER_ID,
      title: newTodo,
      completed: false,
    };

    setTodos([...todos, { ...newTodos, id: lastTodoId, isLoaded: false }]);
    setNewTodo('');
    try {
      const createdTodo = await postTodo(newTodos);

      setTimeout(() => {
        setTodos(prev =>
          prev.map(todo =>
            todo.id === lastTodoId ? { ...createdTodo, isLoaded: true } : todo,
          ),
        );
      }, 500);
    } catch (error) {
      errorNotification('Failed to add todo', setErrorNotification);
    }
  };

  const handleToggleAllActive = () => {
    const toggledCompleted = !activeTodo;

    setTodos(prev =>
      prev.map(todo => ({
        ...todo,
        isLoaded: false,
      })),
    );

    setTimeout(() => {
      setTodos(prev =>
        prev.map(todo => ({
          ...todo,
          completed: toggledCompleted,
          isLoaded: true,
        })),
      );
    }, 500);
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${activeTodo ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={handleToggleAllActive}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
      </form>
    </header>
  );
};

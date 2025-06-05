import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

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

  const getUserId = (todosList: Todo[]) => {
    if (todosList.length !== 0) {
      const usersId = todosList.map(todo => todo.userId);

      return Math.max(...usersId) + 1;
    }

    return 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodo.trim() !== '') {
      const lastTodo = Date.now();
      const newTodos: Todo = {
        id: lastTodo,
        userId: getUserId(todos),
        title: newTodo,
        completed: false,
        isLoaded: true,
      };

      setTodos([...todos, { ...newTodos, isLoaded: false }]);
      setNewTodo('');

      setTimeout(() => {
        setTodos(prev =>
          prev.map(todo =>
            todo.id === lastTodo ? { ...todo, isLoaded: true } : todo,
          ),
        );
      }, 500);
    } else {
      setErrorNotification('Title should not be empty');

      setTimeout(() => {
        setErrorNotification('');
      }, 500);
    }
  };

  useEffect(() => {
    const everyActive = todos.length > 0 && todos.every(todo => todo.completed);

    setActiveTodo(everyActive);
  }, [todos]);

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

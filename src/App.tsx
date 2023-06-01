import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import {
  TodoNotification,
} from './components/TodoNotification/TodoNotification';

const USER_ID = 10594;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [remainingTodos, setRemainingTodos] = useState(0);
  const [areAllTodosCompleted, setAreAllTodosCompleted] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const handleCompletedTodosChange = (isChecked: boolean, id: number) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: isChecked };
      }

      return todo;
    }));

    if (isChecked) {
      setRemainingTodos(remainingTodos - 1);
    } else {
      setRemainingTodos(remainingTodos + 1);
    }
  };

  const handleToggleAllTodos = () => {
    const newTodos = todos.map(todo => (
      { ...todo, completed: !areAllTodosCompleted }
    ));

    setTodos(newTodos);
    setAreAllTodosCompleted(!areAllTodosCompleted);
    setRemainingTodos(newTodos.filter(todo => !todo.completed).length);
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId: USER_ID,
    };

    setTodos([...todos, newTodo]);
    setRemainingTodos(remainingTodos + 1);
  };

  const handleRemoveTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setRemainingTodos(remainingTodos - 1);
  };

  const handleDismissNotification = () => {
    setErrorMessage('');
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'all':
        return true;
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await getTodos(USER_ID);

        setTodos(loadedTodos);
        setRemainingTodos(loadedTodos.filter(todo => !todo.completed).length);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      }
    };

    loadTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <TodoHeader
          onToggleAll={handleToggleAllTodos}
          active={areAllTodosCompleted}
          onAddTodo={handleAddTodo}
        />

        <TodoList
          todos={filteredTodos}
          onChange={handleCompletedTodosChange}
          onRemove={handleRemoveTodo}
        />

        <TodoFooter
          remainingTodos={remainingTodos}
          filter={filter}
          setFilter={setFilter}
          hasCompletedTodos={todos.some(todo => todo.completed)}
          onClearCompleted={handleClearCompleted}
        />

        {errorMessage && (
          <TodoNotification
            message={errorMessage}
            onDismiss={handleDismissNotification}
          />
        )}

      </div>
    </div>
  );
};

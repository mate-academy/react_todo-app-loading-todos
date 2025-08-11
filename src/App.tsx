/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todoService from './api/todos';
import { TodoHeader } from './components/TodoHeader.tsx';
import { TodoList } from './components/TodoList.tsx';
import { TodoFooter } from './components/TodoFooter.tsx';
import { ErrorNotification } from './components/ErrorNotification.tsx';
import { Todo } from './types/Todo.ts';
import { ErrorType } from './types/ErrorType.ts';
import { Filter } from './types/Filter.ts';

export function getFilteredTodos(
  currentTodos: Todo[],
  currentFilter: Filter,
): Todo[] {
  switch (currentFilter) {
    case Filter.Active:
      return currentTodos.filter(todo => !todo.completed);
    case Filter.Completed:
      return currentTodos.filter(todo => todo.completed);
    // case Filter.All:
    default:
      return currentTodos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType | ''>('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    todoService
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleAddTodo = async (title: string) => {
    if (!title.trim()) {
      setError('Title should not be empty');

      return;
    }

    setError('');

    try {
      setDisabled(true);
      const newTodo = await todoService.addTodo(title.trim());

      setTodos(currentTodos => [...currentTodos, newTodo]);
    } catch {
      setError('Unable to add a todo');
    } finally {
      setDisabled(false);
    }
  };

  const toggleTodo = async (todo: Todo) => {
    try {
      const updatedTodo = await todoService.updateCompleted(
        todo.id,
        !todo.completed,
      );

      setTodos(currentTodos =>
        currentTodos.map(t => (t.id === todo.id ? updatedTodo : t)),
      );
    } catch {
      setError('Unable to update a todo');
    }
  };

  const deleteTodo = async (todoId: number) => {
    try {
      await todoService.deleteTodo(todoId);
      setTodos(prevTodos => prevTodos.filter(t => t.id !== todoId));
    } catch {
      setError('Unable to delete a todo');
    }
  };

  const onClearCompleted = async () => {
    try {
      const completedTodos = getFilteredTodos(todos, Filter.Completed);

      await Promise.all(
        completedTodos.map(todo => todoService.deleteTodo(todo.id)),
      );

      setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
    } catch {
      setError('Unable to delete a todo');
    }
  };

  if (!todoService.USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = getFilteredTodos(todos, filter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader onAdd={handleAddTodo} todos={todos} disabled={disabled} />
        <TodoList
          todos={visibleTodos}
          toggleTodo={toggleTodo}
          isLoading={isLoading}
          deleteTodo={deleteTodo}
        />
        {todos.length !== 0 && (
          <TodoFooter
            todos={todos}
            currentFilter={filter}
            onFilterChange={setFilter}
            onClearCompleted={onClearCompleted}
          />
        )}
      </div>

      <ErrorNotification errorMessage={error} onClose={() => setError('')} />
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoFilter } from './types/Filters';
import { UserWarning } from './components/UserWarning/UserWarning';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorNotification } from './components/Error/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<TodoFilter>(TodoFilter.All);

  useEffect(() => {
    setIsLoading(true);
    setError('');

    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'))
      .finally(() => setIsLoading(false));
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) {
      inputRef.current?.focus();

      const timer = setTimeout(() => setError(''), 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const getNextId = (todosArr: Todo[]): number => {
    return todosArr.length === 0
      ? 1
      : Math.max(...todosArr.map(todo => todo.id)) + 1;
  };

  const addTodo = (title: string) => {
    const trimmed = title.trim();

    if (!trimmed) {
      return;
    }

    const newTodo: Todo = {
      id: getNextId(todos),
      title: trimmed,
      completed: false,
      userId: USER_ID,
    };

    setTodos([...todos, newTodo]);
    setNewTodoTitle('');
    inputRef.current?.focus();
  };

  const deleteTodo = (todoId: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== todoId));
  };

  const toggleTodoStatus = (todoId: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const toggleAllTodos = () => {
    const shouldBeCompleted = !todos.every(todo => todo.completed);

    setTodos(prev =>
      prev.map(todo => ({
        ...todo,
        completed: shouldBeCompleted,
      })),
    );
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case TodoFilter.Active:
        return !todo.completed;
      case TodoFilter.Completed:
        return todo.completed;
      case TodoFilter.All:
      default:
        return true;
    }
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoTitle={newTodoTitle}
          onTitleChange={setNewTodoTitle}
          onAddTodo={addTodo}
          inputRef={inputRef}
          onToggleAll={toggleAllTodos}
          allCompleted={todos.length > 0 && todos.every(todo => todo.completed)}
          isDisabled={isLoading}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodoStatus}
              onDelete={deleteTodo}
            />

            <Footer
              activeTodosCount={activeTodosCount}
              hasCompletedTodos={hasCompletedTodos}
              clearCompleted={clearCompleted}
              filter={filter}
              setFilter={setFilter}
            />
          </>
        )}
      </div>

      <ErrorNotification message={error} onClose={() => setError('')} />

      {isLoading && <div className="loader" data-cy="LoadingIndicator" />}
    </div>
  );
};

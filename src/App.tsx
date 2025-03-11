import React, { useEffect, useState, useRef } from 'react';
import { UserWarning } from './UserWarning';
import { getPreparedTodos } from './utils/TodoFilter';
import * as todoService from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { TodoForm } from './component/TodoForm';
import { TodoList } from './component/TodoList';
import { Footer } from './component/Footer';
import { Notification } from './component/Notification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<Set<number>>(new Set());
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filterBy, setFilterBy] = useState(Filter.All);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const preparedTodos = getPreparedTodos(todos, filterBy);
  const completedTodos = todos.filter(todo => todo.completed);
  const todoCount = todos.length - completedTodos.length;

  const loadTodos = () => {
    setErrorMessage('');
    todoService
      .getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  };

  useEffect(() => {
    loadTodos();
    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const onAddTodo = async (todoTitle: string) => {
    setTempTodo({
      id: 0,
      title: todoTitle,
      completed: false,
      userId: todoService.USER_ID,
    });

    try {
      const newTodo = await todoService.createTodos({
        title: todoTitle,
        completed: false,
      });

      setTodos(prev => [...prev, newTodo]);
    } catch (error) {
      setErrorMessage('Unable to add a todo');
      inputRef?.current?.focus();
    } finally {
      setTempTodo(null);
    }
  };

  const onRemoveTodo = async (id: number) => {
    setLoading(prev => new Set(prev.add(id)));
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      setErrorMessage('Unable to delete a todo');
    } finally {
      setLoading(prev => {
        const newLoading = new Set(prev);

        newLoading.delete(id);

        return newLoading;
      });
    }
  };

  if (!todoService) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          <TodoForm
            todos={todos}
            setErrorMessage={setErrorMessage}
            onAddTodo={onAddTodo}
            inputRef={inputRef}
            todosLength={todos.length}
            isTitleDisabled={!!tempTodo}
          />
        </header>

        <TodoList
          preparedTodos={preparedTodos}
          errorMessage={errorMessage}
          loading={loading}
          onRemoveTodo={onRemoveTodo}
        />

        {!errorMessage && (
          <Footer
            todos={todos}
            errorMessage={errorMessage}
            setFilterBy={setFilterBy}
            filterBy={filterBy}
            todoCount={todoCount}
          />
        )}
      </div>
      <Notification
        errorMessage={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};

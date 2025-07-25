import { useEffect, useState, useRef } from 'react';
import { Todo } from './types/Todo';
import * as todoService from './api/todos';
import Loader from './components/Loader/Loader';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Error from './components/Error/Error';
import TodoList from './components/TodoList/TodoList';
import { FilterTypes } from './types/FilterTypes';
import Filters from './constants/Filter';
import { ErrorMessage } from './constants/ErrorMessage';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingTodoIds, setLoadingTodoIds] = useState<number[]>([]);
  const [error, setError] = useState<ErrorMessage>(ErrorMessage.EMPTY);
  const [filter, setFilter] = useState<FilterTypes>(Filters[0].value);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showError = (message: ErrorMessage) => {
    setError(message);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setError(ErrorMessage.EMPTY);
      timeoutRef.current = null;
    }, 3000);
  };

  const clearError = () => {
    setError(ErrorMessage.EMPTY);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      try {
        const todosFromServer = await todoService.getTodos();

        setTodos(todosFromServer);
      } catch {
        showError(ErrorMessage.LOAD);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAddTodo = async (title: string) => {
    const trimmed = title.trim();

    if (!trimmed) {
      showError(ErrorMessage.EMPTY_TITLE);

      return false;
    }

    setLoading(true);
    try {
      const newTodo = await todoService.addTodo({
        title: trimmed,
        completed: false,
      });

      setTodos(prev => [...prev, newTodo]);

      return true;
    } catch {
      showError(ErrorMessage.ADD);

      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAll = async () => {
    const allCompleted = todos.every(todo => todo.completed);

    setLoading(true);
    try {
      const updatedTodos = await Promise.all(
        todos.map(todo =>
          todoService.updateTodo(todo.id, {
            ...todo,
            completed: !allCompleted,
          }),
        ),
      );

      setTodos(updatedTodos);
    } catch {
      showError(ErrorMessage.UPDATE);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id: number) => {
    setLoadingTodoIds(prev => [...prev, id]);
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);

      if (!todoToUpdate) {
        return;
      }

      const updatedTodo = {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      };
      const newTodo = await todoService.updateTodo(id, updatedTodo);

      setTodos(current =>
        current.map(todo => (todo.id === id ? newTodo : todo)),
      );
    } catch {
      showError(ErrorMessage.UPDATE);
    } finally {
      setLoadingTodoIds(prev => prev.filter(todoId => todoId !== id));
    }
  };

  const handleDelete = async (id: number) => {
    setLoadingTodoIds(prev => [...prev, id]);
    try {
      await todoService.deleteTodo(id);
      setTodos(current => current.filter(todo => todo.id !== id));
    } catch {
      showError(ErrorMessage.DELETE);
    } finally {
      setLoadingTodoIds(prev => prev.filter(todoId => todoId !== id));
    }
  };

  const handleUpdate = async (id: number, newTitle: string) => {
    setLoadingTodoIds(prev => [...prev, id]);
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);

      if (!todoToUpdate) {
        return;
      }

      const updatedTodo = { ...todoToUpdate, title: newTitle };
      const newTodo = await todoService.updateTodo(id, updatedTodo);

      setTodos(current =>
        current.map(todo => (todo.id === id ? newTodo : todo)),
      );
    } catch {
      showError(ErrorMessage.UPDATE);
    } finally {
      setLoadingTodoIds(prev => prev.filter(todoId => todoId !== id));
    }
  };

  const handleClearCompleted = async () => {
    setLoading(true);
    try {
      const completedTodos = todos.filter(todo => todo.completed);

      await Promise.all(
        completedTodos.map(todo => todoService.deleteTodo(todo.id)),
      );
      setTodos(todos.filter(todo => !todo.completed));
    } catch {
      showError(ErrorMessage.UPDATE);
    } finally {
      setLoading(false);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === '') {
      return true;
    }

    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const activeTodos = todos.filter(todo => !todo.completed).length;
  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          onAddTodo={handleAddTodo}
          allCompleted={allCompleted}
          onToggleAll={handleToggleAll}
        />

        {loading ? (
          <Loader />
        ) : (
          <>
            <TodoList
              todos={filteredTodos}
              loadingTodoIds={loadingTodoIds}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />

            {todos.length > 0 && (
              <Footer
                todos={todos}
                activeTodos={activeTodos}
                filter={filter}
                setFilterBy={setFilter}
                onClearCompleted={handleClearCompleted}
              />
            )}
          </>
        )}
      </div>

      <Error errorMessage={error} hideError={clearError} />
    </div>
  );
};

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { FilterType, ErrorMessages } from './types/enums';
import { Header } from './component/Header/Header';
import { TodoList } from './component/TodoList/TodoList';
import { Footer } from './component/Footer/Footer';
import { ErrorNotification } from './component/Error/Error';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // Використовуємо Enum для стейту
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [title, setTitle] = useState('');
  const [tempTodos, setTempTodos] = useState<number[]>([]);

  // Хелпер для показу помилок з таймером
  const showError = (msg: ErrorMessages) => {
    setError(msg);
    setTimeout(() => setError(null), 3000);
  };

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => showError(ErrorMessages.Load))
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case FilterType.Active:
          return !todo.completed;
        case FilterType.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [todos, filter]);

  const toggleAll = () => {
    const activeTodos = todos.filter(todo => !todo.completed);
    const shouldBeCompleted = activeTodos.length > 0;
    const todosToUpdate = todos.filter(
      todo => todo.completed !== shouldBeCompleted,
    );

    if (todosToUpdate.length === 0) {
      return;
    }

    setLoading(true);
    const promises = todosToUpdate.map(todo =>
      updateTodo({ ...todo, completed: shouldBeCompleted }),
    );

    Promise.all(promises)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.map(todo =>
            todo.completed !== shouldBeCompleted
              ? { ...todo, completed: shouldBeCompleted }
              : todo,
          ),
        );
      })
      .catch(() => showError(ErrorMessages.Update))
      .finally(() => setLoading(false));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      showError(ErrorMessages.EmptyTitle);

      return;
    }

    setLoading(true);
    createTodo({
      userId: USER_ID,
      title: title.trim(),
      completed: false,
    })
      .then(newTodo => {
        setTodos([...todos, newTodo]);
        setTitle('');
      })
      .catch(() => showError(ErrorMessages.Add))
      .finally(() => setLoading(false));
  };

  const handleUpdate = (todo: Todo) => {
    setTempTodos(prev => [...prev, todo.id]);
    updateTodo({ ...todo, completed: !todo.completed })
      .then(updatedTodo => {
        setTodos(currentTodos =>
          currentTodos.map(t => (t.id === todo.id ? updatedTodo : t)),
        );
      })
      .catch(() => showError(ErrorMessages.Update))
      .finally(() => setTempTodos(prev => prev.filter(id => id !== todo.id)));
  };

  const handleDelete = (todoId: number) => {
    setTempTodos(prev => [...prev, todoId]);
    deleteTodo(todoId)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.id !== todoId),
        );
      })
      .catch(() => showError(ErrorMessages.Delete))
      .finally(() => setTempTodos(prev => prev.filter(id => id !== todoId)));
  };

  const clearCompleted = () => {
    const idsToDelete = todos.filter(t => t.completed).map(t => t.id);

    if (idsToDelete.length === 0) {
      return;
    }

    setTempTodos(prev => [...prev, ...idsToDelete]);
    Promise.all(idsToDelete.map(id => deleteTodo(id)))
      .then(() => {
        setTodos(currentTodos => currentTodos.filter(t => !t.completed));
      })
      .catch(() => showError(ErrorMessages.Delete))
      .finally(() => {
        setTempTodos(prev => prev.filter(id => !idsToDelete.includes(id)));
      });
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          title={title}
          setTitle={setTitle}
          loading={loading}
          onAdd={handleSubmit}
          onToggleAll={toggleAll}
        />

        <TodoList
          todos={visibleTodos}
          tempTodos={tempTodos}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />

        <Footer
          todos={todos}
          filter={filter}
          setFilter={setFilter}
          onClearCompleted={clearCompleted}
        />
      </div>

      <ErrorNotification error={error} onClose={() => setError(null)} />
    </div>
  );
};

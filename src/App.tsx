/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  createTodo,
  getTodos,
  removeTodoApi,
  updateTodoApi,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';
import { ErrorMessage } from './types/ErrorMessage';
import { Status } from './types/Status';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [filter, setFilter] = useState<Status>(Status.All);
  const [query, setQuery] = useState('');
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [deletingIds, setDeletingIds] = useState<number[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const todoFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    todoFieldRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!tempTodo) {
      todoFieldRef.current?.focus();
    }
  }, [tempTodo]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessage.Load);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      })
      .finally(() => {});
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = todos.filter(todo => {
    if (filter === Status.Active) {
      return !todo.completed;
    }

    if (filter === Status.Completed) {
      return todo.completed;
    }

    return true;
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setErrorMessage(ErrorMessage.Title);

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      return;
    }

    setTempTodo({
      id: 0,
      title: trimmedQuery,
      completed: false,
      userId: USER_ID,
    });

    createTodo({ title: trimmedQuery, userId: USER_ID, completed: false })
      .then(todoFromServer => {
        setTodos(prev => [...prev, todoFromServer]);
        setQuery('');
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.Add);

        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      })
      .finally(() => {
        setTempTodo(null);
      });
  };

  const deleteTodo = (todoId: number) => {
    setErrorMessage(null);
    setDeletingIds(prev => [...prev, todoId]);

    return removeTodoApi(todoId)
      .then(() => {
        setTodos(prev => prev.filter(t => t.id !== todoId));
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.Delete);

        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      })
      .finally(() => {
        setDeletingIds(prev => prev.filter(id => id !== todoId));

        setTimeout(() => {
          todoFieldRef.current?.focus();
        }, 0);
      });
  };

  const toggleTodo = (todo: Todo) => {
    setDeletingIds(prev => [...prev, todo.id]);

    return updateTodoApi(todo.id, { completed: !todo.completed })
      .then(updateTodo => {
        setTodos(prev => prev.map(t => (t.id === todo.id ? updateTodo : t)));
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.Update);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      })
      .finally(() => {
        setDeletingIds(prev => prev.filter(id => id !== todo.id));
      });
  };

  const clearCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);
    const promises = completedTodos.map(todo => deleteTodo(todo.id));

    Promise.all(promises).catch(() => {
      setErrorMessage(ErrorMessage.Delete);
    });
  };

  const toggleAll = () => {
    const areAllCompleted = todos.every(todo => todo.completed);

    const todosToUpdate = areAllCompleted
      ? todos
      : todos.filter(todo => !todo.completed);

    const promises = todosToUpdate.map(todo => toggleTodo(todo));

    Promise.all(promises).catch(() => {
      setErrorMessage(ErrorMessage.Update);
    });
  };

  const updateTitle = (event: React.FormEvent) => {
    event.preventDefault();

    if (!editingTodo) {
      return;
    }

    const trimmedTitle = newTitle.trim();

    if (trimmedTitle === editingTodo.title) {
      setEditingTodo(null);

      return;
    }

    if (!trimmedTitle) {
      deleteTodo(editingTodo.id);

      return;
    }

    setDeletingIds(prev => [...prev, editingTodo.id]);

    updateTodoApi(editingTodo.id, { title: trimmedTitle })
      .then(updatedTodo => {
        setTodos(prev =>
          prev.map(t => (t.id === updatedTodo.id ? updatedTodo : t)),
        );
        setEditingTodo(null);
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.Update);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      })
      .finally(() => {
        setDeletingIds(prev => prev.filter(id => id !== editingTodo.id));
      });
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setEditingTodo(null);
    }
  };

  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo);
    setNewTitle(todo.title);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          query={query}
          setQuery={setQuery}
          handleSubmit={handleSubmit}
          toggleAll={toggleAll}
          tempTodo={tempTodo}
          todoFieldRef={todoFieldRef}
        />

        {(todos.length > 0 || tempTodo) && (
          <TodoList
            visibleTodos={visibleTodos}
            tempTodo={tempTodo}
            deletingIds={deletingIds}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editingTodo={editingTodo}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            updateTitle={updateTitle}
            handleKeyUp={handleKeyUp}
            handleEditClick={handleEditClick}
          />
        )}

        {/* Hide the footer if there are no todos */}

        {todos.length > 0 && (
          <Footer
            todos={todos}
            filter={filter}
            setFilter={setFilter}
            clearCompleted={clearCompleted}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

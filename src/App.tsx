import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorNotification } from './components/ErrorNote/ErrorNote';

export enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

function getVisibleTodos(todos: Todo[], status: Status) {
  const copyTodos = [...todos];

  if (status === Status.Active) {
    return copyTodos.filter(todo => !todo.completed);
  }

  if (status === Status.Completed) {
    return copyTodos.filter(todo => todo.completed);
  }

  return copyTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusTodo, setStatusTodo] = useState<Status>(Status.All);
  const [textField, setTextField] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [loadingTodosId, setLoadingTodosId] = useState<Set<number>>(new Set());
  const [isUpdateError, setIsUpdateError] = useState(false);

  const field = useRef<HTMLInputElement>(null);
  const todosLength = todos.length;
  const completedTodosId = todos
    .filter(todo => todo.completed)
    .map(el => el.id);
  const visibleTodos = getVisibleTodos(todos, statusTodo);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  useEffect(() => {
    field.current?.focus();
  }, [isSubmitting]);

  useEffect(() => {
    window.setTimeout(() => setErrorMessage(''), 3000);
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextField(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!textField.trim()) {
      setErrorMessage('Title should not be empty');
      return;
    }

    const newTodo: Omit<Todo, 'id'> = {
      userId: USER_ID,
      title: textField.trim(),
      completed: false,
    };

    setIsSubmitting(true);
    setTempTodo({
      id: 0,
      userId: USER_ID,
      title: textField.trim(),
      completed: false,
    });

    addTodo(newTodo)
      .then(todo => {
        setTodos(currentTodos => [...currentTodos, todo]);
        setTextField('');
      })
      .catch(() => {
        setErrorMessage('Unable to add a todo');
      })
      .finally(() => {
        setIsSubmitting(false);
        setTempTodo(null);
      });
  };

  const handleDelete = (todoId: number) => {
    setLoadingTodosId(prev => new Set(prev).add(todoId));
    setIsSubmitting(true);
    deleteTodo(todoId)
      .then(() =>
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.id !== todoId),
        ),
      )
      .catch(() => {
        setTodos(todos);
        setErrorMessage('Unable to delete a todo');
      })
      .finally(() => {
        setIsSubmitting(false);
        setLoadingTodosId(prev => {
          const updatedSet = new Set(prev);
          updatedSet.delete(todoId);
          return updatedSet;
        });
      });
  };

  const handleDeleteCompleted = () => {
    Promise.allSettled(completedTodosId.map(todoId => handleDelete(todoId)));
  };

  const handleStatusChange = (updatedTodo: Todo) => {
    setLoadingTodosId(prev => new Set(prev).add(updatedTodo.id));

    return updateTodo({ ...updatedTodo, completed: !updatedTodo.completed })
      .then(() => {
        setTodos(currentTodos => {
          return currentTodos.map(todo =>
            todo.id === updatedTodo.id
              ? { ...todo, completed: !updatedTodo.completed }
              : todo,
          );
        });
      })
      .catch(() => {
        setErrorMessage('Unable to update a todo');
      })
      .finally(() => {
        setLoadingTodosId(prev => {
          const updatedSet = new Set(prev);
          updatedSet.delete(updatedTodo.id);
          return updatedSet;
        });
      });
  };

  const handleToggleAll = () => {
    const todosToToggle =
      completedTodosId.length === todos.length
        ? todos
        : todos.filter(todo => !todo.completed);

    Promise.allSettled(todosToToggle.map(todo => handleStatusChange(todo)));
  };

  const handleEditTodo = (updatedTodo: Todo) => {
    setLoadingTodosId(prev => new Set(prev).add(updatedTodo.id));

    return updateTodo(updatedTodo)
      .then(() => {
        setTodos(currentTodos => {
          return currentTodos.map(todo =>
            todo.id === updatedTodo.id ? updatedTodo : todo,
          );
        });
        setIsUpdateError(false);
      })
      .catch(() => {
        setIsUpdateError(true);
        setErrorMessage('Unable to update a todo');
      })
      .finally(() => {
        setLoadingTodosId(prev => {
          const updatedSet = new Set(prev);
          updatedSet.delete(updatedTodo.id);
          return updatedSet;
        });
      });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          textField={textField}
          onTextField={handleTextField}
          onSubmit={handleSubmit}
          isSubmiting={isSubmitting}
          field={field}
          onToggleAll={handleToggleAll}
          isToggleActive={completedTodosId.length !== 0}
          isToggleVisible={!!todosLength}
        />

        <TodoList
          visibleTodos={visibleTodos}
          onDelete={handleDelete}
          isLoading={Array.from(loadingTodosId)}
          tempTodo={tempTodo}
          onStatusChange={handleStatusChange}
          onEdit={handleEditTodo}
          isUpdateError={isUpdateError}
        />

        {!!todosLength && (
          <Footer
            statusTodo={statusTodo}
            todosLength={todosLength}
            completedTodosLength={completedTodosId.length}
            onStatus={setStatusTodo}
            onDeleteCompleted={handleDeleteCompleted}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onError={setErrorMessage}
      />
    </div>
  );
};

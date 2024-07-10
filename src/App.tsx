/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  createTodo,
  deleteTodo,
  getTodos,
  patchTodo,
} from './api/todos';
import { List } from './components/List';
import { Error as ErrorMessage } from './components/Error';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState(Filter.All);
  const [tempTodoTitle, setTempTodoTitle] = useState<string | null>('');
  const ref = useRef<HTMLInputElement | null>(null);

  const handleAddTodo = async (title: string) => {
    if (!title.trim()) {
      setErrorMessage('Todo title cannot be empty');
      return;
    }

    const newTodo = {
      title,
      completed: false,
      userId: USER_ID,
    };

    try {
      setTempTodoTitle(title); // Show the temporary todo

      const createdTodo = await createTodo(newTodo);

      setTodos(currentTodos => [...currentTodos, createdTodo]);
    } catch {
      setErrorMessage('Unable to add todo');
      throw new Error('Unable to add todo');
    } finally {
      setTempTodoTitle(null);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);

      setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
    } catch {
      setErrorMessage('Unable to delete todo');
    }
  };

  const handleEditTodo = async (id: number, data: Partial<Todo>) => {
    try {
      const editedTodo = await patchTodo(id, data);

      setTodos(currentTodos =>
        currentTodos.map(todo => {
          if (todo.id === id) {
            return editedTodo;
          }

          return todo;
        }),
      );
    } catch {
      setErrorMessage('Unable to edit todo');
    }
  };

  const clearCompletedTodos = async () => {
    const filteredTodos = todos.filter(todo => todo.completed);

    try {
      const deleteCallback = async (todo: Todo) => {
        try {
          await deleteTodo(todo.id);

          return { id: todo.id, status: 'resolved' };
        } catch {
          setErrorMessage(`Unable to clear completed todo with id ${todo.id}`);
          return { id: todo.id, status: 'rejected' };
        }
      };

      // filters by resolved & filter currentTodos
      const responses = await Promise.allSettled(
        filteredTodos.map(deleteCallback),
      );

      setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
    } catch {
      setErrorMessage('Unable to clear completed todos');
    }
  };

  const filterTodos = useMemo(() => {
    let filteredTodos = todos;

    switch (filter) {
      case Filter.Active:
        filteredTodos = todos.filter(todo => !todo.completed);
        break;
      case Filter.Completed:
        filteredTodos = todos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    return filteredTodos;
  }, [todos, filter]);

  const activeTodosCount = useMemo(() => {
    return todos.filter(({ completed }) => !completed).length;
  }, [todos]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  useEffect(() => {
    ref.current?.focus();
  }, [todos.length, tempTodoTitle]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header onAdd={handleAddTodo} inputRef={ref} />

        <List
          todos={filterTodos}
          tempTodoTitle={tempTodoTitle}
          onDelete={handleDeleteTodo}
          onEdit={handleEditTodo}
        />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            onFilter={setFilter}
            onClear={clearCompletedTodos}
            activeTodosCount={activeTodosCount}
            selectedFilter={filter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorMessage
        message={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};

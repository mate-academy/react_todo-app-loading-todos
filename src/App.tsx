/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { createTodo, deleteTodo, updateTodo, USER_ID } from './api/todos';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import Header from './Components/Header';
import { FilterType, FILTER_TYPES } from './types/FilterType';
import Footer from './Components/Footer';
import TodoList from './Components/TodoList';

interface OnDblClickParams {
  index: number;
  todo: Todo;
}

export const App: React.FC = () => {
  const [todosDb, setTodosDb] = useState<Todo[]>([]);
  const [todosToShow, setTodosToShow] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingTodoId, setLoadingTodoId] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(
    FILTER_TYPES.ALL as FilterType,
  );
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  useEffect(() => {
    setTodosToShow(
      todosDb.filter(todo => {
        switch (selectedFilter) {
          case FILTER_TYPES.ALL:
            return true;
          case FILTER_TYPES.ACTIVE:
            return !todo.completed;
          case FILTER_TYPES.COMPLETED:
            return todo.completed;
          default:
            return todo.completed;
        }
      }),
    );
  }, [todosDb, selectedFilter]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setTodosDb(await getTodos());
      } catch (err) {
        setError('Unable to load todos');
      } finally {
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const deleteTodoFunc = async (id: number) => {
    setLoadingTodoId(id);
    setError(null);
    try {
      await deleteTodo(id);
      setTodosDb(todosDb.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Unable to delete a todo');
    } finally {
      setLoadingTodoId(null);
    }
  };

  const completeTodo = async (id: number, completed: boolean) => {
    setLoadingTodoId(id);
    setError(null);
    try {
      await updateTodo(id, { completed });
      setTodosDb(
        todosDb.map(todo => {
          if (todo.id === id) {
            return { ...todo, completed };
          }

          return todo;
        }),
      );
    } catch (err) {
      setError('Unable to update a todo');
    } finally {
      setLoadingTodoId(null);
    }
  };

  const updateTodoFunc = async (
    id: number,
    title: string,
    e?: React.FormEvent<HTMLFormElement>,
  ) => {
    e?.preventDefault();
    setLoadingTodoId(id);
    setError(null);
    try {
      await updateTodo(id, { title });
      setTodosDb(
        todosDb.map(todo => {
          if (todo.id === id) {
            return { ...todo, title };
          }

          return todo;
        }),
      );
    } catch (err) {
      setError('Unable to update a todo');
    } finally {
      setLoadingTodoId(null);
    }

    setEditValue('');
    setEditIndex(null);
  };

  const addTodo = async (
    e: React.FormEvent<HTMLFormElement>,
    title: string,
  ) => {
    e.preventDefault();
    setError(null);
    try {
      const todo = await createTodo(title);

      setTodosDb([...todosDb, todo]);
      setNewTodoTitle('');
    } catch (err) {
      setError('Unable to add a todo');
    } finally {
    }
  };

  const onDblClick = ({ index, todo }: OnDblClickParams) => {
    setEditIndex(index);
    setEditValue(todo.title);
  };

  const clearCompleted = () => {
    setError(null);
    try {
      const completedTodos = todosDb.filter(todo => todo.completed);
      const promises = completedTodos.map(todo => deleteTodo(todo.id));

      Promise.all(promises).then(() => {
        setTodosDb(todosDb.filter(todo => !todo.completed));
      });
    } catch (err) {
      setError('Unable to delete a todo');
    } finally {
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todosDb={todosDb}
          newTodoTitle={newTodoTitle}
          setNewTodoTitle={setNewTodoTitle}
          addTodo={addTodo}
        />

        <TodoList
          todosToShow={todosToShow}
          editIndex={editIndex}
          editValue={editValue}
          setEditValue={setEditValue}
          onDblClick={onDblClick}
          updateTodo={updateTodoFunc}
          deleteTodo={deleteTodoFunc}
          completeTodo={completeTodo}
          loadingTodoId={loadingTodoId}
        />

        {todosDb.length > 0 && (
          <Footer
            todosDb={todosDb}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            clearCompleted={clearCompleted}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(null)}
        />
        {error}
      </div>
    </div>
  );
};

import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  addTodo,
  changeTodo,
  deleteTodo,
  getTodos,
  USER_ID,
} from './api/todos';
import { AddForm } from './components/AddForm/AddForm';
import { ErrComponent } from './components/ErrComponent/ErrComponent';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { FilterStatus } from './types/Filter';
import { NewTodo, Todo, TodoId } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [skeletonTodo, setSkeletonTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loadingTodoId, setLoadingTodoId] = useState<TodoId | null>(null);
  const [editingId, setEditingId] = useState<TodoId | null>(null);
  const [filter, setFilter] = useState<FilterStatus>('all');

  useEffect(() => {
    const loadTodos = async () => {
      if (!USER_ID) {
        return;
      }

      setIsLoading(true);
      setErrorMessage('');

      try {
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);
      } catch (error) {
        setErrorMessage('Unable to load todos');
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const onSubmitTodo = async (title: string): Promise<boolean> => {
    if (isLoading) {
      return false;
    }

    setIsLoading(true);
    setErrorMessage('');

    const newTodo: NewTodo = {
      title,
      completed: false,
      userId: USER_ID,
    };

    setSkeletonTodo({ ...newTodo, id: 0 });

    try {
      const createdTodo = await addTodo(newTodo);

      setTodos(currentTodos => [createdTodo, ...currentTodos]);

      return true;
    } catch (error) {
      setErrorMessage('Unable to add a todo');

      return false;
    } finally {
      setSkeletonTodo(null);
      setIsLoading(false);
    }
  };

  const onDeleteTodo = async (todoId: TodoId): Promise<boolean> => {
    if (loadingTodoId === todoId) {
      return false;
    }

    setLoadingTodoId(todoId);
    setErrorMessage('');

    try {
      await deleteTodo(todoId);

      setTodos(current => current.filter(t => t.id !== todoId));

      return true;
    } catch (error) {
      setErrorMessage('Unable to delete a todo');

      return false;
    } finally {
      setLoadingTodoId(null);
    }
  };

  const onChangeTodo = async (newTodo: Todo): Promise<boolean> => {
    setLoadingTodoId(newTodo.id);
    setErrorMessage('');

    try {
      await changeTodo(newTodo);

      setTodos(currentTodos =>
        currentTodos.map(todo => (todo.id === newTodo.id ? newTodo : todo)),
      );

      return true;
    } catch (err) {
      setErrorMessage('Unable to update a todo');

      return false;
    } finally {
      setLoadingTodoId(null);
    }
  };

  const handleClearCompleted = async () => {
    const completedTodos = todos.filter(todo => todo.completed);

    if (!completedTodos.length) {
      return;
    }

    const previousTodos = [...todos];

    setTodos(current => current.filter(todo => !todo.completed));
    setErrorMessage('');

    try {
      await Promise.all(completedTodos.map(todo => deleteTodo(todo.id)));
    } catch (error) {
      setTodos(previousTodos);
      setErrorMessage('Unable to clear completed todos');
    }
  };

  const activeTodosCount = todos.filter(t => !t.completed).length;
  const isAllCompleted = todos.length > 0 && activeTodosCount === 0;

  const handleToggleAll = async () => {
    const targetStatus = !isAllCompleted;

    const todosToUpdate = todos.filter(todo => todo.completed !== targetStatus);

    if (todosToUpdate.length === 0) {
      return;
    }

    const previousTodos = [...todos];

    setTodos(current =>
      current.map(todo => ({ ...todo, completed: targetStatus })),
    );
    setErrorMessage('');

    try {
      await Promise.all(
        todosToUpdate.map(todo =>
          changeTodo({ ...todo, completed: targetStatus }),
        ),
      );
    } catch (error) {
      setTodos(previousTodos);
      setErrorMessage('Unable to toggle all todos');
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: isAllCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={handleToggleAll}
            />
          )}

          <AddForm
            onSubmit={onSubmitTodo}
            onError={setErrorMessage}
            disabled={isLoading}
          />
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList
            todos={visibleTodos}
            skeletonTodo={skeletonTodo}
            onDelete={onDeleteTodo}
            onChange={onChangeTodo}
            loadingTodoId={loadingTodoId}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        </section>

        {todos.length > 0 && (
          <Footer
            todos={todos}
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={handleClearCompleted}
          />
        )}
      </div>
      <ErrComponent
        errMessage={errorMessage}
        onClose={setErrorMessage}
        duration={1000}
      />
    </div>
  );
};

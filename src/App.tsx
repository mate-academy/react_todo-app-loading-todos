/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { deleteTodo, getTodos, USER_ID } from './api/todos';
import { TodoError } from './components/TodoError';
import { TodoFooter } from './components/TodoFooter';
import { TodoSection } from './components/TodoSection';
import { TodoHeader } from './components/TodoHeader';
import { Todo } from './types/Todo';
import { TodoModalEditing } from './components/TodoModalEdited';
import { client } from './utils/fetchClient';

interface AppProp {
  todoId: number;
}

export const App: React.FC<AppProp> = () => {
  //#region State//
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [queryTodo, setQueryTodo] = useState<string>('');
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [filter, setFilter] = useState<'active' | 'all' | 'completed'>('all');
  const [errorMessange, setErrorMessange] = useState<boolean>(false);
  //#endregion//

  //#region HandleTodo//

  const handleAddTodo = (title: string) => {
    if (!title.trim()) {
      setError('Title should not be empty');
      setErrorMessange(true);

      return;
    }

    client
      .post<Todo>('/todos', { title, completed: false, userId: USER_ID })
      .then(newTodo => {
        setTodos([...todos, newTodo]);
      })
      .catch(() => {
        setError('Unable to add a todo');
      });
  };

  const handleEditTodo = (updatedTodo: Todo) => {
    client
      .patch<Todo>(`/todos/${updatedTodo.id}`, updatedTodo)
      .then(() => {
        setTodos(
          todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)),
        );
      })
      .catch(() => {
        setErrorMessange(true);
        setError('Unable to update a todo');
      });
  };

  const handleDeleteTodo = (todoId: number) => {
    deleteTodo(todoId)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== todoId));
      })
      .catch(() => {
        setErrorMessange(true);
        setError('Unable to delete a todo');
      });
  };

  const handleClearCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    Promise.all(completedTodos.map(todo => client.delete(`/todos/${todo.id}`)))
      .then(() => {
        setTodos(todos.filter(todo => !todo.completed));
      })
      .catch(() => {
        setErrorMessange(true);
        setError('Unable to delete completed todos');
      });
  };
  //#endregion//

  //#region filteredTodos//
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const todoLeft = todos.filter(todo => !todo.completed).length;
  //#endregion//

  const noTodo = todos.length === 0;

  useEffect(() => {
    if (USER_ID) {
      getTodos()
        .then(data => {
          setTodos(data);
          setLoading(false);
        })
        .catch(() => {
          setErrorMessange(true);
          setError('Unable to load todos');
          setLoading(false);
        });
    }
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          handleAddTodo={handleAddTodo}
          setQueryTodo={setQueryTodo}
          queryTodo={queryTodo}
          setErrorMessange={setErrorMessange}
        />
        {loading ? (
          <div></div>
        ) : (
          <TodoSection
            todos={filteredTodos}
            handleDeleteTodo={() => handleDeleteTodo}
            handleEditTodo={() => handleEditTodo}
          />
        )}
        {!noTodo && (
          <TodoFooter
            todos={todos}
            handleClearCompleted={handleClearCompleted}
            filter={filter}
            setFilter={setFilter}
            todoLeft={todoLeft}
          />
        )}
      </div>

      {isEditingTodo && (
        <TodoModalEditing setIsEditingTodo={setIsEditingTodo} />
      )}
      {errorMessange === true && (
        <TodoError
          error={error}
          setError={setError}
          className={error ? '' : 'hidden'}
          setErrorMessange={setErrorMessange}
        />
      )}
    </div>
  );
};

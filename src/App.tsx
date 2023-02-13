/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { FilterBy } from './types/Filter';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import {
  createTodo, deleteTodo, getTodo, getTodos, updateTodo,
} from './api/todos';
import { ErrorType } from './types/ErrorType';
import { Errors } from './components/Errors';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { Header } from './components/Header';

const USER_ID = 6158;
// https://mate.academy/students-api/todos?userId=6158

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [onetodo, setOneTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<FilterBy>(FilterBy.All);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorType | null>(null);

  const loadTodos = async () => {
    try {
      const loadedTodos = await getTodos(USER_ID);

      setTodos(loadedTodos);
    } catch (err) {
      setError(true);
      setErrorMessage(ErrorType.LoadingError);

      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (onetodo) {
      getTodo(onetodo.id).then(setOneTodo);
    }
  }, [onetodo]);

  const addTodo = (todoData: Omit<Todo, 'id'>) => {
    createTodo(todoData)
      .then(newTodo => setTodos([...todos, newTodo]))
      .catch(() => setErrorMessage(ErrorType.AddingError));
  };

  const removeTodo = (todoId: number) => {
    deleteTodo(todoId)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== todoId));
      })
      .catch(() => setErrorMessage(ErrorType.DeletingError));
  };

  const todoUpdate = (updatedTodo: Todo) => {
    updateTodo(updatedTodo)
      .then(() => {
        setTodos(
          todos.map(todo => {
            if (todo.id === updatedTodo.id) {
              return updatedTodo;
            }

            return todo;
          }),
        );
      })
      .catch(() => setErrorMessage(ErrorType.UpdatingError));
  };

  const completedTodos = todos.filter(todo => todo.completed);
  const removeCompleted = () => {
    completedTodos.forEach(todo => {
      removeTodo(todo.id);
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo({
      title: newTodoTitle,
      completed: false,
      userId: USER_ID,
    });

    setNewTodoTitle('');
  };

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case FilterBy.Active:
        return !todo.completed;

      case FilterBy.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header
          todos={visibleTodos}
          onSubmit={handleSubmit}
          newTodoTitle={newTodoTitle}
          setNewTodoTitle={setNewTodoTitle}
        />
        {todos && (
          <Main
            todos={visibleTodos}
            onRemove={removeTodo}
            onTodoUpdate={todoUpdate}
          />
        )}

        {todos && (
          <Footer
            todos={todos}
            filter={filter}
            setFilter={setFilter}
            onRemoveCompleted={removeCompleted}
          />
        )}
      </div>

      {error && (
        <Errors
          errorMessage={errorMessage}
          error={error}
          setError={setError}
        />
      )}
    </div>
  );
};

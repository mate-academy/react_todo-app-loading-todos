import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  addTodos,
  getTodos,
  USER_ID,
  //deleteTodo,
  //updateTodo,
} from './api/todos';
import { UserTodosList } from './UserTodosList';
import { Todo } from './types/Todo';
import { ErrorMessage } from './ErrorMessage';
import { Footer } from './Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [newTodo, setNewTodo] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  const clearError = () => {
    setError('');
  };

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data ?? null);
      })
      .catch(() => setError('load'));
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setNewTodo(newTodo);

    const newTodoObject: Todo = {
      userId: USER_ID,
      title: newTodo,
      completed: false,
      id: todos !== null ? todos.length + 1 : 1,
    };

    if (newTodo.trim().length === 0) {
      setError('empty title');
    } else {
      if (todos) {
        setTodos([...todos, newTodoObject]);
      } else {
        setTodos([newTodoObject]);
      }

      addTodos(newTodoObject).catch(() => setError('add'));
    }

    setNewTodo('');
  };

  const handleFilter = (): Todo[] | null => {
    if (!todos) {
      return null;
    }

    if (filter === 'active') {
      return todos.filter(t => !t.completed);
    }

    if (filter === 'completed') {
      return todos.filter(t => t.completed);
    }

    return todos;
  };
  /*

  const checkTodo = (todoId: number) => {
    const todoToUpdate = todos?.find(todo => todo.id === todoId);

    if (!todoToUpdate) {
      return;
    }

    const newCompletedStatus = !todoToUpdate.completed;

    updateTodo(todoId, { completed: newCompletedStatus });
    setShouldFetch(true);
  };

  const checkAllTodos = () => {
    if (!todos) {
      return;
    }

    const allCompleted = todos.every(todo => todo.completed);
    const newCompletedStatus = !allCompleted;

    Promise.all(
      todos.map(todo =>
        updateTodo(todo.id, { completed: newCompletedStatus }).catch(() =>
          setError('update'),
        ),
      ),
    );

    setShouldFetch(true);
  };

  const delTodo = (todoId: number) => {
    deleteTodo(todoId);
    setShouldFetch(true);
  };

  const deleteCompletedTodos = (t: Todo[]) => {
    for (let i = 0; i < t.length; i++) {
      if (t[i].completed === true) {
        deleteTodo(t[i].id);
      }
    }

    setShouldFetch(true);
    //setTodos(todos)
  };*/

  const finalTodos: Todo[] | null = handleFilter();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
            //onClick={() => checkAllTodos()}
          />

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <UserTodosList
            todos={finalTodos}
            //onChecked={checkTodo}
            //onDeleted={delTodo}
          />
        </section>

        {todos && todos.length > 0 && (
          <Footer filter={filter} filterTodos={todos} setFilter={setFilter} />
        )}
      </div>
      <ErrorMessage error={error} onClear={clearError} />
    </div>
  );
};

import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Form } from './components/Form';
import { TodoList } from './components/Todolist';
import { Footer } from './components/Footer';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';


const USER_ID = 6910;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const [completedTodos, setCompletedTodos] = useState<number[]>([]);
  const showError = !!error || error !== '';

  useEffect(() => {
    getTodos(USER_ID)
      .then(data => {
        setTodos(data);
        setError('');
      })
      .catch(() => {
        showError;
        setError('Unable to load todos');

        setTimeout(() => {
          showError;
        }, 3000);
      });
  }, []);

  const addCompletedTodos = (todoId: number) => {
    const currentTodo = todos.find(todo => todo.id === todoId);

    if (currentTodo) {
      if (!completedTodos.includes(todoId)) {
        setCompletedTodos((CurrentCompletedTodos) => {
          return [
            ...CurrentCompletedTodos,
            todoId,
          ];
        });
      } else {
        setCompletedTodos((CurrentCompletedTodos) => {
          return CurrentCompletedTodos.filter(todo => todo !== todoId);
        });
      }
    }
  };

  const visibleTodos = todos
    .filter((todo) => {
      switch (filter) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    });


  const addTodo = () => {
    const newTodo = {
      title,
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      completed: false,
    };

    return [...todos, newTodo];
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames(
              'todoapp__toggle-all',
              { active: todos.some(todo => !todo.completed) },
            )}
          />
          <Form
            title={title}
            onSubmit={addTodo}
            setTitle={setTitle}
            className="todoapp__new-todo"
            placeholder="What needs to be done"
          />
        </header>

        {todos && (
          <>
            <TodoList
              title={title}
              setTitle={setTitle}
              todos={visibleTodos}
              addCompletedTodos={addCompletedTodos}
            />
            <Footer
              todos={todos}
              filter={filter}
              onSetFilter={setFilter}
            />
          </>
        )}
        {showError && (
          <ErrorNotification
            error={error}
            showError={showError}
            onErrorClose={() => setError('')}
          />
        )}
      </div>
    </div>
  );
};

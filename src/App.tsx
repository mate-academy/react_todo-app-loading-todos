/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodo, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { NewTodoForm } from './components/NewTodoForm';
import { FormMain } from './components/FormMain';
import { FormFooter } from './components/FormFooter';
import { FormErrors } from './components/FormErrors';

const USER_ID = 6146;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Unable to load todos');
  const [filter, setFilter] = useState('All');
  const [completedTodo, setCompletedTodo] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setError(true);
        setErrorMsg(errorMsg);

        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  }, []);

  useEffect(() => {
    if (todo) {
      getTodo(todo.id).then(setTodo);
    }
  }, [todo]);

  const addTodo = (todoData: string) => {
    const newTodo = {
      id: Date.now(),
      title: todoData,
      completed: false,
      userId: USER_ID,
    };

    setTodos([...todos, newTodo]);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const selectedTodo = (id: number) => {
    const ClickedTodo = todos.find(td => td.id === id);

    if (ClickedTodo) {
      if (completedTodo) {
        setCompletedTodo(false);
      }

      if (!completedTodo) {
        setCompletedTodo(true);
      }

      ClickedTodo.completed = completedTodo;
    }
  };

  const visibleTodos = todos.filter((td) => {
    if (filter === 'active') {
      return !td.completed;
    }

    if (filter === 'completed') {
      return td.completed;
    }

    return true;
  });

  const removeTodo = (todoId: number) => {
    return todos.filter(td => td.id !== todoId);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodoForm todos={visibleTodos} onAdd={addTodo} />
        {todos.length > 0
        && (
          <FormMain
            todos={visibleTodos}
            selectedTodo={selectedTodo}
            onRemove={removeTodo}
          />
        )}

        {todos.length > 0
        && <FormFooter todos={todos} filter={filter} setFilter={setFilter} />}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {error && <FormErrors />}
    </div>
  );
};

/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodosList } from './components/TodoList/TodoList';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoError } from './components/TodoError/TodoError';

const statusTodos = (todos: Todo[], status: string) => {
  let filteredTodos = todos;

  if (status === 'active') {
    filteredTodos = todos.filter(item => !item.completed);
  } else if (status === 'completed') {
    filteredTodos = todos.filter(item => item.completed);
  } else {
    filteredTodos = todos;
  }

  return filteredTodos;
};

const USER_ID = 6709;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then((res) => {
        setTodos(res);
      })
      .catch(() => {
        setError('Unable to add a todo');
        setTimeout(() => {
          setError('');
        }, 3000);
      });
  }, [todos]);

  const handleChangeCompleted = (id: number) => {
    const completed = todos.map(item => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
        };
      }

      return item;
    });

    setTodos(completed);
  };

  const handleToggleAll = () => {
    setIsActive(!isActive);
  };

  const handleFilterAll = () => {
    setActiveFilter('all');
  };

  const handleFilterActive = () => {
    setActiveFilter('active');
  };

  const handleFilterCompleted = () => {
    setActiveFilter('completed');
  };

  useEffect(() => {
    const result = todos.map(item => {
      if (isActive) {
        return { ...item, completed: true };
      }

      return { ...item, completed: false };
    });

    setTodos(result);
  }, [isActive]);

  const filteredTodos = statusTodos(todos, activeFilter);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader handleToggleAll={handleToggleAll} todos={todos} />

        <section className="todoapp__main">
          <TodosList
            todos={filteredTodos}
            handleChangeCompleted={handleChangeCompleted}
          />
        </section>

        <footer className="todoapp__footer">
          {todos.length !== 0 && (
            <TodoFooter
              handleFilterAll={handleFilterAll}
              handleFilterActive={handleFilterActive}
              handleFilterCompleted={handleFilterCompleted}
              activeFilter={activeFilter}
            />
          )}
        </footer>
      </div>

      <TodoError error={error} setError={setError} />
    </div>
  );
};

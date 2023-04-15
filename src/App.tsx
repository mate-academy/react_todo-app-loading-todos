/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodosList } from './components/TodoList/TodoList';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoError } from './components/TodoError/TodoError';
import { TodoStatus } from './types/TodoStatus/TodoStatus';

const statusTodos = (todos: Todo[], filterBy: TodoStatus) => {
  let filteredTodos = todos;

  switch (filterBy) {
    case TodoStatus.Active:
      filteredTodos = todos.filter(item => !item.completed);
      break;
    case TodoStatus.Completed:
      filteredTodos = todos.filter(item => item.completed);
      break;
    case TodoStatus.All:
    default:
      break;
  }

  return filteredTodos;
};

const USER_ID = 6709;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [activeFilter, setActiveFilter] = useState<TodoStatus>(TodoStatus.All);
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
    const completed = todos.map(item => (
      item.id === id
        ? {
          ...item,
          completed: !item.completed,
        }
        : item
    ));

    setTodos(completed);
  };

  const handleToggleAll = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const result = todos.map(item => {
      return { ...item, completed: isActive };
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
        {todos.length !== 0 && (
          <footer className="todoapp__footer">
            <TodoFooter
              handleFilter={setActiveFilter}
              activeFilter={activeFilter}
            />
          </footer>
        )}
      </div>

      {error && (<TodoError error={error} setError={setError} />) }
    </div>
  );
};

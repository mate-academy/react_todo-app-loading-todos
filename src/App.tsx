/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoFilter } from './types/TodoFilter';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Notifications } from './components/Notifications';

const USER_ID = 11399;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [errors, setErrors] = useState({
    load: false,
  });
  const [currentFilter, setCurrentFilter] = useState(TodoFilter.All);

  const filterTodos = (initTodos?: Todo[]) => {
    let filtered;

    if (initTodos) {
      filtered = [...initTodos];
    } else {
      filtered = [...todos];
    }

    switch (currentFilter) {
      case TodoFilter.Active:
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case TodoFilter.Completed:
        filtered = filtered.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    setVisibleTodos(filtered);
  };

  const loadTodos = () => {
    getTodos(USER_ID).then(items => {
      setTodos([...items]);
      filterTodos(items);
    }).catch(() => {
      setErrors(prevErrors => ({ ...prevErrors, load: true }));
    });
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    filterTodos();
  }, [currentFilter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />

        {visibleTodos.length > 0 && (
          <TodoList
            todos={visibleTodos}
          />
        )}

        {visibleTodos.length > 0 && (
          <Footer
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Notifications
        errors={errors}
        setErrors={setErrors}
      />
    </div>
  );
};

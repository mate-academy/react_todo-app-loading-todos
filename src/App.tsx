/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';
import { Notifications } from './components/Notifications';
import { getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { ErrorText } from './types/ErrorText';
import { Filters } from './types/Filters';

const USER_ID = 11213;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadedTodo, setLoadingTodo] = useState<number | null>(null);
  const [fieldOperation, setFieldOperation] = useState(ErrorText.Empty);
  const [selectedFilter, setSelectedFilter] = useState<Filters>(Filters.All);

  const activeTodos = todos.filter(t => t.completed === false);
  const completedTodos = todos.filter(t => t.completed === true);

  const filteredTodos = (filterChar: Filters) => {
    return todos.filter(todo => {
      switch (filterChar) {
        case Filters.All:
          return true;

        case Filters.Active:
          return todo.completed === false;

        case Filters.Completed:
          return todo.completed === true;

        default:
          return false;
      }
    });
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setFieldOperation(ErrorText.Get);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          activeTodos={activeTodos}
        />

        <TodoList
          todos={filteredTodos(selectedFilter)}
          loadingTodoId={loadedTodo}
          onSetLoadingTodo={setLoadingTodo}
        />

        {todos.length > 0
          && (
            <Filter
              activeTodos={activeTodos}
              completedTodos={completedTodos}
              selectedFilter={selectedFilter}
              onSetSelectedFilter={setSelectedFilter}
            />
          )}
      </div>

      <Notifications
        fieldOperation={fieldOperation}
        onSetFieldOperation={setFieldOperation}
      />
    </div>
  );
};

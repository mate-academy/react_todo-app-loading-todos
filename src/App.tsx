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
  const [fieldOperation, setFieldOperation] = useState(ErrorText.empty);
  const [selectedFilter, setSelectedFilter] = useState<Filters>(Filters.all);

  const activeTodos = todos.filter(t => t.completed === false);
  const completedTodos = todos.filter(t => t.completed === true);

  const filteredTodos = (filterChar: Filters) => {
    return todos.filter(todo => {
      switch (filterChar) {
        case 'all':
          return true;

        case 'active':
          return todo.completed === false;

        case 'completed':
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
        setFieldOperation(ErrorText.get);
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
          onSetLoadingTodo={(id) => setLoadingTodo(id)}
        />

        {todos.length > 0
          && (
            <Filter
              activeTodos={activeTodos}
              completedTodos={completedTodos}
              selectedFilter={selectedFilter}
              onSetSelectedFilter={(char) => setSelectedFilter(char)}
            />
          )}
      </div>

      {/* {fieldOperation.length > 0 && */}
      <Notifications
        fieldOperation={fieldOperation}
        onSetFieldOperation={(text: ErrorText) => setFieldOperation(text)}
      />
      {/* } */}
    </div>
  );
};

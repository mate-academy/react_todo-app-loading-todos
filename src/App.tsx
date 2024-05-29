/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { FilterOptions } from './types/FilterOptions';
import { Errors } from './types/Errors';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { TodoError } from './components/TodoError';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterOption, setFilterOption] = useState<FilterOptions>(
    FilterOptions.all,
  );
  const [errorText, setErrorText] = useState<Errors | null>(null);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(() => {
        setErrorText(Errors.unableToLoad);

        window.setTimeout(() => setErrorText(null), 3000);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoApp
          todos={todos}
          updateTodos={todoItems => setTodos(todoItems)}
          addErrorText={errorMessage => setErrorText(errorMessage)}
        />
        <TodoList
          todos={todos}
          updateTodos={todoItems => setTodos(todoItems)}
          filterOption={filterOption}
        />
        {!!todos.length && (
          <TodosFilter
            todos={todos}
            updateTodos={todoItems => setTodos(todoItems)}
            filterOption={filterOption}
            selectFilterOption={option => setFilterOption(option)}
          />
        )}
      </div>

      <TodoError
        errorText={errorText}
        addErrorText={errorMessage => setErrorText(errorMessage)}
      />
    </div>
  );
};

/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { Input } from './components/Input/Input';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorField } from './components/ErrorField/ErrorField';
import { getTodos } from './api/todos';

const USER_ID = 11893;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(listOfTodos => {
        let filteredList = listOfTodos;

        if (filter === 'Active') {
          filteredList = listOfTodos.filter(todo => !todo.completed);
        }

        if (filter === 'Completed') {
          filteredList = listOfTodos.filter(todo => todo.completed);
        }

        setTodos(filteredList);
        setError('');
      });
  }, [filter]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Input />

        <TodoList todos={todos} filter={filter} changeFilter={setFilter} />
      </div>

      {error && (<ErrorField />)}
    </div>
  );
};

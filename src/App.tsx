/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorMessage } from './types/ErrorMessage';
import { Notification } from './components/Notification';
import {Filter} from "./types/Filter";

const USER_ID = 11906;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isSelected, setIsSelected] = useState('All');

  useEffect(() => {
    getTodos(USER_ID)
      .then(allTodos => {
        setTodos(allTodos);
        setFilteredTodos(allTodos);
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.UnableToLoad);
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filterTodo = (filter: string) => {
    switch (filter) {
      case (Filter.Active):
        setFilteredTodos(todos.filter(todo => !todo.completed));
        setIsSelected(Filter.Active);
        break;
      case (Filter.Completed):
        setFilteredTodos(todos.filter(todo => todo.completed));
        setIsSelected(Filter.Completed);
        break;
      default:
        setFilteredTodos(todos);
        setIsSelected(Filter.All);
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        <TodoList todos={filteredTodos} />
        {todos.length > 0
          && (
            <Footer
              todos={todos}
              handleFilterChange={filterTodo}
              selectedOption={isSelected}
            />
          )}
      </div>
      <Notification error={errorMessage} />
    </div>
  );
};

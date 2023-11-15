/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {useEffect, useState} from 'react';
import { UserWarning } from './UserWarning';
import {TodoList} from './components/TodoList';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {getTodos} from './api/todos';
import {Todo} from './types/Todo';
import {ErrorMessage} from './types/ErrorMessage';
import {Notification} from "./components/Notification";

const USER_ID = 11906;
export const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isSelected, setIsSelected] = useState('All');

  if (!USER_ID) {
    return <UserWarning />;
  }

  useEffect(() => {
    getTodos(USER_ID)
      .then(todos => {
        setTodos(todos)
        setFilteredTodos(todos)
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.UnableToLoad);
        setTimeout(() => setErrorMessage(''), 3000);
      })
    ;
  }, []);

  function filterTodo (filter: string) {
    switch (filter) {
      case ('Active'):
        setFilteredTodos(todos.filter(todo => !todo.completed));
        setIsSelected('Active');
        break;
      case ('Completed'):
        setFilteredTodos(todos.filter(todo => todo.completed));
        setIsSelected('Completed');
        break;
      default:
        setFilteredTodos(todos);
        setIsSelected('All');
    }
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        <TodoList todos={filteredTodos}/>
        {todos.length &&
          <Footer
            todos={todos}
            handleOnClick={filterTodo}
            selectedOption={isSelected}
          />}
      </div>
      <Notification error={errorMessage} />
    </div>
  );
};

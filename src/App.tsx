/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
// import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { FilteredState } from './types/filteredState';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 6249;

export const App: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredState, setFilteredState] = useState(FilteredState.All);
  const [errorMessage, setErrorMessage] = React.useState('');

  if (!USER_ID) {
    return <UserWarning />;
  }

  let visibleTodos = [...todos];

  if (filteredState === FilteredState.Active) {
    visibleTodos = visibleTodos.filter(todo => !todo.completed);
  }

  if (filteredState === FilteredState.Completed) {
    visibleTodos = visibleTodos.filter(todo => todo.completed);
  }

  const addTodo = (newTodo: Todo) => {
    return setTodos([...todos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      userId: USER_ID,
      id: Date.now(),
      title: todoTitle,
      completed: false,
    };

    if (todoTitle) {
      addTodo(newTodo);
      setTodoTitle('');
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          onTodoTitle={todoTitle}
          onSetTodoTitle={setTodoTitle}
          onHandleSubmit={handleSubmit}
        />
        <Main
          onTodos={visibleTodos}
        />
        {todos.length > 0 && (
          <Footer
            OnFilteredState={filteredState}
            onSetFilteredState={setFilteredState}
            todos={todos}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

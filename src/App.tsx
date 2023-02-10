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
  const [errorMessage, setErrorMessage] = useState('');

  const deleteTodo = (todoId: number) => {
    setTodos(currentTodo => currentTodo.filter(todo => todo.id !== todoId));
  };

  const updateTodo = (todoToUpdate: Todo) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === todoToUpdate.id) {
          return todoToUpdate;
        }

        return todo;
      }),
    );
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = todos.filter(todo => {
    switch (filteredState) {
      case FilteredState.Active:
        return !todo.completed;
      case FilteredState.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

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
          onDeleteTodo={deleteTodo}
          onUpdateTodo={updateTodo}
        />
        {todos.length > 0 && (
          <Footer
            OnFilteredState={filteredState}
            onSetFilteredState={setFilteredState}
            todos={todos}
            onDeleteTodo={deleteTodo}
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

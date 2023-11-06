/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/header';
import { TodoList } from './components/todoList';
import { Footer } from './components/footer';
import { ErrorNotification } from './components/errorNotification';
import { Todo } from './types/Todo';
import { getTodos } from './services/todos';
import { FilteringType } from './types/filteringType';

const USER_ID = 11841;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [typeOfFiltering, setTypeOfFiltering]
  = useState<string>(FilteringType.All);
  const [isLoadedTodos, setIsLoadedTodos] = useState(true);
  // const [isCompletedTodo, setIsCompletedTodo] = useState<Todo | null>(null);

  const hasErrorMessage = !isLoadedTodos;

  const filteredTodos = [...todos].filter(todo => {
    if (typeOfFiltering) {
      switch (typeOfFiltering) {
        case FilteringType.All:
          return todos;
        case FilteringType.Active:
          return !todo.completed;
        case FilteringType.Completed:
          return todo.completed;
        default:
          return todos;
      }
    }

    return todo;
  });

  useEffect(() => {
    getTodos(USER_ID)
      .then(todoses => setTodos(todoses))
      .catch(() => setIsLoadedTodos(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        {todos.length > 0
          && (
            <TodoList
              todos={filteredTodos}
              // setIsCompletedTodo={setIsCompletedTodo}
              // isCompletedTodo={isCompletedTodo?.id ?? null}
            />
          )}

        {todos.length > 0
        && (
          <Footer
            setTypeOfFiltering={setTypeOfFiltering}
            typeOfFiltering={typeOfFiltering}
            todos={todos}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {hasErrorMessage && (<ErrorNotification />)}
    </div>
  );
};

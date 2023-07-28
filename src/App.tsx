/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from "react";
import { UserWarning } from "./UserWarning";
import { TodoHeader } from "./components/TodoHeader";
import { TodoList } from "./components/TodoList";
import { TodoFooter } from "./components/TodoFooter";
import { TodoContext } from "./context/todoContext";
import { ErrorNotification } from './ErrorNotification';

export const USER_ID = 11221;

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }
  const { todos } = useContext(TodoContext);

  return (
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <TodoHeader />
          {todos.length !== 0 && (
            <>
              <TodoList />
              <TodoFooter />
            </>
          )}
          {/* Hide the footer if there are no todos */}
        </div>
          <ErrorNotification />
      </div>
  );
};

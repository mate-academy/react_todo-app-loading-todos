import React, { useContext } from 'react';
import { TodoContext, TodoProvider } from './context/todoContext';
import { UserWarning } from './UserWarning';
import { AddTodoFormHeader } from './components/AddTodoFormHeader';
import { TodoListSection } from './components/TodoListSection';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotifications } from './components/ErrorNotifications';

const USER_ID = 11238;

export const App: React.FC = () => {
  const { errorMessage } = useContext(TodoContext);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <TodoProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <AddTodoFormHeader />
          <TodoListSection />
          <TodoFooter />
        </div>

        {errorMessage && <ErrorNotifications />}
      </div>
    </TodoProvider>
  );
};

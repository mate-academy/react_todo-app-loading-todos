/* eslint-disable jsx-a11y/control-has-associated-label */

import { ErrorNotification } from './ErrorNotification';
import { Footer } from './Footer';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { useTodos } from './context/TodosContext';

export const App: React.FC = () => {
  const { todos } = useTodos();

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList />

        {todos.length > 0 && <Footer />}
      </div>

      <ErrorNotification />
    </div>
  );
};

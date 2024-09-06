/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './component/Header/Header';
import { ToDoList } from './component/TodoList/TodoList';
import { Footer } from './component/Footer/Footer';
import { Errors } from './component/Errors/Errors';
import { GroupStatusTypes } from './types/status';
import { ErrorMessage } from './types/errorMessage';

interface TodoFilterProps {
  filteredStatus: GroupStatusTypes;
  error: ErrorMessage;
}

export const App: React.FC<TodoFilterProps> = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState(GroupStatusTypes.ALL);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        switch (status) {
          case GroupStatusTypes.ALL:
            setTodos(todosFromServer);
            break;
          case GroupStatusTypes.ACTIVE:
            setTodos(todosFromServer.filter(todo => !todo.completed));
            break;

          case GroupStatusTypes.COMPLETED:
            setTodos(todosFromServer.filter(todo => todo.completed));
            break;

          default:
            setTodos(todosFromServer);
        }
      })
      .catch(() => setErrorMessage(ErrorMessage.ERROR))
      .finally(() => {
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, [status]);

  const filteredTodods = todos.filter(todo => !todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <ToDoList todos={todos} />

        {!!todos.length && (
          <Footer
            onClick={setStatus}
            status={status}
            filteredTodods={filteredTodods}
          />
        )}
      </div>

      <Errors errorMessage={errorMessage} onClose={setErrorMessage} />
    </div>
  );
};

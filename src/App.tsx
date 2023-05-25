/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
// import { client } from './utils/fetchClient';
// import { Todo } from './types/Todo';
import { TodoApp } from './components/TodoApp';
import { TodosError } from './components/TodoErrors';
// import { useTodosContext } from './utils/TodosContext';

const USER_ID = 10529;

export const App: React.FC = () => {
  // const [error, setError] = useState(false);
  // const [todos, setTodos] = useState<Todo[]>([]);
  // const url = `/todos?userId=${USER_ID}`;

  // if (error === true) {
  //   setTimeout(() => setError(false), 3000);
  // }

  // useEffect(() => {
  //   client.get<Todo[]>(url).then(response => {
  //     return setTodos(response);
  //   }).catch(() => setError(true));
  // }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <TodoApp />
      <TodosError />
    </div>
  );
};

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Header } from './components/Header/Header';
import TodoList from './components/TodoList';
import ErrorNotification from './components/ErrorNotification/ErrorNotification';
import { Footer } from './components/Footer/Footer';
import { useTodosContext } from './context/TodosProvider';
import { TodosError } from './types/TodosErrors';

export const App: React.FC = () => {
  const { todos, handleErrorMessage, setTodos } = useTodosContext();
  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .catch(()=>handleErrorMessage(TodosError.LOAD_TODOS))
  },[])
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header/>

        <TodoList/>

        {!!todos.length && <Footer />}
      </div>
      <ErrorNotification />
    </div>
  );
};

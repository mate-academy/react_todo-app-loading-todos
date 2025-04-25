/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Notification } from './components/Notification';
//import { Todo } from './types/Todo';

// const getFilteredTodo: Todo = () => {

//  }

export const App: React.FC = () => {
  const [errorMessage] = React.useState<string>('');
  // const [todos, setTodos] = React.useState<Todo[]>([]);
  // const [filteredTodos, setFilteredTodos] = React.useState<Todo[]>([]);

  useEffect(() => {
    // getTodos().then(serverTodos => {
    //   setTodos(serverTodos);
    // });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const itemsLeft = filteredTodos.filter(
    todo => todo.completed === false,
  ).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList />
        <Footer itemsLeft={itemsLeft} />
      </div>

      <Notification errorMessage={errorMessage} />
    </div>
  );
};

/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { Footer } from './components/todoFooter';
import { Messege } from './components/ErrorMessege';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoStatus } from './types/TodoStatus';
import { visibleTodos } from './utils/TodoFilter';

const USER_ID = 10883;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoStatus, setTodoStatus] = useState<TodoStatus>(TodoStatus.ALL);
  const [visibleError, setVisibleError] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setVisibleError('Unable to load a todos');
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <Header
        todos={todos}
      />

      <div className="todoapp__content">

        <TodoList
          todos={visibleTodos(todos, todoStatus)}
        />

        {todos.length > 0 && (
          <Footer
            setTodoStatus={setTodoStatus}
            todoStatus={todoStatus}
            todos={todos}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      <Messege
        visibleError={visibleError}
        setVisibleError={setVisibleError}
      />
    </div>
  );
};

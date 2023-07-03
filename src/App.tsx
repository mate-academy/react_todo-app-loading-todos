import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { Footer } from './components/todoFooter';
import { Message } from './components/ErrorMessege';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoStatus } from './types/TodoStatus';
import { FilterTodos } from './utils/TodoFilter';

const USER_ID = 10883;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoFilter, setTodoFilter] = useState<TodoStatus>(TodoStatus.ALL);
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
          todos={FilterTodos(todos, todoFilter)}
        />

        {todos.length > 0 && (
          <Footer
            setTodoFilter={setTodoFilter}
            todoFilter={todoFilter}
            todos={todos}
          />
        )}
      </div>

      <Message
        visibleError={visibleError}
        setVisibleError={setVisibleError}
      />
    </div>
  );
};

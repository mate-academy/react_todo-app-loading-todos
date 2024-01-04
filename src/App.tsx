/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { Section } from './components/Section';
import { Footer } from './components/Footer';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TasksFilter } from './types/tasksFilter';
import { Errors } from './components/Errors';

const USER_ID = 12147;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tasksFilter, setTasksFilter] = useState<TasksFilter>(TasksFilter.all);
  const [isErrorsClosed, setIsErrorsClosed] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getTodos(USER_ID);

        setTodos(result);
      } catch (error) {
        setIsErrorsClosed(false);
      }
    }

    fetchData();

    setTimeout(() => {
      setIsErrorsClosed(true);
    }, 3000);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <>
            <Section
              todos={todos}
              tasksFilter={tasksFilter}
            />
            <Footer
              setTasksFilter={setTasksFilter}
              tasksFilter={tasksFilter}
            />
          </>
        )}
      </div>
      {!isErrorsClosed && (
        <Errors
          isErrorsClosed={isErrorsClosed}
          setIsErrorsClosed={setIsErrorsClosed}
        />
      )}
    </div>
  );
};

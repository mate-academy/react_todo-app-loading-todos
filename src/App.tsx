import React, { useState, useEffect, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { FormTodo } from './component/FormTodo/FormTodo';
import { MainTodo } from './component/MainTodo/MainTodo';
import { Footer } from './component/Footer/Footer';
import { Error } from './component/Error/Error';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterByWords } from './types/enums';

const USER_ID = 10599;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState(FilterByWords.All);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const copyTodoArray = useMemo(() => {
    switch (filterStatus) {
      case FilterByWords.Active:
        return todos.filter((elem) => !elem.completed);
      case FilterByWords.Completed:
        return todos.filter((elem) => elem.completed);
      default:
        return todos;
    }
  }, [filterStatus, todos]);

  const closeErrorBanner = (value: string) => {
    setError(value);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <FormTodo />

        <MainTodo todos={copyTodoArray} />
        <footer className="todoapp__footer">
          <Footer
            setFilterHandler={setFilterStatus}
            todoCounter={copyTodoArray.length}
          />
        </footer>
      </div>

      <Error
        error={error}
        closeErrorBanner={closeErrorBanner}
      />
    </div>
  );
};

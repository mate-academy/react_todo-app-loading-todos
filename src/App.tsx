/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Header } from './components/header/Header';
import { List } from './components/list/List';
import { Footer } from './components/footer/Footer';
import { UserWarning } from './UserWarning';
import { Warnings } from './components/warnings/Warnings';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Select } from './types/Select';
import { Error } from './types/Error';

const USER_ID = 10514;

const { All, Active, Completed } = Select;

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<[] | Todo[]>([]);
  const [filterBy, setFilterBy] = useState(All);
  const [error, setError] = useState('');

  function todoLoading() {
    getTodos(USER_ID)
      .then(todos => setTodoList(todos))
      .catch(() => setError(Error.Get));
  }

  useEffect(() => {
    todoLoading();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  function filterList() {
    switch (filterBy) {
      case Active:
        return todoList.filter((todo: Todo) => !todo.completed);

      case Completed:
        return todoList.filter((todo: Todo) => todo.completed);

      default:
        return todoList;
    }
  }

  if (error) {
    setTimeout(() => setError(''), 3000);
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          setTodoList={setTodoList}
          todoList={todoList}
          setError={setError}
        />

        <List
          setTodoList={setTodoList}
          todoList={filterList()}
          setError={setError}

        />

        {todoList.length !== 0 && (
          <Footer
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            todoList={todoList}
          />
        )}
      </div>
      <Warnings error={error} setError={setError} />
    </div>
  );
};

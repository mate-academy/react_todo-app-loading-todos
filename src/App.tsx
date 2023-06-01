/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
// import { UserWarning } from './UserWarning';
import { Header } from './component/component/Header/header';
import { TodoList } from './component/component/TodoList/todoList';
import { Footer } from './component/component/Footer/footer';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { GetFilter } from './types/GetFilter';

const USER_ID = 10570;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [select, setSelect] = useState<GetFilter>(GetFilter.ALL);
  const [error, setError] = useState(false);

  const loadAllGoods = async () => {
    try {
      const todo = await getTodos(USER_ID);

      setTodos(todo);
      setError(false);
    } catch {
      setError(true);
    }
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (select) {
        case GetFilter.ACTIVE:
          return !todo.completed;

        case GetFilter.COMPLETED:
          return todo.completed;

        case GetFilter.ALL:
          return true;

        default:
          return todo;
      }
    });
  }, [select, todos]);

  useEffect(() => {
    loadAllGoods();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={todos} />
        {todos.length > 0 && (
          <Footer
            onSelect={setSelect}
            select={select}
            filteredTodos={filteredTodos}
          />

        )}
      </div>

      {error
      && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button type="button" className="delete" />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo
        </div>
      )}
    </div>
  );
};

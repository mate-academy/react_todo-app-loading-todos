/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { FilterBy } from './types/FilterBy';

const USER_ID = 6259;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);

  const getAllTodos = async () => {
    try {
      const data = await getTodos(USER_ID);

      setTodos(data);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const changeFilter = (selectedFilter: FilterBy) => {
    setFilterBy(selectedFilter);
  };

  const hasActiveTodos = todos.some(todo => todo.completed === false);

  let filteredTodos = todos;

  switch (filterBy) {
    case FilterBy.Active:
      filteredTodos = todos.filter(todo => todo.completed === false);
      break;
    case FilterBy.Complited:
      filteredTodos = todos.filter(todo => todo.completed === true);
      break;
    case FilterBy.All:
    default:
      filteredTodos = todos;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header hasActiveTodos={hasActiveTodos} />

        <TodoList todos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length
        && (
          <Footer
            changeFilter={changeFilter}
            itemsCounter={filteredTodos.length}
          />
        )}

      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div className="notification is-danger is-light has-text-weight-normal">
        <button type="button" className="delete" />

        {/* show only one message at a time */}
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};

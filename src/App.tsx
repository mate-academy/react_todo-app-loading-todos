import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { NewTodoField } from './Components/NewTodoField/NewTodoField';
import { TodoList } from './Components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { Footer } from './Components/Footer/Footer';
import { TodosFilter } from './types/TodosFilter';

export const App: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<TodosFilter>('all');

  const hasTodos = todos.length > 0;

  const fetchTodos = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch (err) {
      setError('Unable to load todos');
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodoField />
        {hasTodos && (
          <>
            <TodoList todos={todos} selectedFilter={selectedFilter} />
            <Footer
              todos={todos}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          </>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${error === null ? 'hidden' : ''} `}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {error}
        {/* <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};

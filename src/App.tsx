/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { AuthContext } from './components/Auth/AuthContext';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { FilterState } from './types/FilterState';
import { Todo } from './types/Todo';
import { Error } from './types/ErrorMessage';

const USER_ID = 6268;

export const App: React.FC = () => {
  const [todoTitle, setTodoTitile] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(FilterState.All);
  const [error, setError] = useState(Error.NoError);
  const user = useContext(AuthContext);

  const getTodosFromServer = async () => {
    if (!user) {
      return;
    }

    try {
      const todosFromServer = await getTodos(user.id);

      setTodos(todosFromServer);
    } catch (err) {
      setError(Error.Error);
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      id: Date.now(),
      userId: USER_ID,
      title: todoTitle,
      completed: false,
    };

    if (todoTitle) {
      addTodo(newTodo);
      setTodoTitile('');
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          onTodoTitle={todoTitle}
          onSetTodoTitle={setTodoTitile}
          onHandleSubmit={handleSubmit}
        />

        <TodoList
          todos={todos}
          filterBy={filterBy}
        />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            filterState={filterBy}
            setFilterBy={setFilterBy}
            todos={todos}
          />
        )}

        <ErrorMessage
          errorMessage={error}
          setErrorMessage={setError}
        />
      </div>
    </div>
  );
};

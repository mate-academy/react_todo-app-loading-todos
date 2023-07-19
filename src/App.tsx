/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { createTodo, getTodos } from './api/todos';
import { Footer } from './components/Footer/Footer';
import { Notification } from './components/Notification/Notification';
import { FilterType } from './types/FiterType';
import { ErrorMessage } from './types/ErrorMessage';

const USER_ID = 11085;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [
    errorMessage,
    setErrorMessage,
  ] = useState<ErrorMessage>(ErrorMessage.NoError);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos(USER_ID);

        setTodos(fetchedTodos);
      } catch (error) {
        setErrorMessage(ErrorMessage.FetchTodos);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (title: string) => {
    try {
      const newTodo = await createTodo({
        userId: USER_ID,
        title,
        completed: false,
      });

      setTodos([...todos, newTodo]);
    } catch (error) {
      setErrorMessage(ErrorMessage.AddTodo);
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'all':
        return true;
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return false;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  const completedCount = todos.filter(todo => todo.completed).length;

  const clearErrorMessage = () => {
    setErrorMessage(ErrorMessage.NoError);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header addTodo={addTodo} />
        <TodoList todos={filteredTodos} />
        <Footer
          todosCount={todos.length}
          completedCount={completedCount}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      {errorMessage && (
        <Notification errorMessage={errorMessage} onClose={clearErrorMessage} />
      )}
    </div>
  );
};

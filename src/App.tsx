/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { addTodos, getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { ErrorMessage } from './components/ErrorMessage';
import { TodoForm } from './components/TodoForm';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addTodo = async (todo: Todo): Promise<void> => {
    try {
      const newTodo = await addTodos(todo);

      setTodos(prevTodos => [...prevTodos, newTodo]);
    } catch (error) {
      setErrorMessage('Unable to add a todo');
      throw error;
    }
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = getFilteredTodos();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <TodoForm
            todos={filteredTodos}
            onAddTodo={addTodo}
            handleError={setErrorMessage}
          />
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList todos={filteredTodos} />
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && <Footer onFilter={setFilter} />}
      </div>

      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

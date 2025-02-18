import { useEffect, useState, FC } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
// eslint-disable-next-line max-len
import { Notification } from './components/Notification/Notification';
import { TodoList } from './components/TodoList/TodoList';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setFilteredTodos(todosFromServer);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <Footer todos={todos} onFilterSelect={setFilteredTodos} />
        )}
      </div>

      <Notification errorMessage={errorMessage} />
    </div>
  );
};

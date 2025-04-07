import React, { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorMessage, Filterby, Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer/Footer';
import { ErrorModal } from './components/ErrorModal/ErrorModal';

const filter = (todos: Todo[], filterBy: Filterby) => {
  switch (filterBy) {
    case Filterby.ACTIVE:
      return todos.filter(todo => !todo.completed);
    case Filterby.COMPLETED:
      return todos.filter(todo => todo.completed);
    case Filterby.ALL:
    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(ErrorMessage.NONE);
  const [filterBy, setFilterBy] = useState(Filterby.ALL);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        setError(ErrorMessage.LOAD);
      });
  }, []);

  const filteredTodos = filter(todos, filterBy);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        <TodoList todos={filteredTodos} />
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer todos={todos} filterBy={filterBy} setFilterBy={setFilterBy} />
        )}
      </div>
      <ErrorModal
        errorMessage={error}
        onClearError={() => setError(ErrorMessage.NONE)}
      />
    </div>
  );
};

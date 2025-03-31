/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Errors } from './types/Errors';
import { Footer } from './components/Footer';
import { ErrorModal } from './components/ErrorModal';
import { FilterBy } from './types/FilterBy';

const filter = (todos: Todo[], filterBy: FilterBy) => {
  switch (filterBy) {
    case FilterBy.Active:
      return todos.filter(todo => !todo.completed);
    case FilterBy.Completed:
      return todos.filter(todo => todo.completed);
    case FilterBy.All:
    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState(Errors.DEFAULT);
  const [filterBy, setFilterBy] = useState(FilterBy.All);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        setErrorMessage(Errors.LOAD);
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
        errorMessage={errorMessage}
        onClearError={() => setErrorMessage(Errors.DEFAULT)}
      />
    </div>
  );
};

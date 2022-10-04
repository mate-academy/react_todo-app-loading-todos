/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  // useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
// import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { Error } from './components/Errors/Error';

import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<Filter>(Filter.All);
  const [error, setError] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const newTodoField = useRef<HTMLInputElement>(null);
  // const user = useContext(AuthContext);

  // useEffect(() => {
  //   // focus the element with `ref={newTodoField}`
  //   if (newTodoField.current) {
  //     newTodoField.current.focus();
  //   }
  // }, []);

  useEffect(() => {
    getTodos(5)
      .then(response => setTodos(response))
      .catch(() => setError(true));
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filterBy) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return todos;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      {todos && (
        <div className="todoapp__content">
          <Header newTodoField={newTodoField} />
          <TodoList todos={todos} />
          <Footer
            todos={filteredTodos}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
          />
        </div>
      )}
      <Error error={error} setError={setError} />
    </div>
  );
};

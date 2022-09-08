/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import { useLocation } from 'react-router-dom';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Notification } from './components/Notification';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[] | []>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const location = useLocation();

  const parthName = location.pathname;

  useEffect(() => {
    if (user) {
      getTodos(user?.id)
        .then(setTodos);
    }
  }, []);

  useEffect(() => {
    switch (parthName) {
      case '/':
        setVisibleTodos(todos);
        break;
      case '/active':
        setVisibleTodos(todos.filter(todo => !todo.completed));
        break;
      case '/completed':
        setVisibleTodos(todos.filter(todo => todo.completed));
        break;
      default:
    }
  }, [parthName, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {
          todos.length > 0
            ? (
              <>
                <section className="todoapp__main" data-cy="TodoList">
                  <TodoList todos={visibleTodos} />
                </section>
                <Footer countItem={todos.filter(el => !el.completed).length} />
              </>
            )
            : null
        }
      </div>
      <Notification error="ErrorAdd" />
    </div>
  );
};

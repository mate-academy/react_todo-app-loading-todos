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
  const [openerNotification, setOpenerNotification] = useState<boolean>(true);
  const [textError, setTextError] = useState<string>('');
  const [typeError, setTypeError] = useState<string>('');

  let visibleTodos = [...todos];

  const user = useContext(AuthContext);
  const location = useLocation();

  const parthName = location.pathname;

  // для запуска Notification
  const toggleError = (state: boolean, text: string, type: string) => {
    setOpenerNotification(state);
    setTextError(text);
    setTypeError(type);
    setTimeout(() => {
      setOpenerNotification(true);
    }, 3000);
  };

  const setNotification = (state: boolean) => {
    setOpenerNotification(state);
  };

  useEffect(() => {
    if (user) {
      getTodos(user?.id)
        .then(setTodos);
    }

    toggleError(false, 'TestError', 'error');
  }, []);

  switch (parthName) {
    case '/':
      visibleTodos = [...todos];
      break;
    case '/active':
      visibleTodos = todos.filter(todo => !todo.completed);
      break;
    case '/completed':
      visibleTodos = todos.filter(todo => todo.completed);
      break;
    default:
  }

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
      <Notification
        testError={textError}
        typeError={typeError}
        setNotification={setNotification}
        stateError={openerNotification}
      />
    </div>
  );
};

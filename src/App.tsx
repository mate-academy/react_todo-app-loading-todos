/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Error } from './components/Error/Error';
import { Footer } from './components/Footer/Footer';
import { Todos } from './components/Todos/Todos';
import { AddTodos } from './components/AddToDo/AddToDo';
import { DoUnDoAll } from './components/DoUnDoAll/DoUnDoAll';

export const App: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState<Record<number, boolean>>({});
  const [errorMesage, setErrorMesage] = useState<string>('');
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    getTodos()
      .then(response => {
        setTimeout(() => {
          setTodos(response);
          setCounter(response.length);
          localStorage.setItem('todosStorage', JSON.stringify(response));
        }, 300);
      })
      .catch(() => {
        setErrorMesage('Unable to load todos');
        setTimeout(() => {
          setErrorMesage('');
        }, 300);
      });
  }, []);

  const handleLoading = (id: number, state: boolean) => {
    setTimeout(() => {
      setLoader(prev => ({ ...prev, [id]: false }));
    }, 500);
    setLoader(prev => ({ ...prev, [id]: state }));
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <DoUnDoAll todos={todos} setTodos={setTodos} />
          {/* Add a todo on form submit */}
          <AddTodos
            value={value}
            setValue={setValue}
            handleLoading={handleLoading}
            setErrorMesage={setErrorMesage}
            setTodos={setTodos}
          />
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {todos.map(todo => {
            return (
              <Todos
                key={todo.id}
                todo={todo}
                handleLoading={handleLoading}
                setTodos={setTodos}
                setErrorMesage={setErrorMesage}
                loader={loader}
              />
            );
          })}
        </section>

        {/* Hide the footer if there are no todos */}
        {counter > 0 && (
          <Footer setTodos={setTodos} todos={todos} setCounter={setCounter} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <Error setErrorMesage={setErrorMesage} errorMesage={errorMesage} />
    </div>
  );
};

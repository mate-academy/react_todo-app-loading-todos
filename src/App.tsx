/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header/Header';
import { Filters } from './components/Filters/Filters';
import { Footer } from './components/Footer/Footer';
import { Errors } from './components/Errors/Errors';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {`if length more then 0 => show <TodoList /> and <Footer />`}
      </div>

      {errorMessage && (
        // create new todos => catch the error => and set it
        // new useState for errors
        <Errors
        // errorMessage and set matched text on click
        />
      )}
    </div>
    </div>
  );
};

/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { FormTodo } from './component/FormTodo/FormTodo';
import { MainTodo } from './component/MainTodo/MainTodo';
import { Footer } from './component/Footer/Footer';
import { Error } from './component/Error/Error';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterByWords } from './types/enums';

const USER_ID = 10599;

export const App: React.FC = () => {
  const [formValue, setFormValue] = useState<Todo[]>([]);
  const [sortArray, setFilterHandler] = useState(FilterByWords.All);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setFormValue)
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  let copyTodoArray = formValue;

  switch (sortArray) {
    case FilterByWords.All:
      copyTodoArray = formValue;
      break;
    case FilterByWords.Active:
      copyTodoArray = copyTodoArray.filter((elem) => !elem.completed);
      break;
    case FilterByWords.Completed:
      copyTodoArray = copyTodoArray.filter((elem) => elem.completed);
      break;
    default:
      break;
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <FormTodo />

        <MainTodo formValue={copyTodoArray} />
        <footer className="todoapp__footer">
          <Footer
            setFilterHandler={setFilterHandler}
            TodoCounter={copyTodoArray.length}
          />
        </footer>
      </div>

      <Error error={error} />
    </div>
  );
};

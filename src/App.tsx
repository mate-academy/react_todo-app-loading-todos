/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { useEffect } from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Filter } from './types/Filters';

import classNames from 'classnames';

type Error = {
  isError: boolean;
  errorMessage: string;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('All');
  const [error, setError] = useState<Error>({
    isError: false,
    errorMessage: '',
  });

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const response = await getTodos();

        if (!response) {
          throw new Error('Error 404');
        }

        setTodos(response);
      } catch (err) {
        setError({
          isError: true,
          errorMessage: 'Unable to load todos',
        });
      } finally {
        setTimeout(() => {
          setError({
            isError: false,
            errorMessage: '',
          });
        }, 3000);
      }
    };

    loadTodos();
  }, []);

  const filteredTodos = () => {
    let copyTodos = [...todos];

    switch (filter) {
      case 'Active':
        copyTodos = copyTodos.filter(item => !item.completed);
        break;
      case 'Completed':
        copyTodos = copyTodos.filter(item => item.completed);
        break;
      default:
        break;
    }

    return copyTodos;
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList todos={filteredTodos()} />
        {todos.length > 0 && <Footer todos={todos} filter={filter} setFilter={setFilter} />}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !error.isError,
          },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {error.errorMessage}
      </div>
    </div>
  );
};

//         {/* This todo is being edited */}
//         <div data-cy="Todo" className="todo">
//           <label className="todo__status-label">
//             <input
//               data-cy="TodoStatus"
//               type="checkbox"
//               className="todo__status"
//             />
//           </label>

//           {/* This form is shown instead of the title and remove button */}
//           <form>
//             <input
//               data-cy="TodoTitleField"
//               type="text"
//               className="todo__title-field"
//               placeholder="Empty todo will be deleted"
//               value="Todo is being edited now"
//             />
//           </form>

//           <div data-cy="TodoLoader" className="modal overlay">
//             <div className="modal-background has-background-white-ter" />
//             <div className="loader" />
//           </div>
//         </div>

//         {/* This todo is in loadind state */}
//         <div data-cy="Todo" className="todo">
//           <label className="todo__status-label">
//             <input
//               data-cy="TodoStatus"
//               type="checkbox"
//               className="todo__status"
//             />
//           </label>

//           <span data-cy="TodoTitle" className="todo__title">
//             Todo is being saved now
//           </span>

//           <button type="button" className="todo__remove" data-cy="TodoDelete">
//             ×
//           </button>

//           {/* 'is-active' class puts this modal on top of the todo */}
//           <div data-cy="TodoLoader" className="modal overlay is-active">
//             <div className="modal-background has-background-white-ter" />
//             <div className="loader" />
//           </div>
//         </div>

//       Unable to load todos
//       Title should not be empty
//       Unable to add a todo
//       Unable to delete a todo
//       Unable to update a todo

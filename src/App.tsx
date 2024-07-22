/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
// import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Actions } from './types/Actions';
import { HeaderTodos } from './components/HeaderTodos';
import { ListOfTodos } from './components/ListOfTodos';
import { FooterTodos } from './components/FooterTodos';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [showNotification, setShowNotification] = useState(true);
  const [filterActions, setFilterActions] = useState<Actions>(Actions.ALL);
  const timeoutId = useRef<number | null>(null);

  // if (!USER_ID) {
  //   return <UserWarning />;
  // }

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .catch(() => {
        setShowNotification(false);
        setError('Unable to load todos');
        timeoutId.current = window.setTimeout(() => {
          setShowNotification(true);
        }, 3000);
      });

    return () => {
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const checkCompleted = todos?.every(todo => todo.completed === true);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <HeaderTodos checkCompleted={checkCompleted} />

        <ListOfTodos todos={todos} actions={filterActions} />

        <FooterTodos todos={todos} handleAction={setFilterActions} />
      </div>

      <ErrorNotification
        showNotification={showNotification}
        errorMessage={error}
        deleteNotification={setShowNotification}
      />
    </div>
  );
};

{
  /* This todo is an active todo */
}

{
  /* <div data-cy="Todo" className="todo">
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                Not Completed Todo
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div> */
}

{
  /* This todo is being edited */
}

{
  /* <div data-cy="Todo" className="todo">
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                />
              </label>

              {/* This form is shown instead of the title and remove button */
}

{
  /* <form>
                <input
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value="Todo is being edited now"
                />
              </form> */
}

{
  /* <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div> */
}

{
  /* This todo is in loadind state */
}

{
  /* // <div data-cy="Todo" className="todo">
            //   <label className="todo__status-label">
            //     <input
            //       data-cy="TodoStatus"
            //       type="checkbox"
            //       className="todo__status"
            //     />
            //   </label> */
}

{
  /* //   <span data-cy="TodoTitle" className="todo__title">
            //     Todo is being saved now
            //   </span>

            //   <button
            //     type="button"
            //     className="todo__remove"
            //     data-cy="TodoDelete"
            //   >
            //     ×
            //   </button>

            //   {/* 'is-active' class puts this modal on top of the todo */
}
//   <div data-cy="TodoLoader" className="modal overlay is-active">
//     <div className="modal-background has-background-white-ter" />
//     <div className="loader" />
//   </div>
// </div> */}

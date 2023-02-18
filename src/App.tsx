/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';
import { SortType } from './types/SortType';
import { prepareTodos } from './utils/prepareTodos';

const USER_ID = 6358;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [sortType, setSortType] = useState(SortType.ALL);

  const isTodos = todos.length !== 0;
  const isActiveTodos = todos.filter(todo => !todo.completed).length;
  const autoCloseNotification = () => {
    setHasError(false);
  };

  const fetchedTodos = async () => {
    try {
      setHasError(false);
      const data = await getTodos(USER_ID);

      setTodos(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setHasError(true);
      setTimeout(autoCloseNotification, 3000);
    }
  };

  useEffect(() => {
    fetchedTodos();
  }, []);

  const handleSortTodos = useCallback((sort: SortType) => {
    setSortType(sort);
  }, []);

  const handleCloseNotification = useCallback(() => {
    setHasError(false);
  }, []);

  const visibleTodos = useMemo(() => (
    prepareTodos(todos, sortType)
  ), [todos, sortType]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header />

        {/* <section className="todoapp__main"> */}
        <TodoList todos={visibleTodos} />

        {/*  /!* This is a completed todo *!/ */}
        {/*  <div className="todo completed"> */}
        {/*    <label className="todo__status-label"> */}
        {/*      <input */}
        {/*        type="checkbox" */}
        {/*        className="todo__status" */}
        {/*        checked */}
        {/*      /> */}
        {/*    </label> */}

        {/*    <span className="todo__title">Completed Todo</span> */}

        {/*    /!* Remove button appears only on hover *!/ */}
        {/*    <button type="button" className="todo__remove">×</button> */}

        {/*    /!* overlay will cover the todo while it is being updated *!/ */}
        {/*    <div className="modal overlay"> */}
        {/*      <div className="modal-background has-background-white-ter" /> */}
        {/*      <div className="loader" /> */}
        {/*    </div> */}
        {/*  </div> */}

        {/*  /!* This todo is not completed *!/ */}
        {/*  <div className="todo"> */}
        {/*    <label className="todo__status-label"> */}
        {/*      <input */}
        {/*        type="checkbox" */}
        {/*        className="todo__status" */}
        {/*      /> */}
        {/*    </label> */}

        {/*    <span className="todo__title">Not Completed Todo</span> */}
        {/*    <button type="button" className="todo__remove">×</button> */}

        {/*    <div className="modal overlay"> */}
        {/*      <div className="modal-background has-background-white-ter" /> */}
        {/*      <div className="loader" /> */}
        {/*    </div> */}
        {/*  </div> */}

        {/*  /!* This todo is being edited *!/ */}
        {/*  <div className="todo"> */}
        {/*    <label className="todo__status-label"> */}
        {/*      <input */}
        {/*        type="checkbox" */}
        {/*        className="todo__status" */}
        {/*      /> */}
        {/*    </label> */}

        {/*    /!* This form is shown instead of the title and remove button *!/ */}
        {/*    <form> */}
        {/*      <input */}
        {/*        type="text" */}
        {/*        className="todo__title-field" */}
        {/*        placeholder="Empty todo will be deleted" */}
        {/*        value="Todo is being edited now" */}
        {/*      /> */}
        {/*    </form> */}

        {/*    <div className="modal overlay"> */}
        {/*      <div className="modal-background has-background-white-ter" /> */}
        {/*      <div className="loader" /> */}
        {/*    </div> */}
        {/*  </div> */}

        {/*  /!* This todo is in loadind state *!/ */}
        {/*  <div className="todo"> */}
        {/*    <label className="todo__status-label"> */}
        {/*      <input type="checkbox" className="todo__status" /> */}
        {/*    </label> */}

        {/*    <span className="todo__title">Todo is being saved now</span> */}
        {/*    <button type="button" className="todo__remove">×</button> */}

        {/*    /!* 'is-active' class puts this modal on top of the todo *!/ */}
        {/*    <div className="modal overlay is-active"> */}
        {/*      <div className="modal-background has-background-white-ter" /> */}
        {/*      <div className="loader" /> */}
        {/*    </div> */}
        {/*  </div> */}
        {/* </section> */}

        {/* Hide the footer if there are no todos */}

        {isTodos && (
          <Footer
            isTodos={isActiveTodos}
            onSort={handleSortTodos}
            sortType={sortType}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {hasError && (
        <Notification
          hasError={hasError}
          onCloseNotification={handleCloseNotification}
        />
      )}
    </div>
  );
};

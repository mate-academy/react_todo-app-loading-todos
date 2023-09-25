/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Filter, Todo, ErrorMessegeEnum } from './types/Todo';
import { client } from './utils/fetchClient';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorBin } from './components/ErrorBin/ErrorBin';
import { getTodos } from './api/todos';

const USER_ID = 11572;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [filter, setFilter] = useState<Filter>('All');
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editIsLoading, setEditIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    getTodos(USER_ID)
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
        setErrorMessage(ErrorMessegeEnum.noTodos);

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const displayedTodos = () => {
    let filteredTodos = [...todos];

    filteredTodos = filteredTodos.filter(todo => {
      if (filter === 'Active' && todo.completed) {
        return false;
      }

      if (filter === 'Completed' && !todo.completed) {
        return false;
      }

      return true;
    });

    return filteredTodos;
  };

  const handleDoubleClick = (todo: Todo) => {
    setEditTodo(todo);
    setEditTitle(todo.title);
    console.log(`Todo "${todo.title}" was double-clicked`);
  };

  const handleCompletedStatus = (todo: Todo) => {
    const url = `/todos/${todo.id}`;
    const updatedData = { completed: !todo.completed };

    setEditIsLoading(true);

    client.patch(url, updatedData)
      .then((response) => {
        console.log(`Todo with ID ${todo.id} updated successfully:`, response);
      })
      .catch(error => {
        console.error(`Error updating todo with ID ${todo.id}:`, error);
        setErrorMessage(ErrorMessegeEnum.noUpdateTodo);

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => setEditIsLoading(false));
  };

  const handleToggleAll = () => {
    if (todos.some(todo => !todo.completed)) {
      todos.forEach(
        (todo) => {
          const url = `/todos/${todo.id}`;

          client.patch(url, { completed: true })
            .then(() => {
              setEditIsLoading(true);
            })
            .catch(error => {
              console.error(`Error updating todo with ID ${todo.id}:`, error);
              setErrorMessage(ErrorMessegeEnum.noUpdateTodo);

              setTimeout(() => {
                setErrorMessage('');
              }, 3000);
            })
            .finally(() => setEditIsLoading(false));
        },
      );
    } else {
      todos.forEach(handleCompletedStatus);
    }
  };

  const handleDelete = (todo: Todo) => {
    const url = `/todos/${todo.id}`;

    client.delete(url).then(() => {
      console.log(`Todo with ID ${todo.id} deleted successfully`);
    })
      .catch(error => {
        console.error(`Error deleting todo with ID ${todo.id}:`, error);
        setErrorMessage(ErrorMessegeEnum.noDeleteTodo);

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  };

  const handleEditTodo: React.ChangeEventHandler<HTMLInputElement>
  = (event) => {
    setEditTitle(event.target.value);
  };

  const handleFormSubmitEdited
  = (event: React.FormEvent<HTMLFormElement>, todo: Todo) => {
    event.preventDefault();
    const url = `/todos/${todo.id}`;
    const updatedData = { title: editTitle.trim() };

    setEditIsLoading(true);

    if (!editTitle.trim()) {
      handleDelete(todo);
    }

    client.patch(url, updatedData)
      .then(response => {
        console.log(`Todo with ID ${todo.id} updated successfully:`, response);
      })
      .catch(error => {
        console.error(`Error updating todo with ID ${todo.id}:`, error);
        setErrorMessage(ErrorMessegeEnum.noUpdateTodo);

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => setEditIsLoading(false));

    setEditTodo(null);
  };

  const handleNewTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTodoTitle.trim()) {
      setErrorMessage(ErrorMessegeEnum.emptyTitle);

      setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return;
    }

    const newTodoId: number = Date.now();

    const newTodo = {
      id: newTodoId,
      userId: USER_ID,
      title: newTodoTitle.trim(),
      completed: false,
    };

    client.post('/todos', newTodo).then((response) => {
      console.log('New todo created:', response);
      setNewTodoTitle('');
    })
      .catch(error => {
        console.error(`Error deleting todo with ID ${newTodoId}:`, error);
        setErrorMessage(ErrorMessegeEnum.noDeleteTodo);

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  };

  const handleClearCompleted = () => {
    todos.forEach(todo => {
      const url = `/todos/${todo.id}`;

      if (todo.completed) {
        return client.delete(url).then(() => {
          console.log(`Todo with ID ${todo.id} deleted successfully`);
        })
          .catch(error => {
            console.error(`Error deleting todo with ID ${todo.id}:`, error);
            setErrorMessage(ErrorMessegeEnum.noDeleteTodo);

            setTimeout(() => {
              setErrorMessage('');
            }, 3000);
          });
      }

      return todo;
    });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          handleToggleAll={handleToggleAll}
          handleNewTodoSubmit={handleNewTodoSubmit}
          newTodoTitle={newTodoTitle}
          setNewTodoTitle={setNewTodoTitle}
        />

        <TodoList
          displayedTodos={displayedTodos}
          editTodo={editTodo}
          editIsLoading={editIsLoading}
          editTitle={editTitle}
          handleDoubleClick={handleDoubleClick}
          handleDelete={handleDelete}
          handleCompletedStatus={handleCompletedStatus}
          handleFormSubmitEdited={handleFormSubmitEdited}
          handleEditTodo={handleEditTodo}
        />

        {/* Hide the footer if there are no todos */}
        {todos && (
          <Footer
            todos={todos}
            filter={filter}
            setFilter={setFilter}
            handleClearCompleted={handleClearCompleted}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMessage && (
        <ErrorBin
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

//  {/* This is a completed todo */}
//  <div data-cy="Todo" className="todo completed">
//  <label className="todo__status-label">
//    <input
//      data-cy="TodoStatus"
//      type="checkbox"
//      className="todo__status"
//      checked
//    />
//  </label>

//  <span data-cy="TodoTitle" className="todo__title">
//    Completed Todo
//  </span>

//  {/* Remove button appears only on hover */}
//  <button type="button" className="todo__remove" data-cy="TodoDelete">
//    ×
//  </button>

//  {/* overlay will cover the todo while it is being updated */}
//  <div data-cy="TodoLoader" className="modal overlay">
//    <div className="modal-background has-background-white-ter" />
//    <div className="loader" />
//  </div>
// </div>

// {/* This todo is not completed */}
// <div data-cy="Todo" className="todo">
//  <label className="todo__status-label">
//    <input
//      data-cy="TodoStatus"
//      type="checkbox"
//      className="todo__status"
//    />
//  </label>

//  <span data-cy="TodoTitle" className="todo__title">
//    Not Completed Todo
//  </span>
//  <button type="button" className="todo__remove" data-cy="TodoDelete">
//    ×
//  </button>

//  <div data-cy="TodoLoader" className="modal overlay">
//    <div className="modal-background has-background-white-ter" />
//    <div className="loader" />
//  </div>
// </div>

// {/* This todo is being edited */}
// <div data-cy="Todo" className="todo">
//  <label className="todo__status-label">
//    <input
//      data-cy="TodoStatus"
//      type="checkbox"
//      className="todo__status"
//    />
//  </label>

//  {/* This form is shown instead of the title and remove button */}
//  <form>
//    <input
//      data-cy="TodoTitleField"
//      type="text"
//      className="todo__title-field"
//      placeholder="Empty todo will be deleted"
//      value="Todo is being edited now"
//    />
//  </form>

//  <div data-cy="TodoLoader" className="modal overlay">
//    <div className="modal-background has-background-white-ter" />
//    <div className="loader" />
//  </div>
// </div>

// {/* This todo is in loadind state */}
// <div data-cy="Todo" className="todo">
//  <label className="todo__status-label">
//    <input
//      data-cy="TodoStatus"
//      type="checkbox"
//      className="todo__status"
//    />
//  </label>

//  <span data-cy="TodoTitle" className="todo__title">
//    Todo is being saved now
//  </span>

//  <button type="button" className="todo__remove" data-cy="TodoDelete">
//    ×
//  </button>

//  {/* 'is-active' class puts this modal on top of the todo */}
//  <div data-cy="TodoLoader" className="modal overlay is-active">
//    <div className="modal-background has-background-white-ter" />
//    <div className="loader" />
//  </div>
// </div>

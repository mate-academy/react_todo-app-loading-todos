/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
// import React from 'react';
// import { UserWarning } from './UserWarning';
// import { USER_ID } from './api/todos';

// export const App: React.FC = () => {
//   if (!USER_ID) {
//     return <UserWarning />;
//   }

//   return (
//     <div className="todoapp">
//       <h1 className="todoapp__title">todos</h1>

//       <div className="todoapp__content">
//         <header className="todoapp__header">
//           {/* this button should have `active` class only if all todos are completed */}
//           <button
//             type="button"
//             className="todoapp__toggle-all active"
//             data-cy="ToggleAllButton"
//           />

//           {/* Add a todo on form submit */}
//           <form>
//             <input
//               data-cy="NewTodoField"
//               type="text"
//               className="todoapp__new-todo"
//               placeholder="What needs to be done?"
//             />
//           </form>
//         </header>

//         <section className="todoapp__main" data-cy="TodoList">
//           {/* This is a completed todo */}
//           <div data-cy="Todo" className="todo completed">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//                 checked
//               />
//             </label>

//             <span data-cy="TodoTitle" className="todo__title">
//               Completed Todo
//             </span>

//             {/* Remove button appears only on hover */}
//             <button type="button" className="todo__remove" data-cy="TodoDelete">
//               ×
//             </button>

//             {/* overlay will cover the todo while it is being deleted or updated */}
//             <div data-cy="TodoLoader" className="modal overlay">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>

//           {/* This todo is an active todo */}
//           <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label>

//             <span data-cy="TodoTitle" className="todo__title">
//               Not Completed Todo
//             </span>
//             <button type="button" className="todo__remove" data-cy="TodoDelete">
//               ×
//             </button>

//             <div data-cy="TodoLoader" className="modal overlay">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>

//           {/* This todo is being edited */}
//           <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label>

//             {/* This form is shown instead of the title and remove button */}
//             <form>
//               <input
//                 data-cy="TodoTitleField"
//                 type="text"
//                 className="todo__title-field"
//                 placeholder="Empty todo will be deleted"
//                 value="Todo is being edited now"
//               />
//             </form>

//             <div data-cy="TodoLoader" className="modal overlay">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>

//           {/* This todo is in loadind state */}
//           <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label>

//             <span data-cy="TodoTitle" className="todo__title">
//               Todo is being saved now
//             </span>

//             <button type="button" className="todo__remove" data-cy="TodoDelete">
//               ×
//             </button>

//             {/* 'is-active' class puts this modal on top of the todo */}
//             <div data-cy="TodoLoader" className="modal overlay is-active">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>
//         </section>

//         {/* Hide the footer if there are no todos */}
//         <footer className="todoapp__footer" data-cy="Footer">
//           <span className="todo-count" data-cy="TodosCounter">
//             3 items left
//           </span>

//           {/* Active link should have the 'selected' class */}
//           <nav className="filter" data-cy="Filter">
//             <a
//               href="#/"
//               className="filter__link selected"
//               data-cy="FilterLinkAll"
//             >
//               All
//             </a>

//             <a
//               href="#/active"
//               className="filter__link"
//               data-cy="FilterLinkActive"
//             >
//               Active
//             </a>

//             <a
//               href="#/completed"
//               className="filter__link"
//               data-cy="FilterLinkCompleted"
//             >
//               Completed
//             </a>
//           </nav>

//           {/* this button should be disabled if there are no completed todos */}
//           <button
//             type="button"
//             className="todoapp__clear-completed"
//             data-cy="ClearCompletedButton"
//           >
//             Clear completed
//           </button>
//         </footer>
//       </div>

//       {/* DON'T use conditional rendering to hide the notification */}
//       {/* Add the 'hidden' class to hide the message smoothly */}
//       <div
//         data-cy="ErrorNotification"
//         className="notification is-danger is-light has-text-weight-normal"
//       >
//         <button data-cy="HideErrorButton" type="button" className="delete" />
//         {/* show only one message at a time */}
//         Unable to load todos
//         <br />
//         Title should not be empty
//         <br />
//         Unable to add a todo
//         <br />
//         Unable to delete a todo
//         <br />
//         Unable to update a todo
//       </div>
//     </div>
//   );
// };

// import React, { useState, useEffect } from 'react';
// import { TodoList } from './components/TodoList';
// import { Footer } from './components/Footer';
// import { Header } from './components/Header';
// import { Notifications } from './components/Notifications';
// import { getTodos, addTodo, deleteTodo, updateTodo, USER_ID } from './api/todos';
// import { Todo } from './types/Todo';

// export const App: React.FC = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
//   const [isLoading, setIsLoading] = useState(false);
//   const [newTodoTitle, setNewTodoTitle] = useState('');

//   useEffect(() => {
//     const loadTodos = async () => {
//       try {
//         const todos = await getTodos();
//         setTodos(todos);
//       } catch {
//         setError('Failed to load todos');
//       }
//     };
//     loadTodos();
//   }, []);

//   const handleAddTodo = async (title: string) => {
//     if (!title.trim()) return;
//     try {
//       setIsLoading(true);
//       const newTodo = await addTodo({ title, userId: USER_ID });
//       setTodos(prevTodos => [...prevTodos, newTodo]);
//       setNewTodoTitle('');
//     } catch {
//       setError('Failed to add todo');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteTodo = async (todoId: number) => {
//     try {
//       setIsLoading(true);
//       await deleteTodo(todoId);
//       setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
//     } catch {
//       setError('Failed to delete todo');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleToggleTodo = async (todo: Todo) => {
//     try {
//       setIsLoading(true);
//       const updatedTodo = await updateTodo(todo.id, { completed: !todo.completed });
//       setTodos(prevTodos => prevTodos.map(t => (t.id === todo.id ? updatedTodo : t)));
//     } catch {
//       setError('Failed to update todo');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filteredTodos = todos.filter(todo => {
//     if (filter === 'active') return !todo.completed;
//     if (filter === 'completed') return todo.completed;
//     return true;
//   });

//   return (
//     <div className="app">
//       <Header onAddTodo={handleAddTodo} />
//       {error && <Notifications message={error} onClose={() => setError(null)} />}
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleAddTodo(newTodoTitle);
//         }}
//       >
//         <input
//           type="text"
//           value={newTodoTitle}
//           onChange={e => setNewTodoTitle(e.target.value)}
//           placeholder="What needs to be done?"
//           autoFocus
//         />
//         <button type="submit" disabled={isLoading}>Add</button>
//       </form>
//       <TodoList
//         todos={filteredTodos}
//         onDeleteTodo={handleDeleteTodo}
//         onToggleTodo={handleToggleTodo}
//         isLoading={isLoading}
//       />
//       <Footer filter={filter} setFilter={setFilter} />
//     </div>
//   );
// };

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  USER_ID,
} from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';
import { Notifications } from './components/Notifications';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [filtered, setFiltered] = useState<Todo[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      try {
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);
        setFiltered(fetchedTodos);
      } catch (er) {
        setError('Unable to load todos');
        setTimeout(() => setError(null), 3000);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTodoTitle.trim()) {
      return;
    }

    setLoading(true);
    try {
      const newTodo = await addTodo({
        title: newTodoTitle,
        userId: USER_ID,
        completed: false,
      });

      setTodos([...todos, newTodo]);
      setNewTodoTitle('');
    } catch (er) {
      setError('Unable to add a todo');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTodo = async (todoId: number, data: Partial<Todo>) => {
    setLoading(true);
    try {
      const updatedTodo = await updateTodo(todoId, data);

      setTodos(todos.map(todo => (todo.id === todoId ? updatedTodo : todo)));
    } catch (e) {
      setError('Unable to update a todo');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    setLoading(true);
    try {
      await deleteTodo(todoId);
      setTodos(todos.filter(todo => todo.id !== todoId));
    } catch (er) {
      setError('Unable to delete a todo');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  // const handleToggleTodo = async (todo: Todo) => {
  //   setLoading(true);
  //   try {
  //     const updatedTodo = await updateTodo(todo.id, { completed: !todo.completed });
  //     setTodos(prevTodos => prevTodos.map(t => (t.id === todo.id ? updatedTodo : t)));
  //   } catch {
  //     setError('Failed to update todo');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleAllToggleTodo = () => {
    const areAllCompleted = todos.every(todo => todo.completed);
    const updatedTodo = todos.map(todo => ({
      ...todo,
      completed: !areAllCompleted,
    }));

    setTodos(updatedTodo);
  };

  useEffect(() => {
    const filteredTodos = todos.filter(todo => {
      if (filter === 'active') {
        return !todo.completed;
      }

      if (filter === 'completed') {
        return todo.completed;
      }

      return filter === 'all';
    });

    setFiltered(filteredTodos);
  }, [filter, todos]);

  const handleClearCompleted = () => {
    const completedTodos = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    completedTodos.forEach(async id => {
      await deleteTodo(id);
    });

    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          title={newTodoTitle}
          setTitle={setNewTodoTitle}
          todos={todos}
          onChange={handleAllToggleTodo}
          onAddTodo={handleAddTodo}
        />

        <TodoList
          loading={loading}
          todos={filtered}
          onDeleteTodo={handleDeleteTodo}
          onUpdateTodo={handleUpdateTodo}
        />

        {todos.length > 0 && (
          <Footer
            todos={todos}
            filter={filter}
            setFilter={setFilter}
            onClick={handleClearCompleted}
          />
        )}
      </div>
      {/* Add the 'hidden' class to hide the message smoothly */}

      <Notifications errorMessage={error} onClose={() => setError(null)} />
    </div>
  );
};

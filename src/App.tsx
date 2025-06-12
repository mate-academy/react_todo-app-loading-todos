// import React, { useEffect, useState } from 'react';
// import { UserWarning } from './UserWarning';
// import {
//   getTodos,
//   addTodo,
//   updateTodo,
//   deleteTodo,
//   USER_ID,
// } from './api/todos';
// import { Todo } from './types/todo/Todo';

// type Filter = 'all' | 'active' | 'completed';

// export const App: React.FC = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [newTodoTitle, setNewTodoTitle] = useState('');
//   const [showError, setShowError] = useState(false);
//   const [filter, setFilter] = useState<Filter>('all');

//   useEffect(() => {
//     setIsLoading(true);
//     setError('');
//     setShowError(false);

//     getTodos()
//       .then(fetchedTodos => setTodos(fetchedTodos))
//       .catch(() => {
//         setError('Unable to load todos');
//         setShowError(true);
//       })
//       .finally(() => setIsLoading(false));
//   }, []);

//   useEffect(() => {
//     if (showError) {
//       const timer = setTimeout(() => {
//         setShowError(false);
//         setError('');
//       }, 3000);

//       return () => clearTimeout(timer);
//     }

//     return undefined;
//   }, [showError]);

//   if (!USER_ID) {
//     return <UserWarning />;
//   }

//   const handleNewTodoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!newTodoTitle.trim()) {
//       setError('Title should not be empty');

//       return;
//     }

//     setError('');
//     setIsLoading(true);
//     try {
//       const newTodoData = {
//         userId: USER_ID,
//         title: newTodoTitle.trim(),
//         completed: false,
//       };
//       const response = await addTodo(newTodoData);

//       setTodos(prev => [...prev, response]);
//       setNewTodoTitle('');
//     } catch {
//       setError('Unable to add a todo');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleTodoCompleted = async (todo: Todo) => {
//     setIsLoading(true);
//     setError('');
//     try {
//       const updated = await updateTodo(todo.id, { completed: !todo.completed });

//       setTodos(prev => prev.map(t => (t.id === todo.id ? updated : t)));
//     } catch {
//       setError('Unable to update a todo');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const removeTodo = async (id: number) => {
//     setIsLoading(true);
//     setError('');
//     try {
//       await deleteTodo(id);
//       setTodos(prev => prev.filter(t => t.id !== id));
//     } catch {
//       setError('Unable to delete a todo');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const clearCompleted = async () => {
//     setIsLoading(true);
//     setError('');
//     try {
//       const completedTodos = todos.filter(t => t.completed);

//       for (const todo of completedTodos) {
//         await deleteTodo(todo.id);
//       }

//       setTodos(prev => prev.filter(t => !t.completed));
//     } catch {
//       setError('Unable to clear completed todos');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const activeCount = todos.filter(t => !t.completed).length;
//   const allCompleted = todos.length > 0 && todos.every(t => t.completed);

//   const filteredTodos = todos.filter(todo => {
//     if (filter === 'active') {
//       return !todo.completed;
//     }

//     if (filter === 'completed') {
//       return todo.completed;
//     }

//     return true;
//   });

//   return (
//     <div className="todoapp">
//       <h1 className="todoapp__title">todos</h1>

//       <div className="todoapp__content">
//         <header className="todoapp__header">
//           <button
//             type="button"
//             className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
//             data-cy="ToggleAllButton"
//             onClick={() => {
//               const shouldCompleteAll = !allCompleted;

//               setIsLoading(true);
//               setError('');
//               Promise.all(
//                 todos.map(todo =>
//                   updateTodo(todo.id, { completed: shouldCompleteAll }),
//                 ),
//               )
//                 .then(updatedTodos => setTodos(updatedTodos))
//                 .catch(() => setError('Unable to update todos'))
//                 .finally(() => setIsLoading(false));
//             }}
//             disabled={isLoading || todos.length === 0}
//           />

//           <form onSubmit={handleNewTodoSubmit}>
//             <input
//               data-cy="NewTodoField"
//               type="text"
//               className="todoapp__new-todo"
//               placeholder="What needs to be done?"
//               value={newTodoTitle}
//               onChange={e => setNewTodoTitle(e.target.value)}
//               disabled={isLoading}
//             />
//           </form>
//         </header>

//         <section
//           className="todoapp__main"
//           data-cy="TodoList"
//           style={{ display: todos.length === 0 ? 'none' : 'block' }}
//         >
//           {filteredTodos.map(todo => (
//             <div
//               key={todo.id}
//               data-cy="Todo"
//               className={`todo ${todo.completed ? 'completed' : ''}`}
//             >
//               <label className="todo__status-label">
//                 <input
//                   data-cy="TodoStatus"
//                   type="checkbox"
//                   className="todo__status"
//                   checked={todo.completed}
//                   onChange={() => toggleTodoCompleted(todo)}
//                   disabled={isLoading}
//                 />
//               </label>

//               <span data-cy="TodoTitle" className="todo__title">
//                 {todo.title}
//               </span>

//               <button
//                 type="button"
//                 className="todo__remove"
//                 data-cy="TodoDelete"
//                 onClick={() => removeTodo(todo.id)}
//                 disabled={isLoading}
//               >
//                 ×
//               </button>

//               <div data-cy="TodoLoader" className="modal overlay">
//                 <div className="modal-background has-background-white-ter" />
//                 <div className="loader" />
//               </div>
//             </div>
//           ))}
//         </section>

//         {todos.length > 0 && (
//           <footer
//             className="todoapp__footer"
//             data-cy="Footer"
//             style={{ display: todos.length === 0 ? 'none' : 'flex' }}
//           >
//             <span className="todo-count" data-cy="TodosCounter">
//               {activeCount} {activeCount === 1 ? 'item' : 'items'} left
//             </span>

//             <nav className="filter" data-cy="Filter">
//               <a
//                 href="#/"
//                 className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
//                 data-cy="FilterLinkAll"
//                 onClick={e => {
//                   e.preventDefault();
//                   setFilter('all');
//                 }}
//               >
//                 All
//               </a>
//               <a
//                 href="#/active"
//                 className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
//                 data-cy="FilterLinkActive"
//                 onClick={e => {
//                   e.preventDefault();
//                   setFilter('active');
//                 }}
//               >
//                 Active
//               </a>
//               <a
//                 href="#/completed"
//                 className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
//                 data-cy="FilterLinkCompleted"
//                 onClick={e => {
//                   e.preventDefault();
//                   setFilter('completed');
//                 }}
//               >
//                 Completed
//               </a>
//             </nav>

//             <button
//               type="button"
//               className="todoapp__clear-completed"
//               data-cy="ClearCompletedButton"
//               onClick={clearCompleted}
//               disabled={
//                 isLoading || todos.filter(t => t.completed).length === 0
//               }
//             >
//               Clear completed
//             </button>
//           </footer>
//         )}
//       </div>

//       <div
//         data-cy="ErrorNotification"
//         className={`notification is-danger is-light has-text-weight-normal ${
//           error ? '' : 'hidden'
//         }`}
//       >
//         <button
//           data-cy="HideErrorButton"
//           type="button"
//           className="delete"
//           onClick={() => setError('')}
//         />
//         {error}
//       </div>
//     </div>
//   );
// };

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { ErrorComponent } from './components/ErrorComponent';
import { useTodoList } from './hooks/useTodoList';
import { Footer } from './components/Footer';
import { useTodosFilter } from './hooks/useTodosFilter';

export const App: React.FC = () => {
  const { todos, loadTodosErrorMessage, setLoadTodosErrorMessage } =
    useTodoList();
  const { statusFilter, setStatusFilter, filteredTodos } =
    useTodosFilter(todos);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeItemsCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />
          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <Footer
            activeTodosCount={activeItemsCount}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />
        )}
      </div>

      <ErrorComponent
        errorMessage={loadTodosErrorMessage}
        setErrorMessage={setLoadTodosErrorMessage}
      />
    </div>
  );
};

// надо прать функцию что ищет по айди и выводить объекты эти как тудушки
// сами тудушки сделать компонентом отдельным как и сообщение про ошибку
// сделать механизм фильтрации ол актив и комплит по тудушкам
// файли authcontext fetchclient и auto form пока не трогать
// ошибка должна показыватся при ломаном урл и на крестик убираться или через 3 сек исчезать
// или исчезать если мы выбираем новую тудушку а на крест не нажали а 3 сек не прошло

/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  // єто нужно разкоменть потом
  // useContext,
  useState,
  useEffect,
  useRef,
  // useCallback,
} from 'react';

import classNames from 'classnames';
// єто нужно разкоменть потом
// import { AuthContext } from './components/Auth/AuthContext';

import { getTodos } from './api/todos';

import { Todo } from './types/Todo';

// не получается просто переменные написать, лезут цифры
enum SortTypes {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortType, setSortType] = useState<string>(SortTypes.All);
  const [error, setError] = useState(false);
  // єто нужно разкоменть потом
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const user = useContext(AuthContext);
  // что за useContext и useRef и понадобятся ли они мне сейчас
  // пока что это мне ненужно
  const newTodoField = useRef<HTMLInputElement>(null);

  // user это запись с мейлом пользователя при аторизации в локал сторедж
  // console.log(user);
  // newTodoField скорее всего это тудушки из сервера или новые которые появятся и сейчас там пусто
  // console.log(newTodoField);

  if (!error) {
    setTimeout(() => {
      setError(true);
    }, 3000);
  }

  const closeError = (boolean: boolean) => {
    setError(boolean);
  };

  useEffect(() => {
    getTodos(5).then(response => {
      // console.log(response);
      setTodos(response);
    }).catch(() => setError(false));
  }, [todos]);

  // .catch(() => setError(false))
  // console.log(todos);
  // все верно показывает те что фолз
  // console.log(todos.filter(todo => todo.completed === false));
  // console.log(getTodos(5));

  const handleSortType = (type: string) => {
    setSortType(type);
  };

  // таким образом не видит переменной sort

  // useEffect(() => {
  //   const sort = todos.filter(todo => {
  //     if (sortType === SortTypes.All) {
  //       console.log('All');

  //       return todo;
  //     }

  //     if (sortType === SortTypes.Active) {
  //       console.log('Active');

  //       return !todo.completed && SortTypes.Active;
  //     }

  //     if (sortType === SortTypes.Completed) {
  //       console.log('Completed');

  //       return todo.completed && SortTypes.Completed;
  //     }

  //     return null;
  //   });
  // }, [todos]);
  // let test = () => {
  //   return todos.filter(todo => {
  //     if (sortType === SortTypes.All) {
  //       console.log('All');

  //       return todo;
  //     }

  //     if (sortType === SortTypes.Active) {
  //       console.log('Active');

  //       return !todo.completed && SortTypes.Active;
  //     }

  //     if (sortType === SortTypes.Completed) {
  //       console.log('Completed');

  //       return todo.completed && SortTypes.Completed;
  //     }

  //     return null;
  //   });
  // };

  // useEffect(() => {
  //   test();
  // }, []);

  // сейчас идет постоянный рендер но без ошибки
  const sort = todos.filter(todo => {
    if (sortType === SortTypes.All) {
      // console.log('All');

      return todo;
    }

    if (sortType === SortTypes.Active) {
      // console.log('Active');

      return !todo.completed && SortTypes.Active;
    }

    if (sortType === SortTypes.Completed) {
      // console.log('Completed');

      return todo.completed && SortTypes.Completed;
    }

    return null;
  });

  // let test = useCallback(() => {return sort; }, [todos]);

  // map пераестает работать

  // const sort = useCallback(() => {
  //   todos.filter(todo => {
  //     if (sortType === SortTypes.All) {
  //       console.log('All');

  //       return todo;
  //     }

  //     if (sortType === SortTypes.Active) {
  //       console.log('Active');

  //       return !todo.completed && SortTypes.Active;
  //     }

  //     if (sortType === SortTypes.Completed) {
  //       console.log('Completed');

  //       return todo.completed && SortTypes.Completed;
  //     }

  //     return null;
  //   });
  // }, [todos, sortType]);

  // опять куча перерендеров
  // const sort = useCallback(() => {
  //   setTodos(
  //     todos.filter(todo => {
  //       if (sortType === SortTypes.All) {
  //         console.log('All');

  //         return todo;
  //       }

  //       if (sortType === SortTypes.Active) {
  //         console.log('Active');

  //         return !todo.completed && SortTypes.Active;
  //       }

  //       if (sortType === SortTypes.Completed) {
  //         console.log('Completed');

  //         return todo.completed && SortTypes.Completed;
  //       }

  //       return null;
  //     }),
  //   );
  // }, [todos, sortType]);

  // sort();
  // const sort = () => {
  //   return todos.filter(todo => {
  //     if (sortType === SortTypes.All) {
  //       console.log('All');

  //       return todo;
  //     }

  //     if (sortType === SortTypes.Active) {
  //       console.log('Active');

  //       return !todo.completed && SortTypes.Active;
  //     }

  //     if (sortType === SortTypes.Completed) {
  //       console.log('Completed');

  //       return todo.completed && SortTypes.Completed;
  //     }

  //     return null;
  //   });
  // };

  // оно работает какето время но потом из за кучи перерендеров ломается незнаю как чинить
  // может это из за того что выше у меня тоже происходит вызов setTodos и он постоянно тянет из сервера что то
  // useEffect(() => {
  //   setTodos(
  //     todos.filter((todo) => {
  //       if (sortType === SortTypes.All) {
  //         console.log('All');

  //         return todo;
  //       }

  //       if (sortType === SortTypes.Active) {
  //         console.log('Active');

  //         return !todo.completed && SortTypes.Active;
  //       }

  //       if (sortType === SortTypes.Completed) {
  //         console.log('Completed');

  //         return todo.completed && SortTypes.Completed;
  //       }

  //       return null;
  //     }),
  //   );
  // }, []);

  // useEffect(() => {
  //   setTodos(sort());
  // }, [todos, sortType, setTodos, setSortType]);
  // console.log(sort());

  // вызывает кучу ошибок из за перерендеров?
  // setTodos(sort());

  // console.log(sortType);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    // просто подсвецивает текущюю тудушку на которой курсор?
    // и пока что оно мне не нужно
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  // if (!error) {
  //   setTimeout(() => {
  //     setError(true);
  //   }, 3000);
  // }

  // console.log(newTodoField);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">

          {sort.map(todo => {
            // console.log(todo);

            const {
              completed,
              id,
              title,
              // userId,
            } = todo;

            // вылазят еще тудушки у которых походу нет тайтлов
            // нужно их не рендерить или выводить какое то сообщение что их нет?
            return (
              <div
                data-cy="Todo"
                // className="todo completed"
                className={classNames('todo', {
                  'item-enter-done': !completed,
                  completed,
                })}
                // странно но такой класс нейм работает не правильно и ломает стили
                // className={completed && 'todo completed'}
                key={id}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    defaultChecked
                  />
                </label>

                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                >
                  {!title ? 'Empty title. Fix that' : title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDeleteButton"
                >
                  ×
                </button>

                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}
        </section>

        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="todosCounter">
            {/* цифра должна показывать сколько еще не выполненых тудушек */}
            {/* нормальная ли такая реализация */}
            {`${todos.filter(todo => todo.completed === false).length} items left`}
            {/* 4 items left */}
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              data-cy="FilterLinkAll"
              href="#/"
              // className="filter__link selected"
              className={classNames('filter__link', {
                selected: sortType === SortTypes.All,
              })}
              onClick={() => handleSortType(SortTypes.All)}
              // value={SortTypes.All}
            >
              {/* All */}
              {SortTypes.All}
            </a>

            <a
              data-cy="FilterLinkActive"
              href="#/active"
              // className="filter__link"
              className={classNames('filter__link', {
                selected: sortType === SortTypes.Active,
              })}
              onClick={() => handleSortType(SortTypes.Active)}
              // value={SortTypes.Active}
            >
              {SortTypes.Active}
              {/* Active */}
            </a>
            <a
              data-cy="FilterLinkCompleted"
              href="#/completed"
              // className="filter__link"
              className={classNames('filter__link', {
                selected: sortType === SortTypes.Completed,
              })}
              onClick={() => handleSortType(SortTypes.Completed)}
              // value={SortTypes.Completed}
            >
              {/* Completed */}
              {SortTypes.Completed}
            </a>
          </nav>

          <button
            data-cy="ClearCompletedButton"
            type="button"
            className="todoapp__clear-completed"
          >
            Clear completed
          </button>
        </footer>
      </div>

      <div
        data-cy="ErrorNotification"
        // className="notification is-danger is-light has-text-weight-normal"
        className={classNames('notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal', {
            hidden: error,
          })}

        // onClick={() => closeError(true)}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => closeError(true)}
        />

        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
// // надо прать функцию что ищет по айди и выводить объекты эти как тудушки
// // сами тудушки сделать компонентом отдельным как и сообщение про ошибку
// // сделать механизм фильтрации ол актив и комплит по тудушкам
// // файли authcontext fetchclient и auto form пока не трогать
// // ошибка должна показыватся при ломаном урл и на крестик убираться или через 3 сек исчезать
// // или исчезать если мы выбираем новую тудушку а на крест не нажали а 3 сек не прошло

// /* eslint-disable jsx-a11y/control-has-associated-label */
// import React, { useContext, useEffect, useRef } from 'react';
// import { AuthContext } from './components/Auth/AuthContext';
// import { getTodos } from './api/todos';

// export const App: React.FC = () => {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const user = useContext(AuthContext);
//   // что за useContext и useRef и понадобятся ли они мне сейчас
//   // пока что это мне ненужно
//   const newTodoField = useRef<HTMLInputElement>(null);

//   // user это запись с мейлом пользователя при аторизации в локал сторедж
//   // console.log(user);
//   // newTodoField скорее всего это тудушки из сервера или новые которые появятся и сейчас там пусто
//   // console.log(newTodoField);

//   console.log(getTodos(5));

//   useEffect(() => {
//     // focus the element with `ref={newTodoField}`
//     // просто подсвецивает текущюю тудушку на которой курсор?
//     // и пока что оно мне не нужно
//     if (newTodoField.current) {
//       newTodoField.current.focus();
//     }
//   }, []);

//   // console.log(newTodoField);

//   return (
//     <div className="todoapp">
//       <h1 className="todoapp__title">todos</h1>

//       <div className="todoapp__content">
//         <header className="todoapp__header">
//           <button
//             data-cy="ToggleAllButton"
//             type="button"
//             className="todoapp__toggle-all active"
//           />

//           <form>
//             <input
//               data-cy="NewTodoField"
//               type="text"
//               ref={newTodoField}
//               className="todoapp__new-todo"
//               placeholder="What needs to be done?"
//             />
//           </form>
//         </header>

//         <section className="todoapp__main" data-cy="TodoList">
//           <div data-cy="Todo" className="todo completed">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//                 defaultChecked
//               />
//             </label>

//             <span data-cy="TodoTitle" className="todo__title">HTML</span>
//             <button
//               type="button"
//               className="todo__remove"
//               data-cy="TodoDeleteButton"
//             >
//               {/* почему я тут что то меняю и только 1й крест меняется */}
//               {/* потому что ниже есть еще тудушки в которых крест свой */}
//               {/* мне в этом файле через мап надо что то делать */}
//               ×
//             </button>

//             <div data-cy="TodoLoader" className="modal overlay">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>

//           {/* наверное надо через мап  <div data-cy="Todo" добавлять */}
//           <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label>

//             <span data-cy="TodoTitle" className="todo__title">CSS</span>

//             <button
//               type="button"
//               className="todo__remove"
//               data-cy="TodoDeleteButton"
//             >
//               ×
//             </button>

//             <div data-cy="TodoLoader" className="modal overlay">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>

//           <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label>

//             <form>
//               <input
//                 data-cy="TodoTitleField"
//                 type="text"
//                 className="todo__title-field"
//                 placeholder="Empty todo will be deleted"
//                 defaultValue="JS"
//               />
//             </form>

//             <div data-cy="TodoLoader" className="modal overlay">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>

//           <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label>

//             <span data-cy="TodoTitle" className="todo__title">React</span>
//             <button
//               type="button"
//               className="todo__remove"
//               data-cy="TodoDeleteButton"
//             >
//               ×
//             </button>

//             <div data-cy="TodoLoader" className="modal overlay">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>

//           <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label>

//             <span data-cy="TodoTitle" className="todo__title">Redux</span>
//             <button
//               type="button"
//               className="todo__remove"
//               data-cy="TodoDeleteButton"
//             >
//               ×
//             </button>

//             <div data-cy="TodoLoader" className="modal overlay is-active">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>
//         </section>

//         <footer className="todoapp__footer" data-cy="Footer">
//           <span className="todo-count" data-cy="todosCounter">
//             4 items left
//           </span>

//           <nav className="filter" data-cy="Filter">
//             <a
//               data-cy="FilterLinkAll"
//               href="#/"
//               className="filter__link selected"
//             >
//               All
//             </a>

//             <a
//               data-cy="FilterLinkActive"
//               href="#/active"
//               className="filter__link"
//             >
//               Active
//             </a>
//             <a
//               data-cy="FilterLinkCompleted"
//               href="#/completed"
//               className="filter__link"
//             >
//               Completed
//             </a>
//           </nav>

//           <button
//             data-cy="ClearCompletedButton"
//             type="button"
//             className="todoapp__clear-completed"
//           >
//             Clear completed
//           </button>
//         </footer>
//       </div>

//       <div
//         data-cy="ErrorNotification"
//         className="notification is-danger is-light has-text-weight-normal"
//       >
//         <button
//           data-cy="HideErrorButton"
//           type="button"
//           className="delete"
//         />

//         Unable to add a todo
//         <br />
//         Unable to delete a todo
//         <br />
//         Unable to update a todo
//       </div>
//     </div>
//   );
// };

import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import { getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { SortTypes } from './types/SortTypes';

import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorNotification } from
  './components/ErrorNotification/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortType, setSortType] = useState<string>(SortTypes.All);
  const [error, setError] = useState(false);
  const newTodoField = useRef<HTMLInputElement>(null);

  if (!error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  const closeError = (boolean: boolean) => {
    setError(boolean);
  };

  useEffect(() => {
    getTodos(5).then(response => {
      setTodos(response);
    }).catch(() => setError(true));
  }, []);

  const handleSortType = (type: string) => {
    setSortType(type);
  };

  const filteredTodos = todos.filter(todo => {
    switch (sortType) {
      case SortTypes.All:
        return todo;

      case SortTypes.Active:
        return !todo.completed && SortTypes.Active;

      case SortTypes.Completed:
        return todo.completed && SortTypes.Completed;

      default:
        return null;
    }
  });

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            aria-label="make all todos active or vice versa"
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

        <TodoList filteredTodos={filteredTodos} />
        <Footer
          todos={todos}
          handleSortType={handleSortType}
          sortType={sortType}
        />

      </div>

      <ErrorNotification
        closeError={closeError}
        error={error}
      />
    </div>
  );
};
// надо прать функцию что ищет по айди и выводить объекты эти как тудушки
// сами тудушки сделать компонентом отдельным как и сообщение про ошибку
// сделать механизм фильтрации ол актив и комплит по тудушкам
// файли authcontext fetchclient и auto form пока не трогать
// ошибка должна показыватся при ломаном урл и на крестик убираться или через 3 сек исчезать
// или исчезать если мы выбираем новую тудушку а на крест не нажали а 3 сек не прошло

// надо чтобы ошибка лезла когда путь поломан и на клик или через 3 сек исчезала

// 2я часть задания
// в фетч клиент вообще не лезим все делаем в файле с тудушками и пишем там client.и выбираем нужный метод
// надо инпут соеденить с новым обектом и его патчить на сервер и из сервера все получать
// а в делите получить обект при нажатии и по юзер айди удалять из сервера и из сервера должен прийти ответ в виде удаленного обекта

// import React, {
//   useState,
//   useEffect,
//   useRef,
// } from 'react';

// import { getTodos } from './api/todos';

// import { Todo } from './types/Todo';

// import { TodoList } from './components/TodoList/TodoList';
// import { Footer } from './components/Footer/Footer';
// import { ErrorNotification } from
//   './components/ErrorNotification/ErrorNotification';

// enum SortTypes {
//   All = 'All',
//   Active = 'Active',
//   Completed = 'Completed',
// }

// export const App: React.FC = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [sortType, setSortType] = useState<string>(SortTypes.All);
//   const [error, setError] = useState(false);
//   const newTodoField = useRef<HTMLInputElement>(null);

//   if (!error) {
//     setTimeout(() => {
//       setError(false);
//     }, 3000);
//   }

//   const closeError = (boolean: boolean) => {
//     setError(boolean);
//   };

//   useEffect(() => {
//     getTodos(5).then(response => {
//       setTodos(response);
//     }).catch(() => setError(true));
//     // скорее всего тут надо будет удалять и добавлять новые тудушки
//   }, []);

//   const handleSortType = (type: string) => {
//     setSortType(type);
//   };

//   // сейчас идет постоянный рендер но без ошибки
//   // use memo для какой то строки числа у useCallback для функций
//   // проблема была что я постоянно на сервер кидал запросы выше и там в зависимостях были тудушки
//   // и они вечно брались

//   const sort = todos.filter(todo => {
//     switch (sortType) {
//       case SortTypes.All:
//         return todo;

//       case SortTypes.Active:
//         return !todo.completed && SortTypes.Active;

//       case SortTypes.Completed:
//         return todo.completed && SortTypes.Completed;

//       default:
//         return null;
//     }
//   });

//   useEffect(() => {
//     if (newTodoField.current) {
//       newTodoField.current.focus();
//     }
//   }, []);

//   return (
//     <div className="todoapp">
//       <h1 className="todoapp__title">todos</h1>

//       <div className="todoapp__content">
//         <header className="todoapp__header">
//           <button
//             aria-label="make all todos active or vice versa"
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

//         <TodoList todos={sort} />
//         <Footer
//           todos={todos}
//           handleSortType={handleSortType}
//           sortType={sortType}
//         />

//       </div>

//       <ErrorNotification
//         closeError={closeError}
//         error={error}
//       />
//     </div>
//   );
// };

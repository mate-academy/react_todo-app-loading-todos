import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  changeTodoStatus,
  createTodo,
  deleteTodo,
  getTodos,
} from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer/Footer';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/Todo';
import { Todo } from './types/Todo';
import { TodosFilter } from './types/TodosFilter_Enum';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [update, setUpdate] = useState(0);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodos, setFilterTodos] = useState<TodosFilter>(TodosFilter.All);

  const [alertText, setAlertText] = useState('');
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertTimerId, setAlertTimerId] = useState<NodeJS.Timeout | null>(null);

  const getVisibleTodos = () => {
    switch (filterTodos) {
      case TodosFilter.Active:
        return todos.filter((todo) => !todo.completed);
      case TodosFilter.Completed:
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  const visibleTodos = useMemo(getVisibleTodos, [todos, filterTodos]);

  const clearAlert = () => {
    if (alertTimerId !== null) {
      clearTimeout(alertTimerId);
      setAlertTimerId(null);
    }

    setAlertVisible(false);
  };

  const showAlert = (error: string) => {
    clearAlert();
    setAlertText(error);
    setAlertVisible(true);
    setAlertTimerId(setTimeout(() => {
      setAlertVisible(false);
    }, 3000));
  };

  const handleClearAlert = () => clearAlert();

  const handleDeleteError = () => showAlert('Unable to add Todo');
  const handleUpdateError = () => showAlert('Unable to update Todo');

  const forceUpdate = () => {
    setUpdate(prevValue => prevValue + 1);
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(todosFromServer => {
          setTodos(todosFromServer);
        })
        .catch(() => showAlert('Unable to get Todos'));
    }
  }, [update]);

  const isInterfaceHidden = (todos.length === 0
    && filterTodos === TodosFilter.All);

  const handleFilterTodos = (filterValue: TodosFilter) => {
    setFilterTodos(filterValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = newTodoField.current?.value.trim();

    if (title !== '' && title && user) {
      clearAlert();
      createTodo({
        id: 0,
        userId: user.id,
        title,
        completed: false,
      })
        .then(() => forceUpdate())
        .catch(() => showAlert('Unable to add Todo'))
        .finally(() => {
          if (newTodoField.current) {
            newTodoField.current.value = '';
          }
        });
    }
  };

  const handleChangeStatus = (todoId: number, status: boolean) => {
    clearAlert();
    changeTodoStatus(todoId, !status)
      .then(() => forceUpdate())
      .catch(() => showAlert('Unable to update Todo'));
  };

  const handleDeleteTodo = (todoId: number) => {
    clearAlert();
    deleteTodo(todoId)
      .then(() => forceUpdate())
      .catch(() => handleDeleteError());
  };

  const handleToggleAllTodos = () => {
    const toggleValue = !todos.every((todo) => todo.completed);

    todos.forEach((todo, index) => {
      clearAlert();
      if (index === todos.length - 1) {
        changeTodoStatus(todo.id, toggleValue)
          .then(() => forceUpdate())
          .catch(() => handleUpdateError());
      } else {
        changeTodoStatus(todo.id, toggleValue);
      }
    });
  };

  const handleDeleteCompleted = () => {
    const completedTodos = todos.filter((todo) => todo.completed);

    completedTodos.forEach((todo, index) => {
      clearAlert();
      if (index === completedTodos.length - 1) {
        deleteTodo(todo.id)
          .then(() => forceUpdate())
          .catch(() => handleDeleteError());
      } else {
        deleteTodo(todo.id)
          .catch(() => handleDeleteError());
      }
    });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <NewTodo
          todos={todos}
          newTodoField={newTodoField}
          handleToggleAllTodos={handleToggleAllTodos}
          handleSubmit={handleSubmit}
          isInterfaceHidden={isInterfaceHidden}
        />

        {
          !isInterfaceHidden && (
            <>
              <TodoList
                todos={visibleTodos}
                handleChangeStatus={handleChangeStatus}
                handleDeleteTodo={handleDeleteTodo}
              />

              <Footer
                todos={todos}
                filterTodos={filterTodos}
                handleFilterTodos={handleFilterTodos}
                handleDeleteCompleted={handleDeleteCompleted}
              />
            </>
          )
        }

        <ErrorNotification
          isAlertVisible={isAlertVisible}
          alertText={alertText}
          handleClearAlert={handleClearAlert}
        />
      </div>
    </div>
  );
};

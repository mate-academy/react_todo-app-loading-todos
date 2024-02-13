/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useEffect,
  FC,
  useState,
  useRef,
} from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  addTodo,
  editTodo,
  getTodos,
  removeTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { Status } from './types/Status';

const filterTodos = (todos:Todo[], filter:string) => {
  switch (filter) {
    case Status.Active:
      return todos.filter(todo => !todo.completed);

    case Status.Completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filter, setFilter] = useState(Status.All);
  const [unCompletedTodos, setUncompletedTodos] = useState(0);
  const [allIsCompleted, setAllIsCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [allCompletedInProcess, setAllCompletedInProcess] = useState(false);

  useEffect(() => {
    setErrorMessage('');
    getTodos()
      .then(data => setTodos(data))
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, [errorMessage]);

  useEffect(() => {
    let allUnCompletedTodos = 0;

    todos.forEach(todo => {
      allUnCompletedTodos += todo.completed ? 0 : 1;
    });
    setUncompletedTodos(allUnCompletedTodos);

    setAllIsCompleted(allUnCompletedTodos === 0);
  }, [todos]);

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (newTodoTitle.trim() === '') {
      setErrorMessage('Title should not be empty');
    } else {
      addTodo(newTodoTitle)
        .then(res => {
          setTodos(prev => [...prev, res]);
          setNewTodoTitle('');
        })
        .catch(() => {
          setErrorMessage('Unable to add a todo');
        });
    }
  };

  const removeTodoFromTodos = (todoId: number) => {
    setTodos(prev => prev.filter(existsTodo => existsTodo.id !== todoId));
  };

  const filteredTodos = filterTodos(todos, filter);

  const deleteArrOfTodos = (arr:Todo[], index = 0) => {
    removeTodo(arr[index].id)
      .then(() => {
        if (arr.length - 1 > index) {
          deleteArrOfTodos(arr, index + 1);
        } else {
          setTodos(todos.filter(todo => !todo.completed));
        }
      })
      .catch(() => setErrorMessage('Unable to delete a todo'));
  };

  const changeCompletedInArrOfTodos = (
    arr:Todo[],
    result: boolean,
    index = 0,
  ) => {
    editTodo({
      ...arr[index],
      completed: !arr[index].completed,
    })
      .then(() => {
        if (arr.length - 1 > index) {
          changeCompletedInArrOfTodos(arr, result, index + 1);
        } else {
          setTodos(todos.map(el => {
            const newTodo = el;

            newTodo.completed = result;

            return newTodo;
          }));
          setAllCompletedInProcess(false);
        }
      })
      .catch(() => setErrorMessage('Unable to edit a todo'));
  };

  const removeCompletedTodos = () => {
    setErrorMessage('');
    const completedTodos = todos.filter(todo => todo.completed);

    deleteArrOfTodos(completedTodos);
  };

  const changeCompletedTodoById = (todoId: number) => {
    const updatedList = todos.map((editedTodo) => {
      const completedTodo = editedTodo;

      if (completedTodo.id === todoId) {
        completedTodo.completed = !completedTodo.completed;
      }

      return completedTodo;
    });

    setTodos(updatedList);
  };

  const toggleAllCompleted = () => {
    setAllCompletedInProcess(true);
    setErrorMessage('');
    if (allIsCompleted) {
      const list = todos.filter(todo => todo.completed);

      changeCompletedInArrOfTodos(list, false);
    } else {
      const list = todos.filter(todo => !todo.completed);

      changeCompletedInArrOfTodos(list, true);
    }
  };

  // useEffect(() => {
  //   console.log('AIC', allIsCompleted);
  // }, [allIsCompleted]);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current !== null) {
      titleField.current.focus();
    }
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: allIsCompleted,
            })}
            data-cy="ToggleAllButton"
            onClick={toggleAllCompleted}
            disabled={allCompletedInProcess}
          />

          <form onSubmit={formSubmitHandler}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              ref={titleField}
              onChange={e => setNewTodoTitle(e.target.value)}
            />
          </form>
        </header>

        {!!todos.length && (
          <>
            <TodoList
              todos={filteredTodos}
              removeTodoFromTodos={removeTodoFromTodos}
              changeCompletedTodoById={changeCompletedTodoById}
              setErrorMessage={setErrorMessage}
            />
            <TodoFooter
              unCompletedTodos={unCompletedTodos}
              filter={filter}
              setFilter={setFilter}
              todos={todos}
              removeCompletedTodos={removeCompletedTodos}
            />
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn('notification is-danger is-light has-text-weight-normal',
          { hidden: errorMessage === '' })}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};

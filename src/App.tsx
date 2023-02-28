/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import {
  addTodo,
  deleteTodo,
  getTodos,
  patchTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { Header } from './components/Header';
import { TodosList } from './components/TodosList';

export const App: React.FC = () => {
  const user = useContext(AuthContext);

  const newTodoField = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState('');
  const [isShowEditInput, setIsShowEditInput] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [filterMode, setFilterMode] = useState<string>('all');
  const [isToggle, setIsToggle] = useState(false);
  const [todoSelected, setTodoSelected] = useState(0);

  const filterModeHandler = (mode: string) => {
    setFilterMode(mode);
  };

  const checkingCompleteTodo = (to: Todo[]) => {
    const checking = to.find(t => t.completed);

    setIsToggle(!!checking);
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (!user) {
      return;
    }

    getTodos(user.id)
      .then(response => {
        setTodos(response);
        checkingCompleteTodo(response);
      });
  }, []);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, [isShowEditInput]);

  const removeHandler = (todo: Todo) => {
    deleteTodo(todo.id)
      .then(() => {
        setTodos([...todos.filter(t => t.id !== todo.id)]);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.warn(error);
      });
  };

  const clearCompletedHandler = () => {
    if (!user) {
      return;
    }

    const idCompletedTodos = todos
      .filter(todoCompleted => todoCompleted.completed)
      .map(todoId => todoId.id);

    Promise.allSettled(idCompletedTodos.map(todoId => (
      deleteTodo(todoId)
    )))
      .then(() => {
        getTodos(user.id).then(res => {
          setTodos(res);
        });
      });
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const toggleCompletedHandler = () => {
    if (!user) {
      return;
    }

    const completedTodos = todos
      .filter(todo => todo.completed);

    const todosToChange = !(completedTodos.length === todos.length)
      ? todos.filter(todo => !todo.completed)
      : todos;
    const switchedComplete = todosToChange.map(switchTodo => {
      return {
        ...switchTodo,
        completed: !(completedTodos.length === todos.length),
      };
    });

    Promise.allSettled(switchedComplete.map(todo => {
      return patchTodo(todo);
    }))
      .then(() => {
        getTodos(user.id)
          .then(res => {
            setTodos(res);
            checkingCompleteTodo(res);
          });
      });
  };

  const updateInputHandler = (todo: Todo) => {
    setTodos(todos.map(t => (t.id === todo.id
      ? { ...todo, editMode: true } : t)));

    setIsShowEditInput(true);

    setEditTitle(todo.title);
  };

  const onChangeEditInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    if (inputText.trim().length === 0) {
      return;
    }

    const newTodo: Partial<Todo> = {
      userId: user.id,
      completed: false,
      title: inputText,
    };

    addTodo(newTodo)
      .then(response => {
        setTodos([...todos, response]);
        setInputText('');
      })
      .catch(() => {
        setShowError(true);
        setErrors('add');
      });
  };

  const closeErrorHandler = () => {
    setShowError(false);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          submitHandler={submitHandler}
          inputText={inputText}
          inputChangeHandler={inputChangeHandler}
          newTodoField={newTodoField}
          toggleCompletedHandler={toggleCompletedHandler}
          isToggle={isToggle}
        />

        <TodosList
          todos={todos}
          filterMode={filterMode}
          editTitle={editTitle}
          updateInputHandler={updateInputHandler}
          removeHandler={removeHandler}
          newTodoField={newTodoField}
          onChangeEditInput={onChangeEditInput}
          setTodos={setTodos}
          setIsShowEditInput={setIsShowEditInput}
          setTodoSelected={setTodoSelected}
          todoSelected={todoSelected}
        />

        { todos.length !== 0
          && (
            <Footer
              filterModeHandler={filterModeHandler}
              todos={todos}
              clearCompletedHandler={clearCompletedHandler}
              filterMode={filterMode}
            />
          )}
      </div>
      { showError
        && (
          <ErrorNotification
            closeErrorHandler={closeErrorHandler}
            errors={errors}
          />
        )}
    </div>
  );
};

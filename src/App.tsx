import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { Todo } from './types/Todo';
import { createTodo, getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

const USER_ID = 7075;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [isEnterPressed, setIsEnterPressed] = useState(false);
  const [selectedTodoId, setSelectTodoId] = useState<null | number>(null);

  const count = todos.length;

  useEffect(() => {
    getTodos(USER_ID).then(todosFromServer => {
      setTodos(todosFromServer);
    });
  }, [isEnterPressed, selectedTodoId]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (

    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          inputText={todoTitle}
          setInputText={(ev) => {
            setTodoTitle(ev.target.value);
            setIsEnterPressed(false);
          }}
          handleKeyPress={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              createTodo(7075, todoTitle);
            }
          }}
          handleKeyUp={(event) => {
            if (event.key === 'Enter') {
              setIsEnterPressed(true);
              setTodoTitle('');
            }
          }}
        />
        {todos.length > 0 && (
          <TodoList
            todos={todos}
            selectedTodoId={selectedTodoId}
            selectTodo={(todoIDfromServer:
            React.SetStateAction<number | null>) => {
              setSelectTodoId(todoIDfromServer);
            }}
          />
        )}
      </div>
      {todos.length > 0 && <Footer count={count} />}
    </div>
  );
};

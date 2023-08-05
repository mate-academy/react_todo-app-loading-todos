/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import classNames from 'classnames';

import { TodoHeader } from './components/TodoHeader';
import { TodoBody } from './components/TodoBody';
import { TodoFooter } from './components/TodoFooter';
import { TodosContext, TodosProvider } from './context/TodoContext';

export const App: React.FC = () => {
  const { errorMessage, setErrorMessage } = useContext(TodosContext);
  // const [todos, setTodos] = useState<Todo[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [filterBy, setFilterBy] = useState(FilterBy.ALL);
  // const [errorMessage, setErrorMessage] = useState('');
  // const [newTodoId, setNewTodoId] = useState<number>(0); // ???

  // useEffect(() => {
  //   todosService.getTodos(todosService.USER_ID)
  //     .then(setTodos)
  //     .catch((error) => {
  //       setErrorMessage('load');
  //       throw error;
  //     })
  //     .finally(() => {
  //       setErrorMessage('');
  //       setTimeout(() => {
  //         setErrorMessage('');
  //       }, 3000);
  //     });
  // }, []);

  // const filteringBy = useMemo(() => {
  //   switch (filterBy) {
  //     case FilterBy.ACTIVE:
  //       return todos.filter(todo => !todo.completed);
  //     case FilterBy.COMPLETED:
  //       return todos.filter(todo => todo.completed);
  //     default:
  //       return todos;
  //   }
  // }, [filterBy, todos]);

  // const updateTodo = async (todoToUpdate: Todo) => {
  //   setNewTodoId(todoToUpdate.id);

  //   try {
  //     const updatedTodo = await todosService
  //       .updateTodo(todoToUpdate.id, todoToUpdate) as Todo;

  //     const findIndexTodo = [...todos]
  //       .findIndex(todo => todo.id === todoToUpdate.id);

  //     setTodos((currentTodos: Todo[]): Todo[] => {
  //       const newTodos = [...currentTodos];

  //       newTodos.splice(findIndexTodo, 1, updatedTodo);

  //       return newTodos;
  //     });
  //   } catch (error) {
  //     setErrorMessage('update');
  //     throw error;
  //   } finally {
  //     setNewTodoId(0);
  //     setTimeout(() => setErrorMessage(''), 3000);
  //   }
  // };

  // const deleteTodo = async (todoId: number) => {
  //   setNewTodoId(todoId);

  //   try {
  //     await todosService.deleteTodo(todoId);

  //     setTodos((currentTodos: Todo[]) => (
  //       currentTodos.filter(todo => todo.id !== todoId)
  //     ));
  //   } catch (error) {
  //     setErrorMessage('delete');
  //     throw error;
  //   } finally {
  //     setNewTodoId(0);
  //     setTimeout(() => setErrorMessage(''), 3000);
  //   }
  // };

  return (
    <TodosProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <TodoHeader />
          <TodoBody />
          <TodoFooter />
        </div>

        {/* Notification is shown in case of any error */}
        {errorMessage && (
          <div
            className="notification is-danger is-light has-text-weight-normal"
          >
            <button
              type="button"
              className={classNames('delete', {
                hidden: !errorMessage,
              })}
              onClick={() => {
                setErrorMessage('');
              }}
            />
            {`Unable ${errorMessage} a todo`}
          </div>

        )}
      </div>
    </TodosProvider>
  );
};

/* eslint-disable jsx-a11y/label-has-associated-control */
import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../../api/todos';
import { TodoList } from '../TodoList';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { useEffect, useState } from 'react';
import { Errormessage } from '../Errormessage/Errormessage';
import { Todo } from '../../types/Todo';

export enum TodosStatus {
  ALL,
  ACTIVE,
  COMPLETED,
}

export enum ErrorMessages {
  LOAD_FAILED = 'Unable to load todos',
  ADD_FAILED = 'Unable to add a todo',
  UPDATE_FAILED = 'Unable to update a todo',
  DELETE_FAILED = 'Unable to delete a todo',
  EMPTY_TITLE = 'Title should not be empty',
  UNKNOWN_ERROR = 'An unknown error occurred',
}

export const TodoApp = () => {
  // const {
  //   data: todos,
  //   isLoading,
  //   isError,
  //   error,
  //   status
  // } = useQuery({
  //   queryKey: ['todos'],
  //   queryFn: getTodos,
  // });

  const [errorMessage, setErrorMessage] = useState('');
  const [isActive, setIsActive] = useState(TodosStatus.ALL);
  const [todoList, setTodoList] = useState<Todo[]>([]);

  // console.log(query.data);

  // Mutations
  // const mutation = useMutation({
  //   mutationFn: postTodo,
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ['todos'] });
  //   },
  // onError: (mutationError) => {
  //   if (mutationError.response.status === 422) {
  //     setErrorMessage(ErrorMessages.EMPTY_TITLE);
  //   } else {
  //     setErrorMessage(ErrorMessages.ADD_FAILED);
  //   }
  // },
  // });

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosss = await getTodos();

        setTodoList(todosss);
      } catch (err) {
        setErrorMessage(ErrorMessages.LOAD_FAILED);
        const timer = setTimeout(() => {
          setErrorMessage('');
        }, 3000);

        return () => clearTimeout(timer);
      } finally {
      }
    };
    loadTodos();
  }, []);

  // useEffect(() => {
  //   if (isError) {
  //     setErrorMessage(ErrorMessages.LOAD_FAILED);
  //     const timer = setTimeout(() => {
  //       setErrorMessage('');
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [isError]);

  const handleClearErrorMessage = () => {
    setErrorMessage('');
  };

  // const visibleGoods = (todos ?? []).filter(todo => {
  const visibleGoods = (todoList).filter(todo => {
    switch (isActive) {
      case TodosStatus.ACTIVE:
        return !todo.completed;
      case TodosStatus.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={visibleGoods} />

        {/* Hide the footer if there are no todos */}
        {todoList.length > 0 && (
          <Footer
            itemsCount={todoList.filter(todo => todo.completed === false).length}
            activeStatus={isActive}
            onStatusChange={setIsActive}
            noCompletedTodos={!todoList.find(todo => todo.completed === true)}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Errormessage
        errorMessage={errorMessage}
        onClose={handleClearErrorMessage}
        // isError={isError}
      />
    </div>
  );
};

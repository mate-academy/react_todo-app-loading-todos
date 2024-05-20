import cn from 'classnames';
import { useTodosContext } from '../Context/TodosContext';

type ErrorsContainerProps = {
  errorsCondition: boolean;
};

export const ErrorsContainer: React.FC<ErrorsContainerProps> = ({
  errorsCondition,
}) => {
  const { errors, setErrors } = useTodosContext();

  const hadleResetErrors = () => {
    if (errors.titleError) {
      setErrors({ ...errors, titleError: false });
    }
  };

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorsCondition,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={hadleResetErrors}
      />
      {/* show only one message at a time */}
      {errors.loadingError && 'Unable to load todos'}
      {/* <br /> */}
      {errors.titleError && 'Title should not be empty'}
      {/* <br /> */}
      {errors.addTodoError && 'Unable to add a todo'}
      {/* <br /> */}
      {errors.deleteTodoError && 'Unable to delete a todo'}
      {/* <br /> */}
      {errors.updatedTodo && 'Unable to update a todo'}
    </div>
  );
};

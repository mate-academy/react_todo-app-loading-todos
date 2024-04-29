import { useMemo } from 'react';

const failMsgs = {
  todoLoad: 'Unable to load todos',
  titleLength: 'Title should not be empty',
  addTodo: 'Unable to add a todo',
  deleteTodo: 'Unable to delete a todo',
  updateTodo: 'Unable to update a todo',
};

type Props = { failCaseStates: {}; setFailCaseStates: (newStates: {}) => void };

export default function ErrorNotification({
  failCaseStates,
  setFailCaseStates,
}: Props) {
  const currentFailCase = useMemo(() => {
    const singleFail = Object.entries(failCaseStates).filter(fCase => fCase[1]);

    if (singleFail.length === 0) {
      return null;
    } else {
      setTimeout(() => {
        setFailCaseStates({
          todoLoad: false,
          titleLength: false,
          addTodo: false,
          deleteTodo: false,
          updateTodo: false,
        });
      }, 3000);

      return failMsgs[singleFail[0][0] as keyof typeof failMsgs];
    }
  }, [failCaseStates, setFailCaseStates]);

  /* DON'T use conditional rendering to hide the notification */
  /* Add the 'hidden' class to hide the message smoothly */
  return (
    <div
      data-cy="ErrorNotification"
      className={
        'notification is-danger is-light has-text-weight-normal ' +
        (currentFailCase === null ? 'hidden' : '')
      }
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {currentFailCase}
    </div>
  );
}

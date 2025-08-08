import { useEffect, useState } from 'react';

type Props = {
  hidden: boolean;
};

export const ErrorNotification: React.FC<Props> = ({ hidden }) => {
  const [hide, setHide] = useState(true);

  useEffect(() => {
    if (hidden) {
      setHide(false);
      setTimeout(() => {
        setHide(true);
      }, 3000);
    }
  }, [hidden]);

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${hide ? 'hidden' : ''}`}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {/* show only one message at a time */}
      Unable to load todos
      {/* <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};

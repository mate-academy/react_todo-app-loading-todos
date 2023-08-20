import { useState } from 'react';

type Props = {
  errorMessage: string;
};

export const ErrorNotification: React.FC<Props> = ({ errorMessage }) => {
  const [isHidden, setIsHidden] = useState(false);
  const onHiddenSetter = () => {
    setIsHidden(true);
  };

  return (
    <div
      className="notification is-danger is-light has-text-weight-normal"
      hidden={isHidden}
    >
      <button
        type="button"
        className="delete"
        onClick={onHiddenSetter}
        aria-label="Close notification"
      />
      {errorMessage}
    </div>
  );
};

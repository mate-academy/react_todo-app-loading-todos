import { useEffect, useRef } from 'react';

type Props = {
  errorMessage: string;
};

export const TodosError: React.FC<Props> = ({ errorMessage }) => {
  const notification = useRef<HTMLDivElement>(null);

  const hideNotification = () => {
    if (notification) {
      notification.current?.classList.add('hidden');
    }
  };

  const handleDeleteButtonClick = () => {
    hideNotification();
  };

  useEffect(() => {
    setTimeout(() => {
      hideNotification();
    }, 3000);
  });

  return (
    <div
      className="notification is-danger is-light has-text-weight-normal"
      ref={notification}
    >
      <button
        type="button"
        className="delete"
        aria-label="delete error message"
        onClick={handleDeleteButtonClick}
      />
      {errorMessage}
    </div>
  );
};

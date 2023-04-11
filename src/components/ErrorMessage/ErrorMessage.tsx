type Props = {
  text: string;
  onClose: () => void;
};

export const ErrorMessage: React.FC<Props> = (props) => {
  const { text, onClose } = props;

  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      {/* eslint-disable-next-line */}
      <button
        type="button"
        className="delete"
        onClick={onClose}
      />
      {text}
    </div>
  );
};

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="error-message__container">
      <p className="error-message__text">{message}</p>
    </div>
  );
}

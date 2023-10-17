type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-stroke py-4 px-14 rounded text-primary"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

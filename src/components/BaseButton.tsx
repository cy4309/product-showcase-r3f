interface IBaseButtonProps {
  label?: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const BaseButton: React.FC<IBaseButtonProps> = ({
  label,
  className,
  onClick,
  children,
}) => {
  return (
    <button
      className={`p-3 text-white font-bold text-xl bg-primaryColorLogoOrange rounded-full ${className}`}
      onClick={onClick}
    >
      {label || children}
    </button>
  );
};

export default BaseButton;

import clsx from "clsx";

export interface IconButtonProps {
  className?: string;
  onClick?: () => void;
  Icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  label: string;
}

export function IconButton(props: IconButtonProps) {
  const { className, onClick, Icon, label } = props;

  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    evt.stopPropagation();
    onClick && onClick();
  };

  return (
    <button
      className={clsx(
        "rounded-full p-2 focus:ring-2 focus:outline-none transition-color duration-150 ease-in-out text-white",
        className
      )}
      onClick={handleClick}
    >
      <Icon className={"w-5 h-5"} />
      <span className={"sr-only"}>{label}</span>
    </button>
  );
}

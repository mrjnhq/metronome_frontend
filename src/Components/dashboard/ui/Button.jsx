/* eslint-disable react/prop-types */

const Button = ({
  bgColor = "bg-blue-500",
  title = "Apply",
  customPadding = "",
  onClick = () => {},
}) => {
  return (
    <button
      className={`${
        customPadding || "px-5 py-1"
      }  rounded-sm text-white ${bgColor}`}
      onClick={onClick}
      tabIndex={0}
      type="button"
    >
      {title}
    </button>
  );
};

export default Button;

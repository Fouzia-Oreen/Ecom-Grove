/* eslint-disable react/prop-types */
const Message = ({ variant, children }) => {
    const getVariantClass = () => {
      switch (variant) {
        case "success":
          return "bg-green-100 text-color_4";
        case "error":
          return "bg-red-100 text-red-800";
        default:
          return " text-color_6";
      }
    };
  
    return <div className={`p-4 rounded ${getVariantClass()}`}>{children}</div>;
  };
  
  export default Message;
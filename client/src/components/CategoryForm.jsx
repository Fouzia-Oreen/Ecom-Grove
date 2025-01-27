import Input from "./Input";

/* eslint-disable react/prop-types */
const CategoryForm = ({
    value,
    setValue,
    handleSubmit,
    buttonText = "Submit",
    handleDelete,
  }) => {
    return (
      <div className="p-3">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input type="text" onChange={(e) => setValue(e.target.value)} placeholder="Write category name" value={value}/>
  
          <div className="flex justify-between">
            <button className="btn auth-btn">
              {buttonText}
            </button>
  
            {handleDelete && (
              <button
                onClick={handleDelete}
                className="btn bg-red-500  hover:bg-red-600"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    );
  };
  
  export default CategoryForm;
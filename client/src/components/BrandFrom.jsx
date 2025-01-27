import Input from "./Input";

/* eslint-disable react/prop-types */
const BrandForm = ({
    value,
    setValue,
    handleSubmit,
    buttonText = "Submit",
    handleDelete,
  }) => {
    return (
      <div className="p-3">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input type="text" placeholder="Write brand name" value={value}
            onChange={(e) => setValue(e.target.value)}/>

          <div className="flex justify-between gap-4">
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
  }
  
export default BrandForm
  
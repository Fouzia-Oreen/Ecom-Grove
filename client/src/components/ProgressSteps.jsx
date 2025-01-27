import userLogin from "../assets/user-login.svg";
import shipping from "../assets/shipping.svg";
import packageImage from "../assets/package.svg";


const ProgressSteps = ({ step1, step2, step3 }) => {
    return (
      <div className="flex justify-center items-center space-x-4 my-12">
        <div className={`${step1 ? "text-color_4/90" : "text-color_3"}`}>      
          <div className="mt-2 flex flex-col items-center gap-2">
            <img src={userLogin} alt="" className="h-6" />
            <span className="text-sm  font-bold">Login</span>
          </div>
        </div>
  
        {step2 && (
          <>
            {step1 && <div className="h-0.5 w-[10rem] bg-color_6/30"></div>}
            <div className={`${step1 ? "text-color_4/90" : "text-color_3"}`}>      
              <div className="mt-2 flex flex-col items-center gap-2">
              <img src={shipping} alt="" className="h-6" />
              <span className="text-sm font-bold">Shipping</span>
              </div>            
            </div>
          </>
        )}
  
        <>
          {step1 && step2 && step3 ? (
            <div className="h-0.5 w-[10rem] bg-color_6/30"></div>
          ) : (
            ""
          )}
  
          <div className={`${step3 ? "text-color_6" : "text-color_4/60"}`}>
            {step1 && step2 && step3 ? (
              <div className="mt-2 flex flex-col items-center gap-2">
                <img src={packageImage} alt="" className="h-6" />
                <span className={`${!step3 ? "ml-[10rem] " : "text-sm font-bold text-color_4/90"}` }>Summary</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      </div>
    );
  };
  
  export default ProgressSteps;
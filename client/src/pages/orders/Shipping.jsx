import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import ProgressSteps from "../../components/ProgressSteps";
import Title from "../../components/Title";
import {
  savePaymentMethod,
  saveShippingAddress
} from "../../redux/features/cart/cartSlice";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [username, setUserName] = useState(shippingAddress.username || "");
  const [phone, setPhone] = useState(shippingAddress.phone || "");

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [paymentMethodCOD, setPaymentMethodCOD] = useState("COD");

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [state, setState] = useState(shippingAddress.state || "");
  const [note, setNote] = useState(shippingAddress.note || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country, state, phone, username, note }));
    dispatch(savePaymentMethod(paymentMethod));
    // dispatch(savePaymentMethodCOD(paymentMethodCOD));
    navigate("/placeorder");
  };

  // Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className=" mx-auto  p-2">
      <ProgressSteps step1 step2 />
      <div className=" container mx-auto ">
      <div className="w-full my-12">
        <Title text1={"Shipping"} text2={"Info"}/>
        <form onSubmit={submitHandler} >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 '>
          {/* name */}
          <div className="">
            <label className="block text-color_4 mb-1 font-medium">Name</label>
            <Input type="text" placeholder="Enter name" value={username} onChange={(e) => setUserName(e.target.value)}/>
          </div>
          {/* address */}
          <div className="">
          <label className="block text-color_4 mb-1 font-medium">Address</label>
          <Input type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)}/>
          </div>
          {/* city */}
          <div className="">
          <label className="block text-color_4 mb-1 font-medium">City</label>
          <Input type="text" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)}/>
          </div>
          {/* state */}
          <div className="">
          <label className="block text-color_4 mb-1 font-medium">State</label>
          <Input type="text" placeholder="Enter state" value={state} onChange={(e) => setState(e.target.value)}/>
          </div>
          {/* zip code */}
          <div className="">
          <label className="block text-color_4 mb-1 font-medium">ZipCode</label>
          <Input type="Number" placeholder="Enter zip-code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}/>
          </div>
          {/* country */}
          <div className="">
          <label className="block text-color_4 mb-1 font-medium">Country</label>
          <Input type="text" placeholder="Enter country" value={country} onChange={(e) => setCountry(e.target.value)}/>
          </div>
          {/* phone */}
          <div className="">
          <label className="block text-color_4 mb-1 font-medium">Phone</label>
          <Input type="Number" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
          </div>
          {/*  */}
          <div></div>
          {/* payment method */}
          <div className="mb-4">
            <label className="block text-color_4 mb-1 font-medium">Select Method</label>
            <div className="grid grid-cols-2 mt-2">
              <div className="flex items-center gap-2">           
              <input
                  type="radio"
                  className="form-radio "
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              <label className="flex items-center ">Paypal</label>
              </div>
              <div className="flex items-center gap-2">             
              <input
                  type="radio"
                  className="form-radio"
                  name="paymentMethod"
                  value="COD" 
                  checked={paymentMethodCOD === "COD"}
                  onChange={(e) => setPaymentMethodCOD(e.target.value)}
                /> 
              <label className="flex items-center">Cash On Delivery</label>
              </div>
            </div>

            <div className="mt-6 w-full lg:w-[50rem]">
              <label className="block text-color_4 mb-1 font-medium">Note</label>
              <textarea className="mt-1 p-3 border rounded w-full placeholder-color_3 border-color_4/30" placeholder="Additional notes or instructions" 
              onChange={(e) => setNote(e.target.value)} value={note}
              ></textarea>
            </div>
            {/* <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio "
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2">PayPal or Credit Card</span>
              </label>
            </div> */}
          </div>
          </div>
          <div className="flex  gap-6 mt-6">
            <button
              type="submit"
              className="bg-color_6 btn hover:bg-rose-600"
            >
              Continue
            </button>
            <Link
              to="/cart"
              className="btn add-btn hover:bg-neutral-900"
            >
              Back to Cart
            </Link>
          </div>

        </form>
      </div>
      </div>
    </div>
  );
};

export default Shipping;
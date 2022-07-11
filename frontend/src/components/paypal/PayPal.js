import {memo} from "react";
import { PayPalScriptProvider} from "@paypal/react-paypal-js";

function PayPal({children}) {

  const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL
  };


  return (
  <PayPalScriptProvider options={initialOptions}>
    {children}
  </PayPalScriptProvider>
  );
}

export default memo(PayPal);
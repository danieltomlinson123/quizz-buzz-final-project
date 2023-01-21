import Context from "./Context";
import { useContext } from "react";

function withContext(Component) {
  // higher order component (hoc)

  return function (props) {
    const value = useContext(Context);

    return <Component {...props} context={value} />;
  };
}

export default withContext;

import { useEffect } from "react";

import { toast } from "react-toastify";

function Toasts() {
  useEffect(() => {
    toast("happy days", { theme: "colored" });
    toast.warn("🦄 Wow so easy!", {
      theme: "colored",
    });
    toast.info("🦄 Wow so easy!", {
      theme: "colored",
    });
    toast.error("🦄 Wow so easy!", {
      theme: "colored",
    });
    toast.success("🦄 Wow so easy!", {
      theme: "colored",
    });
    toast("🦄 Wow so easy!", {
      theme: "colored",
    });

    // dark

    toast.warn("🦄 Wow so easy!", {
      theme: "dark",
    });
    toast.info("🦄 Wow so easy!", {
      theme: "dark",
    });
    toast.error("🦄 Wow so easy!", {
      theme: "dark",
    });
    toast.success("🦄 Wow so easy!", {
      theme: "dark",
    });
    toast("🦄 Wow so easy!", {
      theme: "dark",
    });

    // light

    toast.warn("🦄 Wow so easy!", {
      theme: "light",
    });
    toast.info("🦄 Wow so easy!", {
      theme: "light",
    });
    toast.error("🦄 Wow so easy!", {
      theme: "light",
    });
    toast.success("🦄 Wow so easy!", {
      theme: "light",
    });
    toast("🦄 Wow so easy!", {
      theme: "light",
    });
  }, []);

  return <div style={{ height: "100%", backgroundColor: "black" }}></div>;
}

export default Toasts;

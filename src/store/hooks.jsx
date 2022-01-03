import { useContext } from "react";
import StoreContext from "./Context";

export const useStore = () => useContext(StoreContext);

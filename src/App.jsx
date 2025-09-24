import { RouterProvider } from "react-router-dom";
import { StockContextProvider } from "./pages/contexts/StockContext";
import router from "./router";

export default function App() {
  return (
    <StockContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </StockContextProvider>
  )
}
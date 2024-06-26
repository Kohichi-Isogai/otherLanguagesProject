import axios from "axios";
import "./App.css";
import "@mantine/core/styles.css";
import useSWR from "swr";
import { MantineProvider } from "@mantine/core";
import { HomePage } from "./page/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ItemListPage } from "./page/ItmeListPage";
import { CreatePage } from "./page/CreatePage";
import { EditDeletePage } from "./page/EditDeletePage";
import { BarCodePage } from "./page/BarCodePage";

function App() {
  const itemsInit = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };

  const { data, error, isLoading } = useSWR("/api/items", itemsInit);

  if (isLoading) return <div>loading...</div>;

  if (error) return <div>サーバーエラー</div>;

  return (
    <BrowserRouter>
      <MantineProvider>
        <Routes>
          <Route path="/">
            <Route path="home" element={<HomePage />}></Route>
            <Route path="create/:barCode" element={<CreatePage />}></Route>
            <Route path="items" element={<ItemListPage data={data} />}></Route>
            <Route path="/items/:id" element={<EditDeletePage />}></Route>
            <Route path="BarCode" element={<BarCodePage />}></Route>
          </Route>
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;

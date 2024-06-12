import axios from "axios";
import "./App.css";
import "@mantine/core/styles.css";
import useSWR from "swr";
import { MantineProvider } from "@mantine/core";
import { HomePage } from "./page/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ItemListPage } from "./page/ItmeListPage";
import { CreatePage } from "./page/CreatePage";

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
            <Route path="create" element={<CreatePage />}></Route>
            <Route path="items" element={<ItemListPage data={data} />}></Route>
          </Route>
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;

{
  /* <button
onClick={async () => {
  // const response = await axios.get("/api/items");
  console.log(data[0]);
}}
>
test
</button> */
}

import { ItemList } from "../components/ItemList";

export const ItemListPage = (props) => {
  const { data } = props;
  return (
    <>
      <h1>一覧</h1>
      <ItemList data={data} />
    </>
  );
};

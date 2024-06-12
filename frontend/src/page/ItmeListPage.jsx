import { ItemList } from "../components/ItemList";

export const ItemListPage = (props) => {
  const { data } = props;
  return (
    <>
      <ItemList data={data} />
    </>
  );
};

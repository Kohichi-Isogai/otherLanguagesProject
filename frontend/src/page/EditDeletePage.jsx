import { useParams } from "react-router-dom";
import { EditDelete } from "../components/EditDelete";
import { Group } from "@mantine/core";

export const EditDeletePage = () => {
  const { id } = useParams();

  return (
    <>
      <Group>
        <h1>更新</h1>
      </Group>
      <EditDelete id={id} />
    </>
  );
};

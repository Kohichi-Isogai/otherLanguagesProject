import { useParams } from "react-router-dom";
import { Create } from "../components/Create";

export const CreatePage = () => {
  const { barCode } = useParams();
  return (
    <>
      <h1>新規登録</h1>
      <Create barCode={barCode} />
    </>
  );
};

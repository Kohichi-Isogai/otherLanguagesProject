import { Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Stack>
      <div>新規作成</div>
      <div
        onClick={() => {
          navigate("/items");
        }}
      >
        一覧
      </div>
      <div>ピックアップ</div>
    </Stack>
  );
};

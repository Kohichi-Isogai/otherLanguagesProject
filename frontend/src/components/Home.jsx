import { Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Stack align="center">
      <Stack
        align="center"
        justify="center"
        gap="xs"
        style={{ border: " 2px solid #000", width: "60%", height: "20vh" }}
        onClick={() => {
          navigate("/BarCode");
        }}
      >
        <div style={{ fontSize: "200%", fontWeight: "bold" }}>+</div>
        <div>アイテム追加</div>
      </Stack>
      <Stack
        align="center"
        justify="center"
        gap="xl"
        style={{ border: " 2px solid #000", width: "60%", height: "20vh" }}
        onClick={() => {
          navigate("/items");
        }}
      >
        <div style={{ fontWeight: "bold", paddingRight: "7px" }}>
          <p style={{ margin: "0", height: "6px" }}>・ー</p>
          <p style={{ margin: "0", height: "6px" }}>・ー</p>
          <p style={{ margin: "0", height: "6px" }}>・ー</p>
        </div>
        <div>一覧</div>
      </Stack>
    </Stack>
  );
};

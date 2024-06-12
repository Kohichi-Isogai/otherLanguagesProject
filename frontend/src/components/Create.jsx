import { Button, Group, Stack } from "@mantine/core";
import { BackButton } from "./BackButton";

export const Create = () => {
  return (
    <>
      <Stack>
        <div>画像</div>
        <div>商品名</div>
        <div>個数</div>
        <div>日付</div>
      </Stack>
      <div
        style={{
          position: "fixed",
          bottom: "5%",
          width: "90%",
        }}
      >
        <Group justify="center" style={{}}>
          <BackButton url={"/home"} comment={"キャンセル"}></BackButton>
          <Button
            style={{
              width: "30%",
            }}
          >
            登録
          </Button>
        </Group>
      </div>
    </>
  );
};

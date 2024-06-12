import { Group, Stack } from "@mantine/core";

export const ItemList = (props) => {
  const { data } = props;
  console.log(data);
  return (
    <Stack>
      {data.map((data, index) => {
        return (
          <div key={index} style={{ border: " 2px solid #000" }}>
            <Group>
              <img src={data.image_url} />
              <Stack align="flex-start">
                <div
                  style={{
                    overflowX: "scroll",
                    // "word-break": "keep-all",
                    whiteSpace: "nowrap",
                    width: "200px",
                    paddingRight: "10px",
                  }}
                >
                  品名：{data.item}
                </div>
                <div>期限：{data.limit_date}</div>
                <div>残り：{data.quantity}</div>
              </Stack>
            </Group>
          </div>
        );
      })}
    </Stack>
  );
};

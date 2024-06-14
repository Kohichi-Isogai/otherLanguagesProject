import { Group, Stack } from "@mantine/core";
import { BackButton } from "./BackButton";
import { useNavigate } from "react-router-dom";

export const ItemList = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  return (
    <>
      <Stack justify="center">
        {data
          .sort((a, b) => {
            if (a.limit_date > b.limit_date) {
              return 1;
            } else {
              return -1;
            }
          })
          .map((data, index) => {
            const timeMM =
              (new Date(data.limit_date).getTime() - new Date().getTime()) /
              (60 * 60 * 1000);
            return (
              <div
                key={index}
                style={{ border: " 2px solid #000" }}
                onClick={() => {
                  navigate(`/items/${data.id}`);
                }}
              >
                <Group>
                  <img src={data.image_url} style={{ width: "30%" }} />
                  <Stack align="flex-start" style={{ width: "60%" }}>
                    <div
                      style={{
                        overflowX: "scroll",
                        whiteSpace: "nowrap",
                        width: "90%",
                        paddingRight: "10px",
                        textAlign: "left",
                      }}
                    >
                      品名：{data.item}
                    </div>
                    {timeMM > 24 ? (
                      <div>期限：{data.limit_date}</div>
                    ) : timeMM < 0 ? (
                      <div style={{ color: "red" }}>
                        期限：{data.limit_date}
                      </div>
                    ) : (
                      <div style={{ color: "orange" }}>
                        期限：{data.limit_date}
                      </div>
                    )}
                    <div>数量：{data.quantity}</div>
                  </Stack>
                </Group>
              </div>
            );
          })}
      </Stack>

      <div
        style={{
          position: "fixed",
          bottom: "5%",
          width: "90%",
          textAlign: "center",
        }}
      >
        <BackButton url={"/home"} comment={"戻る"} size={30}></BackButton>
      </div>
    </>
  );
};

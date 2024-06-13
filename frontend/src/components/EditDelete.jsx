import { Button, Group, Select, TextInput } from "@mantine/core";
import { BackButton } from "./BackButton";
import { useForm } from "@mantine/form";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { useNavigate } from "react-router-dom";
import selectData from "../config/selectData.json";

export const EditDelete = (props) => {
  const { id } = props;
  const navigate = useNavigate();

  const itemsInit = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      year: "",
      month: "",
      day: "",
      quantity: "",
    },
  });
  const { data, error, isLoading } = useSWR(`/api/items/${id}`, itemsInit);

  if (isLoading) return <div>loading...</div>;

  if (error) {
    return (
      <>
        <div>読み込み失敗</div>
      </>
    );
  }
  const itemPut = async (values) => {
    const day = `${values.year}-${values.month
      .toString()
      .padStart(2, "0")}-${values.day.toString().padStart(2, "0")}`;
    const request = {
      item: values.name,
      image_url: data[0].image_url,
      quantity: values.quantity,
      limit_date: day,
      id: id,
    };
    await axios.put("/api/items", request);

    mutate(itemsInit);
    navigate("/items");
  };

  if (data && !form.isDirty()) {
    form.setValues({
      name: data[0].item,
      year: data[0].limit_date.split("-")[0],
      month: String(Number(data[0].limit_date.split("-")[1])),
      day: String(Number(data[0].limit_date.split("-")[2])),
      quantity: data[0].quantity,
    });
  }

  return (
    <>
      <Button
        style={{
          position: "fixed",
          top: "10%",
          right: "10%",
        }}
        color="red"
        onClick={async () => {
          await axios.delete(`/api/items/${id}`);
          navigate("/items");
          mutate(itemsInit);
        }}
      >
        削除
      </Button>
      <img
        src={data[0].image_url}
        style={{ maxWidth: "200px", maxHeight: "200px" }}
      />
      <form onSubmit={form.onSubmit(itemPut)}>
        <TextInput
          label="商品名"
          placeholder="商品名を入力"
          {...form.getInputProps("name")}
        />
        <text style={{ fontSize: "14px" }}>消費期限</text>
        <Group gap="xs">
          <TextInput
            style={{ width: "40%" }}
            placeholder="年"
            {...form.getInputProps("year")}
          />
          <Select
            style={{ width: "20%" }}
            placeholder="月"
            data={selectData.month}
            {...form.getInputProps("month")}
          ></Select>

          <Select
            style={{ width: "20%" }}
            placeholder="日"
            data={selectData.day}
            {...form.getInputProps("day")}
          ></Select>
        </Group>
        <TextInput
          style={{ width: "40%" }}
          label="数量"
          placeholder="数量"
          {...form.getInputProps("quantity")}
        />

        <div
          style={{
            position: "fixed",
            bottom: "5%",
            width: "90%",
          }}
        >
          <Group justify="center">
            <BackButton url={"/items"} comment={"キャンセル"}></BackButton>
            <Button
              type="submit"
              style={{
                width: "30%",
              }}
            >
              更新
            </Button>
          </Group>
        </div>
      </form>
    </>
  );
};

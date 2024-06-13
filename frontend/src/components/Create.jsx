import { Button, Group, Select, TextInput } from "@mantine/core";
import { BackButton } from "./BackButton";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { useForm } from "@mantine/form";
import { useState } from "react";
import selectData from "../config/selectData.json";
import { useNavigate } from "react-router-dom";

export const Create = (props) => {
  const { barCode } = props;
  const [item, setItem] = useState("");
  const [isItem, setIsItem] = useState(false);
  const navigate = useNavigate();

  const itemsInit = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };

  const form = useForm({
    mode: "uncontrolled",
    // initialValues: {
    name: "",
    //   year: "",
    //   month: "",
    //   day: "",
    //   quantity: "",
    // },
  });
  const { data, error, isLoading } = useSWR(
    `/api/items/new/${barCode}`,
    itemsInit
  );

  if (isLoading) return <div>loading...</div>;

  if (error) {
    return (
      <>
        <div>読み込み失敗</div>

        <div
          style={{
            position: "fixed",
            bottom: "5%",
            width: "90%",
          }}
        >
          <BackButton url={"/BarCode"} comment={"再読み込み"} />
        </div>
      </>
    );
  }
  if (!isItem) {
    setIsItem(true);
    setItem(data.name);
  }
  const itemPost = async (values) => {
    const day = `${values.year}-${values.month
      .toString()
      .padStart(2, "0")}-${values.day.toString().padStart(2, "0")}`;
    const request = {
      //! 正しく読み込めたら修正
      item: data.name,
      image_url: data.image,
      quantity: values.quantity,
      limit_date: day,
      user_id: 1,
    };
    await axios.post("/api/items", request);

    mutate(itemsInit);
    navigate("/items");
  };

  if (data && !form.isDirty()) {
    form.setValues({
      name: data.name,
    });
  }

  return (
    <>
      <img src={data.image} style={{ maxWidth: "200px", maxHeight: "200px" }} />
      <form onSubmit={form.onSubmit(itemPost)}>
        {/* <form onSubmit={form.onSubmit((values) => console.log(values))}> */}
        <TextInput
          value={item}
          //! 文字が変わらないバグ修正
          //   onChange={() => {
          //     const text = document.getElementById("input").value;
          //     setIsItem(text);
          //   }}
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
            <BackButton url={"/home"} comment={"キャンセル"}></BackButton>
            <Button
              type="submit"
              style={{
                width: "30%",
              }}
            >
              登録
            </Button>
          </Group>
        </div>
      </form>
    </>
  );
};

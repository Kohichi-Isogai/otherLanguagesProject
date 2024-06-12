import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const BackButton = (props) => {
  const navigate = useNavigate();

  const { url, comment } = props;
  return (
    <>
      <Button
        style={{
          width: "30%",
        }}
        onClick={() => {
          console.log(url);
          navigate(url);
        }}
      >
        {comment}
      </Button>
    </>
  );
};

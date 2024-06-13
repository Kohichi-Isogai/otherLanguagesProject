import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const BackButton = (props) => {
  const navigate = useNavigate();

  const { url, comment, size = 100 } = props;
  return (
    <div>
      <Button
        style={{
          width: `${size}%`,
        }}
        onClick={() => {
          navigate(url);
        }}
      >
        {comment}
      </Button>
    </div>
  );
};

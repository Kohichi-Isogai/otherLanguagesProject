import { BackButton } from "../components/BackButton";
import { BarCode } from "../components/BarCode";

export const BarCodePage = () => {
  return (
    <>
      <h2>バーコード 読み取り</h2>
      <BarCode />
      <div
        style={{
          position: "fixed",
          bottom: "5%",
          width: "80%",
          textAlign: "center",
        }}
      >
        <BackButton url={"/home"} comment={"キャンセル"} />
      </div>
    </>
  );
};

import { useState } from "react";
import { Scanner } from "./Scanner";

export const BarCode = () => {
  const [camera, setCamera] = useState(true);

  const onDetected = (result) => {
    setCamera(!camera);
    window.location.href = "/create/" + result;
  };

  return (
    <section className="section-wrapper">
      <div className="section-title">
        <h1 className="section-title-text">
          {camera ? <Scanner onDetected={onDetected} /> : <p>読み込み中...</p>}
        </h1>
      </div>
    </section>
  );
};

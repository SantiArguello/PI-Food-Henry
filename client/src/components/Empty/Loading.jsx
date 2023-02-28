import React from "react";
import ReactLoading from "react-loading"
import s from "./loading.module.css"

export const Loading = () => {
  return (
<div className={s.loadingMain}>
  <div className={s.loading} >
  <ReactLoading type={"spinningBubbles"} color={"#4caf50"} height={200} width={200} />
</div>
</div>
  );
};

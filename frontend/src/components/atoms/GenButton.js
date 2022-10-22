import React, { useState } from "react";
import urlJoin from "url-join";
import Modal from "../organisms/Modal";
import Button from "./Button";

export default function GenButton() {
  const [codes, setCodes] = useState(["hoge", "fuga"]);
  const [showModal, setShowModal] = useState(false);

  const generate = e => {
    e.preventDefault();
    // flask の指定のURLにPOSTリクエストを送信して
    // コード情報を含んだJSONを取得し、モーダルを表示する
    const endpoint = urlJoin(process.env.REACT_APP_BACKEND_URL, "sample-code")
    fetch(endpoint, {method: "GET"})
    .then(res => res.json())
    .then(data => {
      setCodes(data["codes"]);
      setShowModal(true);
    });
  };

  return (
    <>
      <Button onSubmit={generate} btnValue="Generate" />
      <Modal showModal={showModal} setShowModal={setShowModal} codes={codes}/>
    </>
  );
}
import React, { useState } from "react";
import api from "../../utils/api";

const Forms = ({ formDataList, setFormDataList, getFormDataList, closeNewForm }) => {
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(0);
  const [isExpense, setIsExpense] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/account", {
        date,
        content,
        price,
        isExpense,
      });
      const newForm = response.data.data;
      setFormDataList({ ...formDataList, newForm });
      setDate("");
      setContent("");
      setPrice(0);
      setIsExpense(false);
      getFormDataList();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="new-item__form">
      <div className="new-item__form-info">
        <div>날자</div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="new-item__form-info">
        <div>내용: </div>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="new-item__form-info">
        <div>금액: </div>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value) || "")}
        />
      </div>

      <div className="amount__type">
        <label>
          Expense:
          <input
            type="checkbox"
            checked={isExpense}
            onChange={(e) => setIsExpense(e.target.checked)}
          />
        </label>
      </div>
      <div className="add-new-item-button">
        <button type="submit">제출</button>
        <button style={{ color: "red" }} onClick={closeNewForm}>취소</button>
      </div>
    </form>
  );
};

export default Forms;

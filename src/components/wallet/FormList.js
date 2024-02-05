import React, { useEffect, useState } from "react";
import api from "../../utils/api";

const FormList = ({
  formDataList,
  setFormDataList,
  onDelete,
  getFormDataList,
  filteredFormDataList,
}) => {
  const [updateId, setUpdateId] = useState(null);
  const [updateDate, setUpdateDate] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [updatePrice, setUpdatePrice] = useState(0);
  const [updateIsExpense, setUpdateIsExpense] = useState(false);

  const updateForm = (formData) => {
    setUpdateId(formData._id);
    setUpdateDate(formData.date);
    setUpdateContent(formData.content);
    setUpdatePrice(formData.price);
    setUpdateIsExpense(formData.isExpense);
  };

  const saveUpdateForm = async () => {
    try {
      await api.put(`/account/${updateId}`, {
        date: updateDate,
        content: updateContent,
        price: updatePrice,
        isExpense: updateIsExpense,
      });
      setFormDataList(
        formDataList.map((formData) => {
          if (formData._id === updateId) {
            return {
              ...formData,
              date: updateDate,
              content: updateContent,
              price: updatePrice,
              isExpense: updateIsExpense,
            };
          }
          return formData;
        })
      );
      setUpdateId(null);
      getFormDataList();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setUpdateId(null);
    setUpdateDate("");
    setUpdateContent("");
    setUpdatePrice(0);
    setUpdateIsExpense(false);
  };

  useEffect(() => {});
  return (
    <div className="formList__container">
      {filteredFormDataList.length > 0 &&
        filteredFormDataList.map((item, index) => (
          <div key={item._id} className="new-item__form">
            {updateId === item._id ? (
              <div className="new-item__form-info">
                <input
                  type="date"
                  value={updateDate}
                  onChange={(e) => setUpdateDate(e.target.value)}
                />
                <input
                  type="text"
                  value={updateContent}
                  onChange={(e) => setUpdateContent(e.target.value)}
                />
                <input
                  type="number"
                  value={updatePrice}
                  onChange={(e) =>
                    setUpdatePrice(parseFloat(e.target.value) || 0)
                  }
                />
                <label>
                  <input
                    type="checkbox"
                    checked={updateIsExpense}
                    onChange={(e) => setUpdateIsExpense(e.target.checked)}
                  />
                  Expense
                </label>
                <button onClick={saveUpdateForm}>저장</button>
                <button onClick={handleClose}>취소</button>
              </div>
            ) : (
              <div
                className="formList__title"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <div style={{ marginBottom: "5px" }}>{item.date}</div>
                  <div>내용: {item.content}</div>
                </div>
                <div>
                  <div style={{ marginBottom: "5px" }}>금액: {item.price}</div>
                  <div>유형: {item.isExpense ? "Expense" : "Income"}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <button className="list-btn" onClick={() => updateForm(item)}>
                    수정
                  </button>
                  <button
                    className="list-btn"
                    style={{ color: "red" }}
                    onClick={() => onDelete(item._id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default FormList;

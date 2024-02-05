import React, { useEffect, useState } from "react";
import Forms from "./Forms";
import FormList from "./FormList";
import AccountStatus from "./AccountStatus";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { userActions } from "../../action/userActions";

const AccountForm = () => {
  const [formDataList, setFormDataList] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalOutcome, setTotalOutcome] = useState(0);
  const [newForm, setNewForm] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");

  const dispatch = useDispatch();

  const logout = () =>{
    dispatch(userActions.logout());
  }

  const openNewForm = () => {
    setNewForm(true);
  };
  const closeNewForm = () => {
    setNewForm(false);
  };

  const getFormDataList = async () => {
    try {
      const response = await api.get("/account");
      const data = response.data.data;
      setFormDataList(data);

      let income = 0;
      let outcome = 0;
      data.forEach((item) => {
        if (item.isExpense) {
          outcome += item.price;
        } else {
          income += item.price;
        }
      });
      setTotalIncome(income);
      setTotalOutcome(outcome);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let income = 0;
    let outcome = 0;

    if (Array.isArray(formDataList)) {
      formDataList.forEach((item) => {
        if (item.date.includes(selectedYear)) {
          if (item.isExpense) {
            outcome += item.price;
          } else {
            income += item.price;
          }
        }
      });
    }
    setTotalIncome(income);
    setTotalOutcome(outcome);
  }, [selectedYear, formDataList]);

  useEffect(() => {
    getFormDataList();
  }, []);

  const onDelete = async (id) => {
    try {
      await api.delete(`/account/${id}`);
      setFormDataList(formDataList.filter((item) => item._id !== id));
      getFormDataList();
    } catch (error) {
      console.log(error);
    }
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  const filteredFormDataList = selectedYear
    ? formDataList.filter((formData) => formData.date.includes(selectedYear))
    : formDataList;

    

  return (
    <div>
      <div >
        <AccountStatus
          totalIncome={totalIncome}
          totalOutcome={totalOutcome}
          onSelectYear={handleYearSelect}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
        <FormList
          formDataList={formDataList}
          setFormDataList={setFormDataList}
          onDelete={onDelete}
          getFormDataList={getFormDataList}
          filteredFormDataList={filteredFormDataList}
        />
      </div>

      <div className="new-item__container">
        {!newForm && <button onClick={openNewForm}>내역 추가하기</button>}
        {newForm && (
          <Forms
            formDataList={formDataList}
            setFormDataList={setFormDataList}
            getFormDataList={getFormDataList}
            closeNewForm={closeNewForm}
          />
        )}
      </div>
      <div className="logout-btn">
        <button onClick={logout}>로그아웃</button>
      </div>
    </div>
  );
};

export default AccountForm;

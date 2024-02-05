import React from "react";
import Year from "./Year";


const AccountStatus = ({
  totalIncome,
  totalOutcome,
  onSelectYear,
  selectedYear,
  setSelectedYear,
}) => {
  const newYear = selectedYear === "" ? 2024 : selectedYear;

  return (
    <div>
      <div className="status__title">
        <h1>{newYear}년 재산 현황</h1>
        <strong>{parseFloat(totalIncome - totalOutcome)}원</strong>
      </div>
      <div className="status__detail">
        <div className="status__detail-content">
          <span>총 수입</span>
          <strong>{parseFloat(totalIncome)}원</strong>
        </div>
        <div className="status__detail-content">
          <span>총 지출</span>
          <strong>{parseFloat(totalOutcome)}원</strong>
        </div>
      </div>

      <Year
        onSelectYear={onSelectYear}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      
    </div>
  );
};

export default AccountStatus;

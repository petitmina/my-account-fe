import React from "react";

const Year = ({ onSelectYear, selectedYear, setSelectedYear}) => {


    const handleYearChange = (e) => {
        const year = e.target.value; 
        setSelectedYear(year); 
        onSelectYear(year); 
      };

      console.log(selectedYear,'year')
  return (
    <div className="year__container">
      <h2>연간 내역 </h2>
      <select
        className="filter fw-light"
        id="filter"
        name="filter"
        title="년도"
        aria-label="내역을 보고 싶은 년도를 선택하세요."
        value={selectedYear} 
        onChange={handleYearChange} 
      >
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
      </select>

    </div>
  );
};

export default Year;

import React from "react";
import Select from "react-select";

function Dropdown({ options, selectedOption, onOptionSelect }) {
  const handleChange = (selectedOption) => {
    onOptionSelect(selectedOption.value);
  };
  // Exclude selectedOption from the options list
  const selectOptions = options.map((option) => ({
    value: option,
    label: option,
  }));

  const selectStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#333" : "#666",
      backgroundColor: state.isFocused ? "transparent" : null,
      fontWeight: state.isFocused ? "500" : "100",
      fontSize: "16px",
      fontFamily:
        "SDB",
      cursor: "pointer",
    }),
    control: (provided) => ({
      ...provided,
      border: "none",
      boxShadow: "none", // remove blue border on focus
      width: 150, // set the width of the dropdown
    }),
    menu: (provided) => ({
      ...provided,
      width: 150, // set the width of the dropdown menu
    }),
    container: (provided) => ({
      ...provided,
      float: "right", // move dropdown to the right
    }),
  };

  return (
    <Select
      options={selectOptions}
      styles={selectStyles}
      onChange={handleChange}
      isSearchable={false} // disable search functionality
      value={{ value: selectedOption, label: selectedOption }}
    />
  );
}

export default Dropdown;

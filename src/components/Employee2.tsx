import React from "react";
import Router from "next/router";

import EmployeeProps from "../../utils/interfaces/EmployeeProps"; 

const Employee2: React.FC<{ employee: EmployeeProps }> = ({ employee }) => {
  return (
    <div className="bg-dark__alt text-white rounded-xl p-3 cursor-pointer duration-500 hover:scale-105">
        <div className="flex justify-between items-center">
          <p className="opacity-70">#{employee.num}</p>
          <p className="text-sm">{employee.role}</p>
        </div>
        <h2 className="text-lg font-bold">{employee.name}</h2>
    </div>
  );
};

export default Employee2;

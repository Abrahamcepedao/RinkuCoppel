import React from "react";
import Router from "next/router";

export type EmployeeProps = {
    num: number;
    name: string;
    role: string;    
};  

const Employee: React.FC<{ employee: EmployeeProps }> = ({ employee }) => {
  return (
    <div onClick={() => Router.push("/employee/[id]", `/employee/${employee.num}`)} className="bg-dark__alt rounded-xl p-3 cursor-pointer duration-500 hover:scale-105">
        <p>#{employee.num}</p>
      <h2>{employee.name}</h2>
      <small>By {employee.role}</small>
    </div>
  );
};

export default Employee;

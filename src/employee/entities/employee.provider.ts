import Employee from "./employee.entity";

export const employeeProvider =[{
    provide : 'EMPLOYEE_REPOSITORY',
    useValue : Employee
}]
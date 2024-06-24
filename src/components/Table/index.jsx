import React from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import useEmployees from '../../hooks/useEmployees';
import { useNavigate } from 'react-router-dom';

//Tabla de los empleados
const TableEmployees = () =>
    {
        const { employees, setEmployees, loading, error, deleteEmployee } = useEmployees();
        const navigate = useNavigate();
      
        return (
            <div>
              <Button variant= "primary" disabled={loading} onClick={()=> navigate('/create-employee')}>
                {loading ? <Spinner animation="border" size="sm" /> : "Crear"}
              </Button>
              
              {error && <p style={{ color: 'red' }}>{error.message}</p>}
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(employee => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.role}</td>
                      <td>
                    <Button color="primary" onClick={()=> navigate(`/edit-employee/${employee.id}`)}>Editar</Button>{" "}
                    <Button color="danger" onClick={()=> deleteEmployee(employee.id)}>Eliminar</Button>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          );
    };

 //Tabla de asistencia con el estado de presente (Eve)
 const Table = ({ records }) => {
   return (
    <table className="table">
       <thead>
         <tr>
           <th>Nombre</th>
           <th>Apellido</th>
           <th>DNI</th>
           <th>Estado</th>
         </tr>
       </thead>
       <tbody>
         {records.map((record, index) => (
           <tr key={index}>
             <td>{record.name}</td>
             <td>{record.lastName}</td>
             <td>{record.dni}</td>
             <td>{record.status === 'present' ? '✔️' : '❌'}</td>
           </tr>
         ))}
       </tbody>
     </table>
  );
};
export default TableEmployees;
export default Table;
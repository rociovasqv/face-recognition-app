import React from 'react';

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
export default Table;
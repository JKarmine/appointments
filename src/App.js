import React, { Fragment, useState, useEffect } from 'react';
import Form from './components/Form';
import Cita from './components/Cita';

function App() {

  // Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  const [citas, setCitas] = useState(citasIniciales);

  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  // Función que agrega una nueva cita
  const crearCita = cita => {
    setCitas([...citas, cita]);
  }

  // Función que elimina citas por id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    setCitas(nuevasCitas);
  };
  
  return (
    <Fragment>
      <h1>Administrador de citas</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form crearCita={crearCita} />
          </div>
          <div className="one-half column">
            {citas.length === 0 ? <h2>No hay citas</h2> : <h2>Administra tus citas</h2>}
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;

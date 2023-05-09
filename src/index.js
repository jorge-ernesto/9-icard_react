import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Importar Bootstrap 5
// Bootstrap 5 ha eliminado la dependencia de jQuery, lo que significa que puedes utilizar todas sus características
// y componentes sin necesidad de instalar jQuery.
// En resumen, puedes instalar Bootstrap en React sin instalar jQuery si utilizas la versión más reciente de Bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css'; // importar estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // importar el archivo js de Bootstrap

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

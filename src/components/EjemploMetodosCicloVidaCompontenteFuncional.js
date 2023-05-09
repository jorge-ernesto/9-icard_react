import React, { useEffect } from 'react';

export function EjemploMetodosCicloVidaCompontenteFuncional() {
    // Metodos de ciclo de vida de los componentes - funcionales en React

    // Equivalente a componentWillMount
    useEffect(() => {
        console.log('El componente se va a montar');
    }, []);

    // Equivalente a componentDidMount
    useEffect(() => {
        console.log('El componente se ha montado');

        // Función de limpieza para componentWillUnmount
        return () => {
            console.log('El componente se va a desmontar');
        };
    }, []);

    // El resto del componente
    return <div>Hola mundo</div>;
}

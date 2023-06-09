const nombreInput = document.querySelector('#nombre');
const cedulaInput = document.querySelector('#cedula');
const origenInput = document.querySelector('#origen');
const destinoInput = document.querySelector('#destino');
const idaInput = document.querySelector('#ida');
const vueltaInput = document.querySelector('#vuelta');
const personasInput = document.querySelector('#personas');

const formulario = document.querySelector('#nuevo-vuelo');
const contenedorVuelos = document.querySelector('#vuelos');

let editar, comparacion, comparacion2, comparacion3;
const max = 10;
const min = 1;

for (let i = min; i <= max; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.innerText = i;
    //appendCHild para ir apilando los elementos que voy generando con el create element
    personasInput.appendChild(option);
}

class vuelos {
    //vamos a almacenar los arreglos de los vuelos
    constructor() {
        this.vuelos = [];//en la clase constructor generar un arreglo de vuelos vacio
    }

    agregarVuelo(vuelo) {
        this.vuelos = [...this.vuelos, vuelo];
        console.log(this.vuelos);//para ver como se van agregando las vuelos
    }

    eliminarVuelo(id) {
        this.vuelos = this.vuelos.filter(vuelos => vuelos.id !== id);
    }

    editarVuelo(vueloAct) {
        this.vuelos = this.vuelos.map(vuelos => vuelos.id === vueloAct.id ? vueloAct : vuelos);
    }

    /*sintaxis
    condicion ? true : false

    estatus>30 ? estatus = 'temperatura elevada' : estatus = 'temperatura esta fresca'

    let estatus;
    if(estatus>30){
        estatus = 'temperatura elevada'
    }else{
        estatus = 'temperatura esta fresca'
    }*/
}

class ui {
    imprimirAlerta(mensaje, tipo) {
        //vamos un div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        //vamos a mostrar el mensaje de error
        divMensaje.textContent = mensaje;

        //agregamos el mensaje
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-vuelo'));

        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }

    //btn, btn-danger, mr-2
    imprimirVuelos({ vuelos }) {
        //console.log(vuelos);
        this.limpiarHTML();

        vuelos.forEach(vuelos => {
            const { nombre, cedula, origen, destino, ida, vuelta, personas, id } = vuelos;

            const divVuelo = document.createElement('div');
            divVuelo.classList.add('vuelo', 'p-3');
            //estamos creando un atributo personalizado
            divVuelo.dataset.id = id;

            //generar textos para las fichas de vuelos
            const nombreParrafo = document.createElement('h2');
            nombreParrafo.classList.add('card-title', 'font-weight-bolder');
            nombreParrafo.textContent = nombre;

            const cedulaParrafo = document.createElement('p');
            cedulaParrafo.innerHTML = `
                <span class="font-weigh-bolder">C.I: </span>${cedula}`;

            const origenParrafo = document.createElement('p');
            origenParrafo.innerHTML = `
                <span class="font-weigh-bolder">Origen: </span>${origen}`;

            const destinoParrafo = document.createElement('p');
            destinoParrafo.innerHTML = `
                <span class="font-weigh-bolder">Destino: </span>${destino}`;

            const idaParrafo = document.createElement('p');
            idaParrafo.innerHTML = `
                <span class="font-weigh-bolder">Ida: </span>${ida}`;

            const vueltaParrafo = document.createElement('p');
            vueltaParrafo.innerHTML = `
                <span class="font-weigh-bolder">Vuelta: </span>${vuelta}`;

            const personasParrafo = document.createElement('p');
            personasParrafo.innerHTML = `
                <span class="font-weigh-bolder">Personas: </span>${personas}`;

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnEliminar.onclick = () => eliminarVuelo(id);

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            btnEditar.onclick = () => cargarEdicion(vuelos);

            divVuelo.appendChild(nombreParrafo);
            divVuelo.appendChild(cedulaParrafo);
            divVuelo.appendChild(origenParrafo);
            divVuelo.appendChild(destinoParrafo);
            divVuelo.appendChild(idaParrafo);
            divVuelo.appendChild(vueltaParrafo);
            divVuelo.appendChild(personasParrafo);
            divVuelo.appendChild(btnEliminar);
            divVuelo.appendChild(btnEditar);

            contenedorVuelos.appendChild(divVuelo);
        })
    }

    limpiarHTML() {
        while (contenedorVuelos.firstChild) {
            contenedorVuelos.removeChild(contenedorVuelos.firstChild)
        }
    }
}

//nuevas instancias de la clase
const useri = new ui();
const administrarVuelos = new vuelos();

//eventos
eventListener();
function eventListener() {
    nombreInput.addEventListener('input', datosVuelos);
    cedulaInput.addEventListener('input', datosVuelos);
    origenInput.addEventListener('input', datosVuelos);
    destinoInput.addEventListener('input', datosVuelos);
    idaInput.addEventListener('input', datosVuelos);
    vueltaInput.addEventListener('input', datosVuelos);
    personasInput.addEventListener('input', datosVuelos);
    formulario.addEventListener('submit', nuevoVuelo);
}

//vamos a crear una estructura que me permita guardar la informacion
const vuelosObj = {
    nombre: '',
    cedula: '',
    origen: '',
    destino: '',
    ida: '',
    vuelta: '',
    personas: ''
}

function datosVuelos(e) {
    //console.log(e.target.name);
    vuelosObj[e.target.name] = e.target.value;
    console.log(vuelosObj);
}

function nuevoVuelo(e) {
    //validar y agregar un nuevo vuelo a la clase de vuelos
    e.preventDefault();//SIEMPRE VA A SER ASI (AL MENOS JS)

    //extraer la informacion del objeto de vuelo
    const { nombre, cedula, origen, destino, ida, vuelta, personas } = vuelosObj;

    //validacion
    if (origen === destino) {
        //console.log('Todos los campos son obligatorios');
        useri.imprimirAlerta('La ciudad de origen y destino no puede ser la misma', 'error');
        vuelosObj.origen = '';
        vuelosObj.destino = '';
        origenInput.value = '';
        destinoInput.value = '';
        comparacion = false;
    } else {
        comparacion = true;
    }

    /*el método substring devuelve la parte de la cadena desde el índice de inicio
     hasta el índice final menos uno, o hasta el final de la cadena si no se proporciona un índice final.*/
     var year_1 = ida.substring(0, 4);
     //console.log(year_1);
     var mes_1 = ida.substring(5, 7);
     //console.log(mes_1);
     var dia_1 = ida.substring(8, 10);
     //console.log(dia_1);
     var year_2 = vuelta.substring(0, 4);
     var mes_2 = vuelta.substring(5, 7);
     var dia_2 = vuelta.substring(8, 10);
 
     if (year_1 <= year_2) {
 
        if (mes_1 <= mes_2) {

            if (dia_1 <= dia_2) {
                comparacion2 = true;
            } else {
               useri.imprimirAlerta('El día correspondiente a la fecha de vuelta no puede ser el mismo o anterior al de la fecha de ida', 'error');
                vuelosObj.ida = '';                 
                vuelosObj.vuelta = '';
                idaInput.value = '';
                vueltaInput.value = ''; 
                comparacion2 = false;
            }
        } else {
           useri.imprimirAlerta('El mes correspondiente a la fecha de vuelta no puede ser anterior al de la fecha de ida', 'error');
            vuelosObj.ida = '';            
            vuelosObj.vuelta = '';             
            idaInput.value = '';
            vueltaInput.value = '';
            comparacion2 = false;
        }
    } else {
       useri.imprimirAlerta('El año correspondiente a la fecha de vuelta no puede ser anterior al de la fecha de ida', 'error');
        vuelosObj.ida = '';      
        vuelosObj.vuelta = ''; 
        idaInput.value = '';
        vueltaInput.value = ''; 
        comparacion2 = false;
    }

     const fecha = new Date();
     const yearActual = fecha.getFullYear();
     const diaActual = fecha.getDate();
     const mesActual = fecha.getMonth() + 1; 
 
     if (yearActual <= year_1 && yearActual <= year_2) {
 
         if ( mesActual <= mes_1 && mesActual <= mes_2) {
 
             if (diaActual <= dia_1 && diaActual <= dia_2) {
                 console.log('La fecha ingresada es posterior a la fecha actual');
                 comparacion3 = true;
             } else {
                useri.imprimirAlerta('El día seleccionado no puede ser anterior a la fecha actual', 'error');
                 vuelosObj.ida = '';                 
                 vuelosObj.vuelta = '';
                 idaInput.value = '';
                 vueltaInput.value = ''; 
                 comparacion3 = false;
             }
         } else {
            useri.imprimirAlerta('El mes seleccionado no puede ser anterior al de la fecha actual', 'error');
             vuelosObj.ida = '';            
             vuelosObj.vuelta = '';             
             idaInput.value = '';
             vueltaInput.value = '';
             comparacion3 = false;
         }
     } else {
        useri.imprimirAlerta('El año seleccionado no puede ser anterior al actual', 'error');
         vuelosObj.ida = '';      
         vuelosObj.vuelta = ''; 
         idaInput.value = '';
         vueltaInput.value = ''; 
         comparacion3 = false;
     }

    if (comparacion) {
        if (comparacion2) {
            if (comparacion3) {
                if (nombre === '' || cedula === '' || origen === '' || destino === '' || ida === '' || vuelta === '' || personas === '') {
                    //console.log('Todos los campos son obligatorios');
                    useri.imprimirAlerta('Todos los campos son obligatorios', 'error')
                    return;
                }
            } else {
                console.log('La fecha ingresada no es correcta');
                return;
            }            
        } else {
            console.log('La fecha ingresada no es correcta');
            return;
        }
    } else {
        console.log('La ciudad de origen y destino no puede ser la misma');
        return;
    }

    if (editar) {

        formulario.querySelector('button[type=submit]').textContent = 'Reservar vuelo';
        editar = false;
        administrarVuelos.editarVuelo({ ...vuelosObj });
        //mensaje datos correctos
        useri.imprimirAlerta('Se ha modificado el vuelo correctamente');
    } else {
        console.log('estoy creando un nuevo vuelo');
        //vamos a generar un id
        vuelosObj.id = Date.now();
        administrarVuelos.agregarVuelo({ ...vuelosObj });
        //mensaje datos correctos
        useri.imprimirAlerta('Se ha agregado el vuelo correctamenta');
    }

    //crear nuevos vuelos
    //console.log(vuelosObj);
    //reset al formulario
    formulario.reset();
    reiniciarObjeto();
    useri.imprimirVuelos(administrarVuelos);
}

function reiniciarObjeto() {
    vuelosObj.nombre = '';
    vuelosObj.cedula = '';
    vuelosObj.origen = '';
    vuelosObj.destino = '';
    vuelosObj.ida = '';
    vuelosObj.vuelta = '';
    vuelosObj.personas = '';
}

function eliminarVuelo(id) {
    //console.log(id)
    administrarVuelos.eliminarVuelo(id);
    //mostramos el mensaje
    useri.imprimirAlerta('el vuelo se eliminó correctamente');
    //actualizar el objeto
    useri.imprimirVuelos(administrarVuelos);
}

function cargarEdicion(vuelo) {
    //console.log(cita);
    const { nombre, cedula, origen, destino, ida, vuelta, personas, id } = vuelo;
    //llenar los inputs
    nombreInput.value = nombre;
    cedulaInput.value = cedula;
    origenInput.value = origen;
    destinoInput.value = destino;
    idaInput.value = ida;
    vueltaInput.value = vuelta;
    personasInput.value = personas;

    //vamos a llenar el objeto
    vuelosObj.nombre = nombre;
    vuelosObj.cedula = cedula;
    vuelosObj.origen = origen;
    vuelosObj.destino = destino;
    vuelosObj.ida = ida;
    vuelosObj.vuelta = vuelta;
    vuelosObj.personas = personas;
    vuelosObj.id = id;

    //vamos a cambiar el texto del boton
    formulario.querySelector('button[type=submit]').textContent = 'Guardar';

    editar = true;
}
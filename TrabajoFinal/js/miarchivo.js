const lblOficialCompra = document.getElementById("lblOficialCompra");
const lblOficialVenta = document.getElementById("lblOficialVenta");
const lblBlueCompra = document.getElementById("lblBlueCompra");
const lblBlueVenta = document.getElementById("lblBlueVenta");


fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    .then((res) => { 
       //return res.json()
       return res.json()
    }
    ).then((data) => {
            lblOficialCompra.innerText = "$" + data[0].casa.compra;
            lblOficialVenta.innerText = "$" + data[0].casa.venta;

            lblBlueCompra.innerText = "$" + data[1].casa.compra;
            lblBlueVenta.innerText = "$" + data[1].casa.venta;
    })




class Persona {
    constructor(nombre,apellido,dni,estado){
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.estado = estado;
    } 
}

let lista = document.getElementById("lista");
let personas = [];
let personasJSON = [];
const reg = new RegExp('^[0-9]+$');


//Función que responde al evento click del BOTÓN AGREGAR
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const dni = document.getElementById("dni");
    const estado = document.getElementById("estado");


function agregarPersona(){   

    //Condicionales para que la carga del DNI sea correcta
    if(dni.value.length != 8){                 
        window.swal("Error","DNI Incorrecto.", "error");
    } else if (nombre.value == ""){
        window.swal("Error","No se puede dejar campos en blanco", "error");
    } else if (apellido.value == ""){
        window.swal("Error","No se puede dejar campos en blanco", "error"); 
    } else if(!reg.test(dni.value)){
        window.swal("Error","El DNI debe contener sólo números.", "error");
    } else if (localStorage.getItem(dni.value) == null){ 
    
        //Se insancia el objeto de tipo Persona y se lo guarda en un array
        personas.push(new Persona(nombre.value,apellido.value,dni.value,estado.value)); 

        //let lista = document.getElementById("lista");

        let persona;
        //Se recorre el array de objetos
        for(persona of personas){}

        //Se guarda el objeto en otro array con formato JSON
        personasJSON.push(JSON.stringify(persona));
        //Se guarda el objeto en el "localStorage" donde "key: dni", "value: objeto tipo Persona".
        localStorage.setItem(persona.dni,JSON.stringify(persona));

        
        //Se incorpora el objeto al HTML
        lista.innerHTML +=`<tr>
                            <th scope="row">${persona.nombre}</th>
                            <td>${persona.apellido}</td>
                            <td>${persona.dni}</td>
                            <td>${persona.estado}</td>
                            </tr>` 
        
        
                    
        //MESSAGE BOX
        Toastify({
            text: "Usuario cargado.",
            gravity:"bottom",
            style: {
                background: "#157347",
            }
            }).showToast();
        //Se vacían los campos
        nombre.value = '';
        apellido.value = '';
        dni.value = '';
        estado.value = 'Activo';
        
    } else { 
        window.swal("Error","El DNI ya corresponde a un usuario.","error");
    }
}

//Funcion que responde al evento click del BOTÓN AGREGAR DESDE JSON

// FUNCION PARA TRAER DATOS DESDE JSON

function agregarPersonaDesdeJSON(){
    fetch("/TrabajoFinal/db/db.json")
            .then((res) =>{  btnAgregarJSON
                res.json()
            .then((data) => {
                data.forEach(persona => {
                    
              
                    if(localStorage.getItem(persona.dni) == null){

                        localStorage.setItem(persona.dni,JSON.stringify(persona));
                        lista.innerHTML +=`<tr>
                                <th scope="row">${persona.nombre}</th>
                                <td>${persona.apellido}</td>
                                <td>${persona.dni}</td>
                                <td>${persona.estado}</td>
                                </tr>` 
                    } else {

                        Toastify({
                            text: "El usuario con DNI " + persona.dni + " ya fue cargado.",
                            gravity:"bottom",
                            duration: 1000,
                            style: {
                                background: "red",
                                color: "withe"
                            }
                            }).showToast();
                

                    }
                });
            });})
}

    
//Función que responde al evento click del BOTÓN LIMPIAR STORAGE
function limpiarStorage() {
swal({
    title: "Esta seguro?",
    text: "Una vez eliminado los archivos no podrá volver atrás!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
    
        //Cantidad de elementos que tiene el localStorage
        let k = localStorage.length;
    
        localStorage.clear();

        //eliminar cantidad de elementos de la lista como tantos elementos tenga el localStorage
        for (let i = 0; i < k; i++) {
            let elemento = document.querySelector("#lista > *");
            elemento.remove();   
        }
        swal("Usuarios eliminados.", {
                icon: "success",
            });
    
      
    } 
  });
}
/*Esta función carga los elemetos que hayan quedado en el local storage
cuando se vuelve a abrir el navegador, la pestaña o se recarga la pag.
Responde al evento "onload"*/
function actualizarLista(){
    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        let persona = JSON.parse(localStorage.getItem(clave));
        

        lista.innerHTML +=`<tr>
        <th scope="row">${persona.nombre}</th>
        <td>${persona.apellido}</td>
        <td>${persona.dni}</td>
        <td>${persona.estado}</td>
        </tr>`   

    }
    
}




//EVENTOS
window.onload = actualizarLista;

const btnAgregar = document.getElementById("btnAgregar");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnAgregarJSON = document.getElementById("btnAgregarJSON");

btnLimpiar.addEventListener("click",(limpiarStorage));
btnAgregar.addEventListener("click",(agregarPersona));
btnAgregarJSON.addEventListener("click",(agregarPersonaDesdeJSON));







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
        console.log(data[0]);
            lblOficialCompra.innerText = "$" + data[0].casa.compra;
            lblOficialVenta.innerText = "$" + data[0].casa.venta;

        console.log(data[1]);
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

function agregarPersona(){   
    
    let nombre;
    let apellido;
    let dni;
    let estado;
    
    nombre = document.getElementById("nombre").value;
    apellido = document.getElementById("apellido").value;
    dni = document.getElementById("dni").value;
    estado = document.getElementById("estado").value;

    //Condicionales para que la carga del DNI sea correcta
    if(dni.length != 8){                 
        window.swal("Error","DNI Incorrecto.", "error");
    } else if(!reg.test(dni)){
        window.swal("Error","El DNI debe contener sólo números.", "error");
    } else if (localStorage.getItem(dni) == null){ 
    
        //Se insancia el objeto de tipo Persona y se lo guarda en un array
        personas.push(new Persona(nombre,apellido,dni,estado)); 

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

    } else { 
        window.swal("Error","El DNI ya corresponde a un usuario.","error");
    }
}

//Funcion que responde al evento click del BOTÓN AGREGAR DESDE JSON

// FETCH PARA CONECTAR ARCHIVO JSON

function agregarPersonaDesdeJSON(){
    fetch("/TrabajoFinal/db/db.json")
            .then((res) =>{  
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







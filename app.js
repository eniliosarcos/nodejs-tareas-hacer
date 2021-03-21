const colors = require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){
        // establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        
        opt = await inquirerMenu();

        switch (opt) {

            case '1':       
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;
            
            case '2':     
                tareas.listadoCompleto(); 
                break;

            case '3':     //listar completadas
                tareas.listarPendienteCompletadas(true); 
                break;

            case '4':     //listar pendientes
                tareas.listarPendienteCompletadas(false); 
                break;

            case '5':     //completado | pendiente
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;

            case '6':     //borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);

                if(id !== '0'){

                    const ok = await confirmar('Esta Seguro?');
    
                    if(ok){

                        tareas.borrarTarea(id);
                        console.log('\n Tarea Borrada!');
                    }
                }
                break;
            }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');
}

main();
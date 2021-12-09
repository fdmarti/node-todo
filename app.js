require('colors')
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar,confirmar,mostrarListadoCheckList } = require('./helpers/inquirer');

const Tareas = require('./models/tareas')

const main = async () => {
    console.clear();
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    if( tareasDB ){
        tareas.cargarTareasFromArray( tareasDB );
    }

    console.clear()
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const descr = await leerInput('Descripcion:');
                tareas.crearTarea(descr);
                break;
            case '2':
                tareas.listadoCompleto(tareas.listadoArr);
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar ( tareas.listadoArr );
                if(id !== '0'){
                    const ok = await confirmar('¿Estas seguro que quiere borrar la tarea?');
                    if( ok ){
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada correctamente'.yellow);
                    }
                }
                break;
        }

        guardarDB( tareas.listadoArr )

        await pausa()
    } while (opt != '0');
}

main();
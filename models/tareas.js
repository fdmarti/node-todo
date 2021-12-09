require('colors')
const Tarea = require('./tarea')

class Tareas {

    get listadoArr () {

        const listado = []
        //Object.keys Extrae en un array las keys de un object
        Object.keys(this._listado).forEach( el => listado.push(this._listado[el]))
        return listado
    }

    constructor () {
        this._listado = {}
    }

    borrarTarea ( id = '' ){
        if ( this._listado[id] ){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach( el => this._listado[el.id] = el)
    }

    crearTarea( desc = '' ) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto ( tareas = [] ) {
        console.log()
        for (let i = 0; i < tareas.length; i++) {
            let estado;
            tareas[i].completadoEn ? estado = `Completado`.green : estado = `Pendiente`.red

            const idx = `${i+1}`.green;
            console.log(`${idx} - ${tareas[i].desc} :: ${estado}`)
        }
    }

    listarPendientesCompletadas( completadas = true ){
        let i = 1;
        console.log()
        this.listadoArr.forEach( (el) => {
            if(completadas){
                if(el.completadoEn){
                    const idx = `${i}.`.green
                    console.log(`${idx} ${el.desc} :: ${el.completadoEn.green}`)
                    i += 1
                }
            }else{
                if(!el.completadoEn){
                    const idx = `${i}.`.red
                    console.log(`${idx} ${el.desc}`)
                    i += 1
                }

            }
        })
    }

    toggleCompletadas(tareasCompletadas = [] ){

        tareasCompletadas.forEach( id => {
            const tarea = this._listado[id]
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( el => {
            if( !tareasCompletadas.includes(el.id) ){
                this._listado[el.id].completadoEn = null;
            }
        });
    }

}

module.exports = Tareas
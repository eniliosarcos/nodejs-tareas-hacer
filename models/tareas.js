const Tarea = require('./tarea');
const colors = require('colors');
/**
 *  _listado:
 *      { 'uuid-123123189-1231723123-2: { id:12, desc:asd, completadoEn:99323 } },
 */
class Tareas {

    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []){

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = ''){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){

        console.log('\n');

        this.listadoArr.forEach((tarea, i) => {

            const index = `${i+1}.`.green;
            const {desc, completadoEn} = tarea;

            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;

            console.log(`${index} ${ desc } :: ${estado}`);
        });
    }

    listarPendienteCompletadas(completadas = true){

        console.log('\n');

        let contador = 0;

        this.listadoArr.forEach((tarea) => {

            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red

            if(completadas){
                if(completadoEn){
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`);
                }
            }else{
                if(!completadoEn){
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
                }
            }
        });
    }

    toggleCompletadas(ids = []){

        ids.forEach(id => {

            const tarea = this._listado[id];

            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        });


        this.listadoArr.forEach(tarea => {

            if(!ids.includes(tarea.id)){

                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;
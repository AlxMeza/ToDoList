import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import TaskTable from '@/Components/DataTables/TaskTable'
import AddTask from '@/Components/AddTask'
import AsignTask from '@/Components/AsignTask'
import AddCurrentTask from '@/Components/AddCurrentTask'
import { Head } from '@inertiajs/react'
import { useEffect, useState, useRef } from 'react'
import { Dialog } from 'primereact/dialog'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'
import { Toast } from 'primereact/toast'

export default function Task (props) {
  const [trigger, setTrigger] = useState(true)
  const [ dialog, setDialog ] = useState(false)
  const [ dialogo, setDialogo ] = useState(false)
  const [ currentTask, setCurrentTask ] = useState(false)
  const [ position ] = useState('center')
  const [ data, setData ] = useState([])
  const toast = useRef(null)

  //Toast
  const showToast = (severity, summary, detail) => {
    toast.current.show({severity: severity, summary: summary, detail: detail, life: 3000});
  }

  useEffect(() => {
   if(trigger) {
    fetch(`/api/get/task/${props.auth.user.id}`)
      .then(res => res.json())
      .then(data => {
        data.map(el => {
          if(el.comentario === null) el.comentario = 'No hay comentarios'
        })
        setData(data)
        setTrigger(false)
      })
   }
  }, [trigger])

  return(
    <>
      <AuthenticatedLayout auth={props.auth} errors={props.errors}> <Head title="Actividades" />
        <Toast ref={toast} />
        <section className='my-10 xl:w-2/3 lg:w-3/4 md:w-3/4 sm:w-full w-full mx-auto border-2 rounded-lg px-5 py-4 text-center'>
          <h1 className='my-5 text-center text-2xl text-blue-900'>Lista de actividades</h1>
          <button className='my-2 py-2 px-4 border-2 border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50 w-10/12' 
          onClick={() => setDialog(true)}>Añadir Actividad</button>
          <button className='my-2 py-2 px-4 border-2 border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50 w-10/12' 
          onClick={() => setCurrentTask(true)}>Crear Tarea Recurrente</button>
          { props.auth.user.rol < 4 &&  <button className='my-2 py-2 px-4 border-2 border-indigo-700 text-indigo-700 rounded-lg hover:bg-indigo-50 w-10/12' 
          onClick={() => setDialogo(true)}>Asignar Actividad</button> }
          <div className='my-10'></div>
          <AddTask dialog={dialog} setDialog={setDialog} setTrigger={setTrigger} showToast={showToast} props={props} />
          <AsignTask dialogo={dialogo} setDialogo={setDialogo} setTrigger={setTrigger} showToast={showToast} props={props} />
          <AddCurrentTask currentTask={currentTask} setCurrentTask={setCurrentTask} setTrigger={setTrigger} showToast={showToast} props={props} />
          <TaskTable data={data} setTrigger={setTrigger} showToast={showToast} props={props}/>
        </section>
      </AuthenticatedLayout>
    </>
  )
}
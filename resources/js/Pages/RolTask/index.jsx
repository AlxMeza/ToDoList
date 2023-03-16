import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import AdminTaskTable from '@/Components/DataTables/AdminTaskTable'
import { Head } from '@inertiajs/react'
import { useEffect, useState, useRef } from 'react'
import { Dialog } from 'primereact/dialog'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'
import { Toast } from 'primereact/toast'

export default function RolTask (props) {
  const [trigger, setTrigger] = useState(true)
  const [ data, setData ] = useState([])
  const toast = useRef(null)

  //Toast
  const showToast = (severity, summary, detail) => {
    toast.current.show({severity: severity, summary: summary, detail: detail, life: 3000});
  }

  useEffect(() => {
   if(trigger) {
    fetch(`/api/get/roltask/${props.auth.user.rol}`)
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
      <AuthenticatedLayout auth={props.auth} errors={props.errors}> <Head title="Actividades de los usuarios" />
        <Toast ref={toast} />
        <section className='my-10 xl:w-2/3 lg:w-3/4 md:w-3/4 sm:w-full w-full mx-auto border-2 rounded-lg px-5 py-4 text-center'>
          <h1 className='my-5 text-center text-2xl text-blue-900'>Actividades de los Usuarios</h1>
          <AdminTaskTable data={data} setTrigger={setTrigger} showToast={showToast} props={props} />
        </section>
      </AuthenticatedLayout>
    </>
  )
}
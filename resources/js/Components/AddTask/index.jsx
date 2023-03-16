import { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'

export default function AddTask ({dialog, setDialog, setTrigger, showToast, props}) {
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedItem2, setSelectedItem2] = useState(null)
  const progreso = [ 'No iniciada', 'En proceso', 'Finalizada' ]
  const prioridad = [ 'Baja', 'Media', 'Alta' ]

  const handleSubmit = (e) => {
    e.preventDefault()
    let status = true
    let datos = {
      user_id: props.auth.user.id,
      user_name: props.auth.user.name,
      rol_usuario: props.auth.user.rol,
      fecha_inicio: document.getElementById('inicio').value,
      fecha_compromiso: document.getElementById('final').value,
      description: document.getElementById('descripcion').value,
      progress: selectedItem,
      priority: selectedItem2
    }
    for ( const property in datos ){
      if(datos[property] === '' || datos[property] === null || datos[property] === undefined){
        status = false
        break
      }
    }
    if(status){
      fetch('/api/post/task', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      })
        .then(res => res.json())
        .then(response => {
          showToast('success', 'Success', 'Se ha añadido una nueva actividad.')
          setDialog(false)
          setTrigger(true)
          setSelectedItem(null)
          setSelectedItem2(null)
        })
    }else{
      showToast('info', 'Datos Incompletos', 'Favor de llenar todos los campos del formulario')
    }
  }

  //Templates
  const progressItemTemplate = (option) => {
    return option === 'En proceso' ? <span className='bg-yellow-100 px-2 py-1 border rounded-md text-yellow-700 border-yellow-700'>En proceso</span>
    : option === 'Finalizada' ? <span className='bg-green-100 px-2 py-1 border rounded-md text-green-700 border-green-700'>Finalizada</span>
    : option === 'No iniciada' ? <span className='bg-blue-100 px-2 py-1 border rounded-md text-blue-700 border-blue-700'>No iniciada</span> 
    : <span className='bg-purple-100 px-2 py-1 border rounded-md text-purple-700 border-purple-700'>No especificado</span>
  }
  
  const progressValueTemplate = (option, props) => {
    if(option){
     return(
        option === 'En proceso' ? <span className='bg-yellow-100 px-2 py-1 border rounded-md text-yellow-700 border-yellow-700'>En proceso</span>
        : option === 'Finalizada' ? <span className='bg-green-100 px-2 py-1 border rounded-md text-green-700 border-green-700'>Finalizada</span>
        : option === 'No iniciada' ? <span className='bg-blue-100 px-2 py-1 border rounded-md text-blue-700 border-blue-700'>No iniciada</span> 
        : <span className='bg-purple-100 px-2 py-1 border rounded-md text-purple-700 border-purple-700'>No especificado</span>
     )
    }
    return ( <span>{props.placeholder}</span> )
  }
  
  const priorityItemTemplate = (option) => {
    return option === 'Baja' ? <span className='bg-amber-100 px-4 py-1 border rounded-md text-amber-700 border-amber-700'>Baja</span>
    : option === 'Media' ? <span className='bg-orange-100 px-4 py-1 border rounded-md text-orange-700 border-orange-700'>Media</span> 
    : option === 'Alta' ? <span className='bg-red-100 px-4 py-1 border rounded-md text-red-700 border-red-700'>Alta</span>
    : <span className='bg-slate-100 px-4 py-1 border rounded-md text-slate-700 border-slate-700'>No especificada</span>
  }
  
  const priorityValueTemplate = (option, props) => {
    if(option){
      return option === 'Baja' ? <span className='bg-amber-100 px-4 py-1 border rounded-md text-amber-700 border-amber-700'>Baja</span>
        : option === 'Media' ? <span className='bg-orange-100 px-4 py-1 border rounded-md text-orange-700 border-orange-700'>Media</span> 
        : option === 'Alta' ? <span className='bg-red-100 px-4 py-1 border rounded-md text-red-700 border-red-700'>Alta</span>
        : <span className='bg-slate-100 px-4 py-1 border rounded-md text-slate-700 border-slate-700'>No especificada</span>
    }
    return ( <span>{props.placeholder}</span> )
  }

  return (
    <Dialog header="Añadir Actividad" visible={dialog} onHide={() => setDialog(false)} breakpoints={{'960px': '75vw'}} style={{width: '50rem'}}>
      <form className='p-fluid mt-4' onSubmit={handleSubmit}> 
        <div className='mb-3'><Calendar inputId='inicio' placeholder='Fecha de Inicio' inputStyle={{fontSize: '0.85rem', padding: '.5rem 1rem'}} dateFormat="dd/mm/yy" locale='es'></Calendar></div>
        <div className='mb-3'><Calendar inputId='final' placeholder='Fecha Compromiso' inputStyle={{fontSize: '0.85rem', padding: '.5rem 1rem'}} dateFormat="dd/mm/yy" locale='es'></Calendar></div>
        <div className='mb-3'><InputTextarea id='descripcion' placeholder='Descripción' style={{fontSize: '0.85rem', padding: '.5rem 1rem'}} autoResize rows={2}/></div>
        <div className='mb-3'><Dropdown value={selectedItem} options={progreso} placeholder='Progreso' itemTemplate={progressItemTemplate} style={{alignItems: 'center', padding: '0 .3rem'}}
          className="text-sm" panelStyle={{fontSize: '0.85rem'}} valueTemplate={progressValueTemplate} onChange={(e) => setSelectedItem(e.value)}/></div>
        <div className='mb-3'><Dropdown value={selectedItem2} options={prioridad} placeholder='Prioridad' itemTemplate={priorityItemTemplate} style={{alignItems: 'center', padding: '0 .3rem'}}
          className="text-sm" panelStyle={{fontSize: '0.85rem'}} valueTemplate={priorityValueTemplate} onChange={(e) => setSelectedItem2(e.value)}/></div>
        <button className='mb-5 mt-10 py-2 w-full border bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 outline-none focus:ring focus:ring-indigo-300'>Agregar</button>
      </form>
    </Dialog>
  )
}
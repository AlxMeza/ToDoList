import { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputTextarea } from 'primereact/inputtextarea'

export default function AddCurrentTask ({currentTask, setCurrentTask, setTrigger, showToast, props}) {
  const [ selectedItem, setSelectedItem ] = useState(null)
  const [ daySelected, setDaySelected ] = useState(null)
  const [ monthSelected, setMonthSelected ] = useState(null)
  const periodicity = [ 'Semanal', 'Mensual', 'Anual' ]
  const progreso = [ 'No iniciada', 'En proceso', 'Finalizada' ]
  const prioridad = [ 'Baja', 'Media', 'Alta' ]
  const [ daysInMonth ] = useState( new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate() )

  const months = [ { num: 1, name: 'Enero' }, { num: 2, name: 'Febrero' }, { num: 3, name: 'Marzo' }, { num: 4, name: 'Abril' }, { num: 5, name: 'Mayo' },
  { num: 6, name: 'Junio' }, { num: 7, name: 'Julio' }, { num: 8, name: 'Agosto' }, { num: 9, name: 'Septiembre' }, { num: 10, name: 'Octubre' }, 
  { num: 11, name: 'Noviembre' }, { num: 12, name: 'Diciembre' }]


  const handleSubmit = (e) => {
    e.preventDefault()
    let status = true
    let dia = selectedItem === 'Semanal' ? 0 : daySelected
    let datos = {
      user_id: props.auth.user.id,
      user_name: props.auth.user.name,
      rol_usuario: props.auth.user.rol,
      description: document.getElementById('descripcion').value,
      periodicity: selectedItem,
      period: dia
    }
    for ( const property in datos ){
      if(datos[property] === '' || datos[property] === null || datos[property] === undefined){
        status = false
        break
      }
    }
    if(status){
      fetch('/api/post/currenttask', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      })
        .then(res => res.json())
        .then(response => {
          showToast('success', 'Success', 'Se ha creado una actividad recurrente.')
          setCurrentTask(false)
          setTrigger(true)
          setSelectedItem(null)
          setDaySelected(null)
          setMonthSelected(null)
        })
    }else{
      showToast('info', 'Datos Incompletos', 'Favor de llenar todos los campos del formulario')
    }
  }


  return (
    <Dialog header="Añadir Actividad" visible={currentTask} onHide={() => setCurrentTask(false)} breakpoints={{'960px': '75vw'}} style={{width: '50rem'}}>
      <form className='p-fluid mt-4' onSubmit={handleSubmit}> 
        <div className='mb-3'><InputTextarea id='descripcion' placeholder='Descripción' style={{fontSize: '0.85rem', padding: '.5rem 1rem'}} autoResize rows={2} required/></div>
        <div className='mb-3'><Dropdown value={selectedItem} options={periodicity} placeholder='Periodicidad' style={{alignItems: 'center', padding: '0 .3rem'}}
          className="text-sm" panelStyle={{fontSize: '0.85rem'}} onChange={(e) => setSelectedItem(e.value)}/></div>

          { selectedItem !== null && selectedItem === 'Mensual' ? <InputNumber inputId='day' placeholder='Día de Actualización' 
          inputStyle={{fontSize: '0.85rem', padding: '.5rem 1rem'}} onChange={(e) => setDaySelected(e.value) } min={0} max={daysInMonth} /> 
          : selectedItem !== null && selectedItem === 'Anual' && <Dropdown optionLabel='name' value={monthSelected} options={months} style={{alignItems: 'center', padding: '0 .3rem'}} 
          className="text-sm" panelStyle={{fontSize: '0.85rem'}} placeholder='Mes' onChange={(e) => {
            setDaySelected(e.value.num)
            setMonthSelected(e.value)
          }} /> }

        <button className='mb-5 mt-10 py-2 w-full border bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 outline-none focus:ring focus:ring-indigo-300'>Añadir</button>
      </form>
    </Dialog>
  )
}
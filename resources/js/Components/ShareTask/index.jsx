import { OverlayPanel } from 'primereact/overlaypanel'
import { useEffect, useState } from 'react'
import { Dropdown } from 'primereact/dropdown'

export default function ShareTask ( {data, op, showToast, props} ) {
  const [ users, setUsers ] = useState([])
  const [ selectedUser, setSelectedUser ] = useState({})

  useEffect(() => {
    fetch(`/api/get/shareuser/${props.auth.user.id}`)
      .then(res => res.json())
      .then(el => setUsers(el))
  }, [])

  const handlerClick = () => {
    let { fecha_inicio, fecha_compromiso, description, comment, priority, progress } = data
    fecha_inicio = new Date(fecha_inicio).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' })
    fecha_compromiso = new Date(fecha_compromiso).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' })

    if( Object.keys(selectedUser).length > 0 ){
      let user_id = selectedUser.id
      let user_name = selectedUser.name
      let rol_usuario = selectedUser.rol
      fetch('/api/post/task', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, user_name, fecha_inicio, fecha_compromiso, description, comment, priority, progress, rol_usuario })
      })
        .then(res => res.json())
        .then(response => {
          showToast('success', 'Success', `Se ha compartido una actividad con ${selectedUser.name}`)
          setSelectedUser(null)
          op.current.toggle(false)
        })
    }else {
      showToast('warn', 'Cuidado', 'Selecciona un usuario antes de compartir una actividad.')
    }
  }

  return(
    <>
      <OverlayPanel ref={op} showCloseIcon id="overlay_panel" style={{width: '15rem'}}>
        <h1 className='font-semibold text-center'>Compartir con: </h1>
        <div className='my-4 p-fluid'><Dropdown value={selectedUser} options={users} placeholder='Compartir' style={{alignItems: 'center', padding: '0 .3rem', height: '2rem'}}
          className="text-sm" panelStyle={{fontSize: '0.85rem'}} onChange={(e) => setSelectedUser(e.value)} optionLabel='name'/></div>
        <div className='mx-4'><button className='px-2 py-1 border w-full rounded-md border-blue-700 text-blue-700 hover:bg-blue-100' onClick={handlerClick}>Compartir</button></div>
      </OverlayPanel>
    </>
  )
}
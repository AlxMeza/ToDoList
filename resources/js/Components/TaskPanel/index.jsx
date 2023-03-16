import { useEffect, useState } from 'react'

function LayoutTask ( { url, count, image, label } ) {
  return <a className="relative w-full" href={url}>
      <img src={image} alt="todo" className="object-cover h-[15rem] w-[35rem] mb-5"/>
      <div className='absolute h-full w-full top-0 rounded-lg bg-[#434656] opacity-70 transition duration-300 ease-out hover:opacity-0'>
        <p className='text-white font-semibold text-4xl absolute top-1/3 text-center w-full'>{`${label} `} 
        <span className='text-6xl text-red-400 font-semibold'>{count}</span></p>
      </div>
  </a>
}

function LayoutTaskMini ( { url, label, count } ) {
  return <a className='flex flex-row gap-4 h-full border-2 border-gray-400 rounded-lg hover:bg-sky-50' href={url}>
      <p className='text-gray-900 xl:text-2xl lg:text-xl font-semibold mx-auto place-self-center text-center px-4'>{label}</p>
      <p className='font-semibold xl:text-6xl lg:text-4xl mx-auto place-self-center text-sky-600 px-4'>{count}</p>
  </a>
}

export default function TaskPanel ( {props} ){
  const [ activities, setActivities ] = useState([0, 0, 0])
  useEffect(() => {
    fetch(`/api/get/counttask/${props.auth.user.id}/${props.auth.user.rol}`)
      .then(res => res.json())
      .then(data => setActivities(data))
  }, [])

  return(
    <>
      { props.auth.user.rol < 4 ? <div className='grid grid-cols-1 gap-4 my-4'>
          <LayoutTask url='/tareas' count={activities[0]} image={'/todo1.svg'} label='Mis Tareas' />
          <LayoutTask url='/tareas/asignadas' count={activities[1]} image={'/todo2.svg'} label='Tareas Asignadas' />
          <LayoutTask url='/tareas/usuarios' count={activities[2]} image={'/todo3.svg'} label='Tareas de los Usuarios' />
          {/* <div className='grid grid-rows gap-2'>
            <LayoutTaskMini url='/tareas/asignadas' label='Actividades Asignadas' count={activities[1]} />
            <LayoutTaskMini url='/tareas/usuarios' label='Actividades de los usuarios' count={activities[2]} />
          </div> */}
      </div> : <div className='grid grid-cols-1 gap-4 my-4'><LayoutTask url='/tareas' count={activities[0]} image={'/todo1.svg'} label='Mis Tareas' /></div> }
    </>
  )
}
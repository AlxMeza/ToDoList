import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import CryptoJS from 'crypto-js'
import { Head } from "@inertiajs/react"
import { SECRET_KEY, empresa1Url } from '@/helpers'
import TaskPanel from '@/Components/TaskPanel'

export default function Home (props) {

  return(
    <>
      <AuthenticatedLayout auth={props.auth} errors={props.errors}> <Head title="Dashboard" />
      <section className='lg:px-20 md:px-10 mx-1 h-screen grid md:grid-cols-2 sm:grid-cols-1 grid-cols-1'>
        <section className='px-10 md:block sm:hidden hidden'>
          <div className="my-10 px-5 py-10 h-full grid">
            <div className="place-self-center">
              <h2 className="text-center font-semibold lg:text-7xl md:text-5xl py-4 text-[#17376D]">Bienvenido a </h2>
              <h3 className="text-center font-semibold lg:text-5xl md:text-4xl py-4 text-[#17376D]">ToDoList for Everyone</h3>
            </div>
          </div>
        </section>
        <div className='md:place-self-center border-gray-900 mt-5 shadow-lg py-10 px-20 rounded-lg bg-neutral-200'>
          <TaskPanel props={props} />
        </div>
      </section>
      </AuthenticatedLayout>
    </>
  )
}
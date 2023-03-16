export default function Header () {

  return(
    <>
      <nav className='w-full fixed py-3 px-5 bg-gray-900'>
        <img src="/logo.svg" alt="Logo" className="w-[5rem] inline"/>
        <span className="mx-5 font-semibold text-2xl align-middle text-white">LexCode</span>
      </nav>
    </>
  )
}
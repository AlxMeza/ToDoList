import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault()
        localStorage.setItem('user', JSON.stringify(data))
        post(route('login'))
    }

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            {/* <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={handleOnChange}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={handleOnChange}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} onChange={handleOnChange} />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form> */}
            <Header />
            <section className='w-full h-screen grid md:grid-cols-2 sm:grid-cols-1 grid-cols-1'>
                <div className='place-self-center py-10 px-5 border-gray-900 lg:w-8/12 md:w-10/12 sm:w-full w-full'>
                    <h2 className='font-semibold text-gray-900 text-4xl mb-10 text-center'>!Bienvenido!</h2>
                    <form className='mx-4 mx-0' onSubmit={submit}>
                    <TextInput placeholder='Correo Electronico' id="email" type="email" name="email" value={data.email} className="mt-1 block w-full" autoComplete="username" isFocused={true} onChange={handleOnChange} />
                    <TextInput placeholder='Contraseña' id="password" type="password" name="password" value={data.password} className="mt-1 block w-full" autoComplete="current-password" onChange={handleOnChange}/>
                      <div className='mx-10'>
                        <button className='mt-2 border-sky-600 border-2 w-full text-center text-white bg-sky-600 rounded-[20px] font-semibold text-lg focus:outline-none 
                        focus:border-sky-700 focus:ring-1 focus:ring-sky-700 relative bg-gradient-to-r from-[#3b82f6] to-[#17376D] cssbuttons-io'><span>Entrar</span></button>
                        {/* <button className='mt-4 border-sky-600 border-2 w-full text-center text-white bg-sky-600 rounded-[20px] py-1 font-semibold text-lg
                        hover:bg-sky-700 focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700'>Entrar</button> */}
                      </div>
                    </form>
                </div>

                <div className="place-self-center bg-indigo-300 lg:py-[8.2rem] md:py-[5rem] rounded-full md:block sm:hidden hidden">
                  <img src="/login.svg" alt="LoginImage"/>
                </div>
            </section>
        </GuestLayout>
    );
}

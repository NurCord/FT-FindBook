import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser, loginUser } from '../../../redux/actions/actions';
import Swal from "sweetalert2";

function createUserValidator (createUserForm) {
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const createUserForbidden = {};
    const mailValidator = re.test(createUserForm.mail);
    Object.keys(createUserForm).forEach(property => {
        if (!createUserForm[property]) {
            createUserForbidden.title = `Todos los campos son obligatorios`;
        }
    })
    if (createUserForm.mail.length > 0 && !mailValidator) createUserForbidden.mail = 'E-mail inválido';
    if (createUserForm.password2 !== createUserForm.password) createUserForbidden.password2 = 'Las contraseñas deben coincidir';
    return createUserForbidden;
}

function userValidator (userForm) {
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const userForbidden = {};
    const mailValidator = re.test(userForm.mail);
    Object.keys(userForm).forEach(property => {
        if (!userForm[property]) {
            userForbidden.title = `Todos los campos son obligatorios`;
        }
    })
    if (userForm.mail.length > 0 && !mailValidator) userForbidden.mail = 'E-mail inválido';
    return userForbidden;
}

let createUserState = {
    name: '',
    lastname: '',
    mail: '',
    password: '',
    password2: '',
    username: '',
    url: '',
};

let userState = {
    username: '',
    mail: '',
    password: ''
};

export default function Login() {
    const [ showLogin, setShowLogin ] = useState(true);
    const [ showSignUp, setShowSignUp ] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ createUserForm, setCreateUserForm ] = useState({
        username: '',
        mail: '',
        password: '',
        password2: '',
    });
    const [ userForm, setUserForm ] = useState({
        username: '',
        password: '',
    });
    const [ createUserForbidden, setCreateUserForbidden ] = useState({});
    const [ userForbidden, setUserForbidden ] = useState({});

    const handleClick = (e) => {
        e.preventDefault();
        setShowSignUp((showSignUp) => !showSignUp);
        setShowLogin((showLogin) => !showLogin);
    };

    function handleCreateUserFormChange (e) {
        setCreateUserForm({
            ...createUserForm,
            [e.target.name] : e.target.value
        });
        setCreateUserForbidden(createUserValidator({
            ...createUserForm,
            [e.target.name]: e.target.value
        }))
    };

    function handleUserFormChange (e) {
        setUserForm({
            ...userForm,
            [e.target.name] : e.target.value
        });
        setUserForbidden(userValidator({
            ...userForm,
            [e.target.name]: e.target.value
        }))
    };
    function handleCreateUserFormSubmit (e) {
        setCreateUserForbidden(createUserValidator(createUserForm))
        e.preventDefault();
        if(Object.keys(createUserForbidden).length !== 0 || createUserForm === createUserState){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios!',
            })
        }
        return Swal.fire({
            title: 'Estas seguro?',
            text: "No podrás revertirlo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Confirmar!'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(createUserForm)
                dispatch(registerUser({
                    username: createUserForm.username,
                    email: createUserForm.mail,
                    password: createUserForm.password,
                    url: `https://ui-avatars.com/api/?name=${createUserForm.name}+${createUserForm.lastname}?background=F0EDE5`,
                    name: createUserForm.name,
                    lastname: createUserForm.lastname
                }));
                setCreateUserForm(createUserState)
                Swal.fire(
                    'Confirmar!',
                    `Bienvenido ${createUserForm.username}`,
                    'success'
                ).then(()=>window.location.reload())
            }
        })
    }

    function handleUserFormSubmit (e) {
        e.preventDefault();
        setUserForm(userState)
        navigate('/');
        console.log({
            email: userForm.mail,
            password: userForm.password
        });
        dispatch(loginUser({
            email: userForm.mail,
            password: userForm.password
        }))
        Swal.fire({
            title: `Bienvenido ${userForm.mail}`,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        }).then(()=>window.location.reload())
    }
    
    if (showSignUp) {
        return (
            <div className = 'bg-cream-100 w-11/12 m-auto max-w-xl rounded-2xl px-14 py-6'>
                <div>
                    <div>
                        <form className = 'flex flex-col justify-center' onSubmit={e => handleCreateUserFormSubmit (e)}>
                            <h1 className = 'flex justify-center pb-1'>Registrarse</h1>
                            <div className = 'flex flex-row'>
                                <div className = 'px-2'>
                                    <label>Nombre</label><br></br>
                                    <input type = 'text' name = 'name' value = {createUserForm.name} onChange={e => handleCreateUserFormChange (e)} className = 'text-center rounded-lg text-slate-600' /><br></br>
                                </div>
                                <div className = 'px-2'>
                                    <label>Apellido</label><br></br>
                                    <input type = 'text' name = 'lastname' value = {createUserForm.lastname} onChange={e => handleCreateUserFormChange (e)} className = 'text-center rounded-lg text-slate-600' /><br></br>
                                </div>
                            </div>
                            <div className = 'flex flex-row'>
                                <div className = 'px-2'>
                                    <label>Nick Usuario</label><br></br>
                                    <input type = 'text' name = 'username' value = {createUserForm.username} onChange={e => handleCreateUserFormChange (e)} className = 'text-center rounded-lg text-slate-600' /><br></br>
                                </div>
                                <div className = 'px-2'>
                                    <label>E-mail</label><br></br>
                                    <input type = 'email' name = 'mail' value = {createUserForm.mail} onChange={e => handleCreateUserFormChange (e)} className = 'text-center rounded-lg text-slate-600' /><br></br>
                                </div>
                            </div>
                            {createUserForbidden.mail && ( <p key = 'mailError' className = "text-center text-orange-600">{createUserForbidden.mail}</p> )}
                            <div className = 'flex flex-row'>
                                <div className = 'px-2'>
                                    <label>Contraseña</label><br></br>
                                    <input type = 'password' name = 'password' value = {createUserForm.password} onChange={e => handleCreateUserFormChange (e)} className = 'text-center rounded-lg text-slate-600'/><br></br>
                                </div>
                                <div className = 'px-2'>
                                    <label>Confirmar contraseña</label><br></br>
                                    <input type = 'password' name = 'password2' value = {createUserForm.password2} onChange={e => handleCreateUserFormChange (e)} className = 'text-center rounded-lg text-slate-600'/><br></br>
                                </div>
                            </div>
                            {createUserForbidden.password2 && ( <p key = 'passwordError' className = "text-center text-orange-600">{createUserForbidden.password2}</p> )}
                            <div className = 'flex flex-col items-center justify-centerpy-5'>
                                <label>Avatar</label><br></br>
                                <img id='avatar' src = {`https://ui-avatars.com/api/?name=${createUserForm.name ? createUserForm.name : ' '}+${createUserForm.lastname ? createUserForm.lastname : ' '}${createUserForm.lastname ? '?background=F0EDE5' : ' '}`} alt = 'Avatar' className = 'rounded-3xl'/>
                                {/* <input type = 'url' name = 'url' value = {createUserForm.url} onChange={e => handleCreateUserFormChange (e)} className = 'text-center rounded-lg text-slate-600' /><br></br> */}
                                <input type = 'submit' value = 'Crear cuenta'  onClick = { (e) => handleCreateUserFormSubmit(e) }className = 'w-1/2 font-sans bg-sky-500 text-slate-50 border-none font-normal px-2 py-2 my-3 rounded cursor-pointer hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400'/>
                                <label className = 'flex justify-center'>¿Ya tienes cuenta?</label><br></br>
                                <input type = 'submit' value = 'Iniciar sesión' onClick = { (e) => handleClick(e) } className = 'w-1/2 font-sans bg-sky-500 text-slate-50 border-none font-normal px-2 py-2 my-3 rounded cursor-pointer hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400'></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    if (showLogin) {
        return (
            <div className = 'bg-cream-100 w-11/12 m-auto max-w-sm rounded-2xl px-14 py-6'>
                <div>
                    <div>
                        <form className = 'flex flex-col justify-center' onSubmit={e => handleUserFormSubmit (e)}>
                            <h1 className = 'flex justify-center'>Iniciar sesión</h1>
                            <label>E-mail</label><br></br>
                            <input type = 'email' name = 'mail' value = {userForm.mail} onChange={e => handleUserFormChange (e)} className = 'text-center rounded-lg text-slate-600'/><br></br>
                            {userForbidden.mail && ( <p key = 'mailError' className = "flex text-orange-600">{userForbidden.mail}</p> )}
                            <label>Contraseña</label><br></br>
                            <input type = 'password' name = 'password' value = {userForm.password} onChange={e => handleUserFormChange (e)} className = 'text-center rounded-lg text-slate-600'/><br></br>
                            <input type = 'submit' value = 'Ingresar' className = 'font-sans bg-sky-500 text-slate-50 border-none font-normal px-2 py-2 my-3 rounded cursor-pointer hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400'/>
                            <label className = 'flex justify-center'>¿Aún no tienes cuenta?</label><br></br>
                            <label className = 'flex justify-center'>Puedes registrarte gratis</label><br></br>
                            <input type = 'submit' value = 'Crear cuenta' onClick = { (e) => handleClick(e) } className = 'font-sans bg-sky-500 text-slate-50 border-none font-normal px-2 py-2 my-3 rounded cursor-pointer hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400'></input>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
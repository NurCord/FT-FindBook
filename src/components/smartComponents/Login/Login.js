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
    return createUserForbidden;
}

let createUserState = {
    username: '',
    mail: '',
    password: '',
    password2: '',
};

let userState = {
    username: '',
    mail: '',
    password: '',
    password2: '',
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
                    url: 'url',
                    name: 'Mauricio',
                    lastname: 'Castilla'
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
            email: userForm.username,
            password: userForm.password
        });
        dispatch(loginUser({
            email: userForm.username,
            password: userForm.password
        }))
        Swal.fire({
            title: `Bienvenido ${userForm.username}`,
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
            <div className = 'bg-cream-100 w-11/12 m-auto max-w-sm rounded-2xl px-14 py-6'>
                <div >
                    <div>
                        <form className = 'flex flex-col justify-center' onSubmit={e => handleCreateUserFormSubmit (e)}>
                            <h1 className = 'flex justify-center'>Registrarse</h1>
                            <label>Usuario</label><br></br>
                            <input type = 'text' name = 'username' value = {createUserForm.username} onChange={e => handleCreateUserFormChange (e)} className = 'text-center rounded-lg text-slate-600' /><br></br>
                            <label>E-mail</label><br></br>
                            <input type = 'text' name = 'mail' value = {createUserForm.mail} onChange={e => handleCreateUserFormChange (e)} className = 'text-center rounded-lg text-slate-600' /><br></br>
                            <label>Contraseña</label><br></br>
                            <input type = 'password' name = 'password' value = {createUserForm.password} onChange={e => handleCreateUserFormChange (e)} className = 'text-center rounded-lg text-slate-600'/><br></br>
                            <label>Confirmar contraseña</label><br></br>
                            <input type = 'password' name = 'password2' value = {createUserForm.password2} onChange={e => handleCreateUserFormChange (e)} className = 'text-center rounded-lg text-slate-600'/><br></br>
                            <input type = 'submit' value = 'Crear cuenta'  onClick = { (e) => handleCreateUserFormSubmit(e) }className = 'font-sans bg-sky-500 text-slate-50 border-none font-normal px-2 py-2 my-3 rounded cursor-pointer hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400'/>
                            <label className = 'flex justify-center'>¿Ya tienes cuenta?</label><br></br>
                            <input type = 'submit' value = 'Inicia sesión pulsando aquí' onClick = { (e) => handleClick(e) } className = 'font-sans bg-sky-500 text-slate-50 border-none font-normal px-2 py-2 my-3 rounded cursor-pointer hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400'></input>
                        </form>
                    </div>
                </div>
            </div>
        )    
    }

    if (showLogin) {
        return (
            <div className = 'bg-cream-100 w-11/12 m-auto max-w-sm rounded-2xl px-14 py-6'>
                <div >
                    <div>
                        <form className = 'flex flex-col justify-center' onSubmit={e => handleUserFormSubmit (e)}>
                            <h1 className = 'flex justify-center'>Iniciar sesión</h1>
                            <label>Usuario</label><br></br>
                            <input type = 'text' name = 'username' value = {userForm.username} onChange={e => handleUserFormChange (e)} className = 'text-center rounded-lg text-slate-600'/><br></br>
                            <label>Contraseña</label><br></br>
                            <input type = 'password' name = 'password' value = {userForm.password} onChange={e => handleUserFormChange (e)} className = 'text-center rounded-lg text-slate-600'/><br></br>
                            <input type = 'submit' value = 'Ingresar' className = 'font-sans bg-sky-500 text-slate-50 border-none font-normal px-2 py-2 my-3 rounded cursor-pointer hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400'/>
                            <label className = 'flex justify-center'>¿Aún no tienes cuenta?</label><br></br>
                            <label className = 'flex justify-center'>Puedes registrarte gratis</label><br></br>
                            <input type = 'submit' value = 'Crea cuenta pulsando aquí' onClick = { (e) => handleClick(e) } className = 'font-sans bg-sky-500 text-slate-50 border-none font-normal px-2 py-2 my-3 rounded cursor-pointer hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400'></input>
                        </form>                    
                    </div>
                </div>
            </div>
        )
    }
}
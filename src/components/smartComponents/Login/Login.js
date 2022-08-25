import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { registerUser, loginUser, googleLogRes } from '../../../redux/actions/actions';
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import clsx from 'clsx'
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
        if (!userForm[property] || userForm[property] === '') {
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

export default function Login() {
    const [ showLogin, setShowLogin ] = useState(true);
    const [ showSignUp, setShowSignUp ] = useState(false);
    const dispatch = useDispatch();
    const [ createUserForm, setCreateUserForm ] = useState(createUserState);
    const [ userForm, setUserForm ] = useState({
        mail: '',
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
            [e.target.name] : e.target.value,
            url: `https://ui-avatars.com/api/?name=${createUserForm.name}+${createUserForm.lastname}?background=F0EDE5`,
        });
        setCreateUserForbidden(createUserValidator({
            ...createUserForm,
            [e.target.name]: e.target.value,
            url: `https://ui-avatars.com/api/?name=${createUserForm.name}+${createUserForm.lastname}?background=F0EDE5`,
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
        e.preventDefault();
        let voidForm = false;
        for(const property in createUserForm) {
            if (createUserForm[property] === '') voidForm = true;
        }
        setCreateUserForbidden(createUserValidator(createUserForm))
        if(Object.keys(createUserForbidden).length !== 0 || voidForm === true){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios!',
            })
        } else {
            return Swal.fire({
                title: 'Estas seguro?',
                text: "No podrás revertirlo",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'No, Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Confirmar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(registerUser({
                        username: createUserForm.username,
                        email: createUserForm.mail,
                        password: createUserForm.password,
                        url: `https://ui-avatars.com/api/?name=${createUserForm.name}+${createUserForm.lastname}?background=F0EDE5`,
                        name: createUserForm.name,
                        lastname: createUserForm.lastname
                    }));                    
                    setCreateUserForm(createUserState)
                }
            })
        }
    }

    function handleCallbackResponse (response){
        // console.log("Encoded JWT ID token: " + response.credential);
        const googleLogin = jwt_decode(response.credential);
        dispatch(googleLogRes(googleLogin))
        // document.getElementById("signInDiv").hidden = true;
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "569317957647-3eg4sjqbiotum9jak6kcc80qr0lt97gb.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large"}
        )

        google.accounts.id.prompt();
    }, [showLogin])

    function handleUserFormSubmit (e) {
        e.preventDefault();
        let voidForm = false;
        if (userForm.mail === '' || userForm.password === '') voidForm = true;
        if(Object.keys(userForbidden).length !== 0 || voidForm === true){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios!',
            })
        } else {
            dispatch(loginUser({
                email: userForm.mail,
                password: userForm.password
            }))
        }
    }
    
    if (showSignUp) {
        return (
            <div className = {clsx(
                'mobile:w-full',
                'desktop:w-11/12 desktop:max-w-xl desktop:py-6 desktop:m-auto bg-cream-100 rounded-2xl desktop:px-14')}>
                <div>
                    <div>
                        <form className = 'flex flex-col justify-center' onSubmit={e => handleCreateUserFormSubmit (e)}>
                            <h1 className = {clsx( 
                                'mobile:py-4',
                                'flex justify-center desktop:pb-5')}>Registrarse</h1>
                            {/* <div id = "signInDiv"></div> */}
                            <div className ={clsx( 
                                'mobile:flex-col',
                                'flex desktop:flex-row')}>
                                <div className = {clsx( 
                                    'mobile:m-auto mobile:flex mobile:flex-col mobile:items-center',
                                    'desktop:px-2')}>
                                    <label>Nombre</label><br></br>
                                    <input type = 'text' name = 'name' value = {createUserForm.name} onChange={e => handleCreateUserFormChange (e)} className = 'text-center rounded-lg text-slate-600' /><br></br>
                                </div>
                                <div className = {clsx( 
                                    'mobile:m-auto mobile:flex mobile:flex-col mobile:items-center',
                                    'desktop:px-2')}>
                                    <label>Apellido</label><br></br>
                                    <input type = 'text' name = 'lastname' value = {createUserForm.lastname} onChange={e => handleCreateUserFormChange (e)} className = 'text-center rounded-lg text-slate-600' /><br></br>
                                </div>
                            </div>
                            <div className ={clsx( 
                                'mobile:flex-col mobile:justify-center mobile:',
                                'flex desktop:flex-row')}>
                                <div className = {clsx( 
                                    'mobile:m-auto mobile:flex mobile:flex-col mobile:items-center',
                                    'desktop:px-2')}>
                                    <label>Nick Usuario</label><br></br>
                                    <input type = 'text' name = 'username' value = {createUserForm.username} onChange={e => handleCreateUserFormChange (e)} className = 'text-center rounded-lg text-slate-600' /><br></br>
                                </div>
                                <div className = {clsx( 
                                    'mobile:m-auto mobile:flex mobile:flex-col mobile:items-center',
                                    'desktop:px-2')}>
                                    <label>E-mail</label><br></br>
                                    <input type = 'email' name = 'mail' value = {createUserForm.mail} onChange={e => handleCreateUserFormChange (e)} className = 'text-center rounded-lg text-slate-600' /><br></br>
                                </div>
                            </div>
                            {createUserForbidden.mail && ( <p key = 'mailError' className = "text-center text-orange-600">{createUserForbidden.mail}</p> )}
                            <div className ={clsx( 
                                'mobile:flex-col',
                                'flex desktop:flex-row')}>
                                <div className = {clsx( 
                                    'mobile:m-auto mobile:flex mobile:flex-col mobile:items-center',
                                    'desktop:px-2')}>
                                    <label>Contraseña</label><br></br>
                                    <input type = 'password' name = 'password' value = {createUserForm.password} onChange={e => handleCreateUserFormChange (e)} className = 'text-center rounded-lg text-slate-600'/><br></br>
                                </div>
                                <div className = {clsx( 
                                    'mobile:m-auto mobile:flex mobile:flex-col mobile:items-center',
                                    'desktop:px-2')}>
                                    <label>Confirmar contraseña</label><br></br>
                                    <input type = 'password' name = 'password2' value = {createUserForm.password2} onChange={e => handleCreateUserFormChange (e)} className = 'text-center rounded-lg text-slate-600'/><br></br>
                                </div>
                            </div>
                            {createUserForbidden.password2 && ( <p key = 'passwordError' className = "text-center text-orange-600">{createUserForbidden.password2}</p> )}
                            <div className = 'flex flex-col items-center justify-centerpy-5'>
                                <label>Avatar</label><br></br>
                                <img id='avatar' src = {`https://ui-avatars.com/api/?name=${createUserForm.name ? createUserForm.name : ' '}+${createUserForm.lastname ? createUserForm.lastname : ' '}${createUserForm.lastname ? '?background=F0EDE5' : ' '}`} alt = 'Avatar' className = 'rounded-3xl'/>
                                {Object.entries(createUserForbidden).length === 0 ? 
                                <input type = 'submit' value = 'Crear cuenta'  onClick = { (e) => handleCreateUserFormSubmit(e) }className = 'w-1/2 px-2 py-2 my-3 font-sans font-normal border-none rounded cursor-pointer bg-sky-500 text-slate-50 hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400'/>
                                :
                                <input type = 'submit' value = 'Crear cuenta'  onClick = { (e) => handleCreateUserFormSubmit(e) }className = 'w-1/2 px-2 py-2 my-3 font-sans font-normal text-gray-800 no-underline border-none rounded pointer-events-none bg-zinc-600'/>}
                                <label className = 'flex justify-center'>¿Ya tienes cuenta?</label><br></br>
                                <input type = 'submit' value = 'Iniciar sesión' onClick = { (e) => handleClick(e) } className = 'w-1/2 px-2 py-2 my-3 font-sans font-normal border-none rounded cursor-pointer bg-sky-500 text-slate-50 hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400'></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    if (showLogin) {
        return (
            <div className = 'w-11/12 max-w-sm py-6 m-auto bg-cream-100 rounded-2xl px-14'>
                <div>
                    <div>
                        <form className = 'flex flex-col justify-center' onSubmit={e => handleUserFormSubmit (e)}>
                            <h1 className = 'flex justify-center'>Iniciar sesión</h1>
                            <label>E-mail</label><br></br>
                            <input type = 'email' name = 'mail' value = {userForm.mail} onChange={e => handleUserFormChange (e)} className = 'text-center rounded-lg text-slate-600'/><br></br>
                            {userForbidden.mail && ( <p key = 'mailError' className = "flex text-orange-600">{userForbidden.mail}</p> )}
                            <label>Contraseña</label><br></br>
                            <input type = 'password' name = 'password' value = {userForm.password} onChange={e => handleUserFormChange (e)} className = 'text-center rounded-lg text-slate-600'/><br></br>
                            <input type = 'submit' value = 'Ingresar' className = 'px-2 py-2 my-3 font-sans font-normal border-none rounded cursor-pointer bg-sky-500 text-slate-50 hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400'/>
                            <label className = 'flex justify-center'>¿Tienes cuenta google?</label><br></br>
                            <div id = "signInDiv" className = 'self-center w-5/6 py-2'></div>
                            <label className = 'flex justify-center'>¿Aún no tienes cuenta?</label><br></br>
                            <label className = 'flex justify-center'>Puedes registrarte gratis</label><br></br>
                            <input type = 'submit' value = 'Crear cuenta' onClick = { (e) => handleClick(e) } className = 'px-2 py-2 my-3 font-sans font-normal border-none rounded cursor-pointer bg-sky-500 text-slate-50 hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400'></input>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
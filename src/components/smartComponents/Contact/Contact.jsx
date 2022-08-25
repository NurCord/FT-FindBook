import React from 'react';

export default function Contacto() {
    return (
        <form 
            className = 'w-11/12 max-w-sm py-6 m-auto bg-cream-100 rounded-2xl px-14'
            action = 'https://formsubmit.co/cesar-catalan@hotmail.es'
            method = 'POST'> {/*form*/}
            <div className = 'grid w-full gap-4 auto-cols-auto'> {/*form_container*/}
                <h2 className = 'mb-8 font-sans text-2xl text-center'>Contáctanos</h2> {/*form_container*/}
                <h4 className = 'mb-8 font-sans text-center'>Por favor, llena el siguiente formulario si deseas contactarnos</h4> {/*form_container*/}
                <input name = 'name' type = 'text' placeholder = 'Nombre...' className = 'px-6 py-4 font-sans text-base border border-solid rounded outline-none border-slate-300'></input> {/*form_input*/}
                <input name = 'email' type = 'text' placeholder = 'ejemplo@mail.com' className = 'px-6 py-4 font-sans text-base border border-solid rounded outline-none border-slate-300'></input> {/*form_input*/}
                <textarea name = 'comments' placeholder = 'Mensaje...' className = 'px-6 py-2 rounded resize-none'></textarea> {/*form_input form_input-message*/}
                <input type = 'submit' value = 'Enviar' className = 'px-2 py-3 font-sans font-normal border-none rounded cursor-pointer bg-sky-500 text-slate-50 hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400'></input> {/*form_cta*/}
            </div>
            <input type = 'hidden' name = '_next' value = 'http://localhost:3000/contacto/agradecimiento'></input>
            <input type = 'hidden' name = '_captcha' value = 'false'></input>
            <input type = 'hidden' name = '_subject' value = 'New submission!'></input>
            <input type = 'hidden' name = '_cc' value = 'nunyypin@gmail.com,nelnico008@gmail.com,rmauriciocastilla@gmail.com'></input> 
        </form>
    )
}

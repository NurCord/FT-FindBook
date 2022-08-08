import React from 'react';

export default function Contacto() {
    return (
            <form 
                className = 'bg-cream-100 w-11/12 m-auto max-w-sm rounded-2xl px-14 py-6'
                action = 'https://formsubmit.co/cesar-catalan@hotmail.es'
                method = 'POST'> {/*form*/}
                <div className = 'w-full grid gap-4 auto-cols-auto'> {/*form_container*/}
                    <h2 className = 'text-center font-sans text-2xl mb-8'>Contáctanos</h2> {/*form_container*/}
                    <h4 className = 'text-center font-sans mb-8'>Por favor, llena el siguiente formulario si deseas contactarnos</h4> {/*form_container*/}
                    <input name = 'name' type = 'text' placeholder = 'Nombre...' className = 'font-sans text-base px-6 py-4 outline-none border border-solid border-slate-300 rounded'></input> {/*form_input*/}
                    <input name = 'email' type = 'text' placeholder = 'ejemplo@mail.com' className = 'font-sans text-base px-6 py-4 outline-none border border-solid border-slate-300 rounded'></input> {/*form_input*/}
                    <textarea name = 'comments' placeholder = 'Mensaje...' className = 'resize-none px-6 py-2 rounded'></textarea> {/*form_input form_input-message*/}
                    <input type = 'submit' value = 'Enviar' className = 'font-sans bg-sky-500 text-slate-50 border-none font-normal px-2 py-3 rounded cursor-pointer hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400'></input> {/*form_cta*/}
                </div>
                <input type = 'hidden' name = '_next' value = 'http://localhost:3000/contacto/agradecimiento'></input>
                <input type = 'hidden' name = '_captcha' value = 'false'></input>
                <input type = 'hidden' name = '_subject' value = 'New submission!'></input>
                {/* <input type = 'hidden' name = '_cc' value = 'nunyypin@gmail.com,nelnico008@gmail.com,rmauriciocastilla@gmail.com'></input> */}
            </form>
    )
}

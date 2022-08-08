import React from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ThanksPage() {
    const navigate = useNavigate();
    return (
        <div className = 'bg-cream-100 w-11/12 m-auto max-w-sm rounded-2xl px-14 py-6'>
        <div className = 'w-full grid gap-4 auto-cols-auto'>
            <h2 className = 'text-center font-sans text-2xl mb-8'>Gracias por contactarnos</h2>
            <h4 className = 'text-center font-sans mb-8'>
                Muy pronto, alguien de nuestro equipo te
                contactará para atender tu solicitud.
            </h4>
        </div>
        <button className = 'w-full font-sans bg-sky-500 text-slate-50 border-none font-normal px-2 py-3 rounded cursor-pointer hover:text-white hover:border-solid hover:border-slate-50 hover:bg-stone-400' onClick={() => {navigate('/')}}>Volver al Home</button>
    </div>
    )
}
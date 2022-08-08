import * as yup from 'yup';

//const re = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

export const bookSchema = yup.object().shape({
    name: yup.string('Nombre debe ser una cadena de texto').required('Nombre del libro es requerido'),
    author: yup.string('Autor debe ser una cadena de texto').required('Nombre del autor es requerido'),
    genre: yup.array().required('Al menos un Género es requerido'),
    category: yup.string().required('Categoría es requerida'),
    pages: yup.number().required('Número de páginas es requerido').positive('Número de páginas debe ser positivo').integer('Número de páginas debe ser entero'),
    publisher: yup.string('Nombre de la editorial debe ser una cadena de texto').required('Nombre de la editorial es requerido'),
    description: yup.string('Descripción debe ser una cadena de texto').max(2000, 'La descripción es muy larga').required('Descripción del libro es requerida'),
    image: yup.string('Nombre debe ser una cadena de texto').url('URL inválida').required(),
    rating: yup.string().required('Puntaje es requerido'),
    price: yup.number('El precio debe ser un número').required('Precio es requerido'),
    released: yup.date().required('Fecha de publicación es requerida'),
    language: yup.string().required('Idioma es requerido')
})
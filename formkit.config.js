import { generateClasses } from '@formkit/themes'

export default {
  config: {
    classes: generateClasses({
      // Clases globales que se aplican a todos los inputs si no se sobreescriben
      global: {
        outer: 'mb-5', // Separación general para cada campo
        wrapper: 'space-y-1', // Espacio entre label, input y mensajes
        help: 'text-xs text-gray-500 italic', // Estilo para texto de ayuda
        label: 'block mb-1 font-bold text-gray-800', // Label base
        input: 'border border-gray-300 p-2 rounded w-full ' +
               'focus:ring focus:ring-blue-500 focus:border-blue-500 ' +
               'transition-colors duration-200 ease-in-out', // Input base
        message: 'text-red-500 text-sm', // Mensajes de error o validación
      },

      // Input de tipo "text"
      text: {
        label: 'font-semibold text-gray-700 mb-2 block',
        input: 'border border-gray-300 p-2 rounded w-full ' +
               'focus:ring focus:ring-blue-500 focus:border-blue-500 ' +
               'transition-colors duration-200 ease-in-out',
        message: 'text-red-500 text-sm mt-1',
      },

      // Input de tipo "file"
      file: {
        label: 'font-semibold text-gray-700 mb-2 block',
        input: 'file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 ' +
               'file:text-sm file:bg-gray-200 file:text-gray-700 ' +
               'hover:file:bg-gray-300 focus:ring focus:ring-blue-500 ' +
               'transition-colors duration-200 ease-in-out',
        message: 'text-red-500 text-sm mt-1',
      },

      // Input de tipo "select"
      select: {
        label: 'font-semibold text-gray-700 mb-2 block',
        input: 'border border-gray-300 p-2 rounded w-full ' +
               'focus:ring focus:ring-blue-500 focus:border-blue-500 ' +
               'transition-colors duration-200 ease-in-out',
        message: 'text-red-500 text-sm mt-1',
      },

      // Input de tipo "number"
      number: {
        label: 'font-semibold text-gray-700 mb-2 block',
        input: 'border border-gray-300 p-2 rounded w-full ' +
               'focus:ring focus:ring-blue-500 focus:border-blue-500 ' +
               'transition-colors duration-200 ease-in-out',
        message: 'text-red-500 text-sm mt-1',
      },
      submit: {
        // 'input' es la clave que define las clases del botón
        input:
          'bg-green-500 hover:bg-green-600 text-black ' +
          'py-2 px-4 rounded font-bold ' +
          'transition-colors duration-200 ease-in-out ' +
          'focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500',
      },
    }),
  },
}

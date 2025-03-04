export const formatDate = (fecha: string): string => {
    const nuevaFecha = new Date(fecha.split('T')[0]);
    const opciones: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return nuevaFecha.toLocaleDateString('es-ES', opciones);
};

<h1 align="center">Mini Ecommerce Web- Tradición (Café-Restaurante)</h1>

<p align="center">
  <img src="https://github.com/VlVergel-U/TradicionFront/blob/a761f2f7b36db2200b027229f325a97656cb75d1/public/logo.png" alt="Logo" width="150" height="150">
</p>

**Tradición**, una plataforma de ecommerce diseñada para un restaurante. Esta aplicación está construida con **React**

## Diseño

El diseño de la interfaz fue realizado en **Figma**. Puedes visualizarlo en el siguiente enlace: [Diseño en Figma](https://www.figma.com/design/5k61XqxAsvlCGaYQeM4RET/MockupTradici%C3%B3n?node-id=0-1&t=JQPH4YqrjoNkn0Pl-1)

---

## Deploy

El proyecto está desplegado y disponible en la siguiente dirección: [Acceder a la web](https://tradicion.up.railway.app/)

---

## Tecnologías Utilizadas

- **React**: Para construir la interfaz de usuario.
- **React Router**: Para la navegación entre diferentes vistas.
- **Axios**: Para la comunicación con el backend.
- **Styled Components / TailwindCSS**: Para el diseño y estilización de componentes.
- **Zustand**: Para la gestión de estado de la aplicación.

---

## Funcionalidades Principales

- **Inicio de sesión y registro** de usuarios.
- **Exploración de productos** y detalles de cada uno.
- **Gestor de pedidos**, permitiendo a los clientes seleccionar productos y realizar pedidos.
- **Exportación de pedidos en PDF**.


## Instalación y Configuración

### Requisitos previos
- [Node.js](https://nodejs.org/) (versión recomendada: 16 o superior)
- [Git](https://git-scm.com/)

### Pasos para la instalación

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/VlVergel-U/TradicionFront.git
   ```
2. Accede al directorio del proyecto:
   ```bash
   cd TradicionFront
   ```
3. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

### Configuración de Variables de Entorno

Para que la aplicación funcione correctamente, debes configurar la URL del backend. Crea un archivo `.env` en la raíz del proyecto y agrega la siguiente variable:

```env
VITE_BACKEND_URL=http://localhost:5000
```


### Ejecución del Proyecto

Una vez configuradas las dependencias y las variables de entorno, puedes ejecutar la aplicación en modo desarrollo con el siguiente comando:

```bash
npm run dev
```

Esto iniciará un servidor local y podrás acceder a la aplicación en `http://localhost:5173/` (o el puerto que indique la consola).

---






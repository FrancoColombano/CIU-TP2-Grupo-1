# UnaHur Anti-Social Net

## Descripción del Proyecto

**UnaHur Anti-Social Net** es una aplicación de red social desarrollada como proyecto académico para la Universidad Nacional de Hurlingham. La aplicación permite a los usuarios interactuar a través de publicaciones, comentarios y perfiles personalizados.

### Características Principales

- **Sistema de autenticación simulado**: Login con nickname y contraseña fija
- **Registro de usuarios**: Creación de nuevas cuentas con validación
- **Feed de publicaciones**: Visualización de posts recientes con imágenes y etiquetas
- **Detalle de publicaciones**: Vista completa con sistema de comentarios
- **Perfil de usuario**: Gestión de publicaciones propias
- **Creación de posts**: Formulario para publicar contenido con imágenes y etiquetas
- **Rutas protegidas**: Acceso controlado según estado de autenticación

### Tecnologías Utilizadas

- **React**: Framework principal para el desarrollo del frontend
- **React Router**: Manejo de rutas y navegación
- **Context API**: Gestión del estado global de autenticación
- **LocalStorage**: Persistencia de sesión de usuario
- **Fetch API**: Comunicación con el backend

---

## Instrucciones para Correr en Local

### Prerrequisitos

Asegúrate de tener instalado en tu sistema:

- **Node.js**
- **npm** o **yarn**
- **Backend de la aplicación** corriendo (API REST del TP de Backend)

### Instalación

1. **Clonar el repositorio**

```bash
git clone <URL_DEL_REPOSITORIO>
cd unahur-antisocial-net
```

2. **Instalar dependencias**

```bash
npm install
```

O si usas yarn:

```bash
yarn install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto con la URL de tu backend:

```env
REACT_APP_API_URL=http://localhost:3000/api
```

Ajusta la URL según la configuración de tu backend.

### Ejecución

1. **Asegúrate de que el backend está corriendo**

Verifica que la API esté activa en el puerto configurado (por defecto: `http://localhost:3000`)

2. **Iniciar la aplicación**

```bash
npm start
```

O con yarn:

```bash
yarn start
```

3. **Acceder a la aplicación**

Abre tu navegador en [http://localhost:3000](http://localhost:3000)

### Credenciales de Prueba

- **Contraseña universal**: `123456`
- **Usuario de prueba**: Utiliza cualquier nickname existente en la base de datos

---

## Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables
├── contexts/          # Context API (AuthContext)
├── pages/             # Páginas principales de la aplicación
├── services/          # Servicios para comunicación con la API
└── App.js             # Componente principal
```

---

## Rutas de la Aplicación

| Ruta | Descripción | Protegida |
|------|-------------|-----------|
| `/` | Página de inicio con feed de publicaciones | No |
| `/login` | Inicio de sesión o Registro de usuario| No |
| `/post/:id` | Detalle de una publicación | No |
| `/usuario` | Perfil del usuario logueado | Sí |
| `/post` | Crear nueva publicación | Sí |

---

## Funcionalidades Detalladas

### Login Simulado
- Validación de nickname contra la base de datos
- Contraseña fija: `123456`
- Persistencia de sesión en localStorage
- Redirección automática a rutas protegidas

### Registro de Usuario
- Formulario con validación de campos obligatorios
- Verificación de nickname único en el backend
- Manejo de errores del servidor
- Redirección automática tras registro exitoso

### Feed de Publicaciones
- Carga de posts recientes
- Visualización de imágenes y etiquetas
- Contador de comentarios visibles
- Navegación a detalle de publicación

### Sistema de Comentarios
- Visualización de comentarios por publicación
- Formulario para agregar nuevos comentarios
- Componentes controlados con React hooks

### Gestión de Publicaciones
- Creación de posts con descripción, imágenes y etiquetas
- Carga de etiquetas desde la API
- Soporte para múltiples URLs de imágenes
- Asociación automática de imágenes con posts

---

# Proyecto Nodejs con Express: Guía para Desarrollo de API REST

Este proyecto sirve como base y guía para la creación de otros proyectos similares, implementando los conceptos básicos de nodejs usando javascript.

Nota: El backend desplegado actualmente no admite la gestión de archivos com subir imagenes debido a algunas limitaciones del hosting.

Link del repositorio del frontend: https://github.com/sergio185678/FrontendBaseAngularWithNodejs
## Estructura del Proyecto:

- **Routes**: Gestiona todas las rutas, y trabaja junto a los Controllers y Middlewares.

- **Controllesr**: Gestiona todas las solicitudes HTTP. Se integra con Service.
  
- **Middlewares**: Encargado de la autenticación.

- **Services**: Contiene la lógica de negocio.

Este proyecto utiliza una base de datos simple que incluye entidades de Usuario, Documento y Cargo.

## Características Adicionales:

Aparte de las funcionalidades básicas de una API CRUD simple, se implementaron las siguientes características:

- Capa de seguridad:
  - Encriptación de las contraseñas de los usuarios.
  - Implementación de JWT, configurando los claims, la clave y el sujeto, y proporcionando funciones para facilitar la manipulación de los valores dentro del JWT.
  - Asignación de permisos específicos a cada rol de usuario.
  
- Crear una simulación de paginación para obtención de usuarios.

- Implementación de un buscador que utiliza un dato de entrada para buscar y devolver la lista de usuarios que cumplan con los criterios.

- Administración completa de archivos, permitiendo la carga y descarga de documentos, almacenándolos en la carpeta "uploads".

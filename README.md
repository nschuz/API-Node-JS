Aquí tienes un archivo README completo y detallado para tu aplicación basada en Node.js y MySQL, utilizando Docker y Docker Compose:

---

# API Eventos y Reservas - Documentación del Proyecto

## Descripción

Este proyecto es una API desarrollada en Node.js que interactúa con una base de datos MySQL. La API gestiona eventos y reservas, permitiendo la creación, modificación y eliminación de estos recursos. La aplicación está contenida en un entorno Docker, facilitando su despliegue y escalabilidad. 

La API está configurada para funcionar en un entorno de desarrollo utilizando Docker Compose y puede ejecutarse localmente con un solo comando.

## Estructura del Proyecto

```
├── deployment/
│   ├── Dockerfile       # Definición de la imagen Docker para la API
│   ├── migrations/      # Migraciones de base de datos para MySQL
├── src/
│   └── app.js           # Código principal de la API
├── package.json         # Dependencias de Node.js
├── docker-compose.yml   # Configuración de Docker Compose
└── README.md            # Documentación del proyecto
```

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- Docker
- Docker Compose

## Configuración de la Aplicación

### Variables de entorno

En el archivo `docker-compose.yml`, se definen las siguientes variables de entorno:

- `NODE_ENV`: Entorno en el que se ejecuta la aplicación (`development` o `production`).
- `DB_HOST`: El host de la base de datos MySQL (en este caso, el contenedor `mysql_db`).
- `DB_USER`: Nombre de usuario para la base de datos (`root`).
- `DB_PASSWORD`: Contraseña del usuario para la base de datos (`root`).
- `DB_NAME`: Nombre de la base de datos utilizada (`eventos`).

## Instrucciones de Instalación

1. **Clonar el repositorio**

   Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tuusuario/api-eventos-reservas.git
   cd api-eventos-reservas
   ```

2. **Construir los contenedores**

   Usa Docker Compose para construir y desplegar los contenedores de la API y la base de datos:

   ```bash
   docker-compose up --build
   ```

   Este comando hará lo siguiente:
   - Construirá la imagen de la API definida en el `Dockerfile`.
   - Inicializará la base de datos MySQL y aplicará las migraciones en el directorio `deployment/migrations`.

3. **Acceder a la API**

   La API estará disponible en el puerto `3000`. Puedes acceder a ella utilizando `http://localhost:3000`.

4. **Acceder a MySQL**

   Si necesitas acceder a la base de datos directamente, puedes usar las siguientes credenciales:

   - **Host**: `localhost`
   - **Puerto**: `3306`
   - **Usuario**: `root`
   - **Contraseña**: `root`
   - **Base de datos**: `eventos`

## Endpoints

### Eventos
- `GET /eventos`: Lista todos los eventos.
- `POST /eventos`: Crea un nuevo evento.
- `GET /eventos/{id}`: Obtiene los detalles de un evento por su ID.
- `PUT /eventos/{id}`: Actualiza un evento existente.
- `DELETE /eventos/{id}`: Elimina un evento por su ID.

### Reservas
- `GET /reservas`: Lista todas las reservas.
- `POST /reservas`: Crea una nueva reserva.
- `GET /reservas/{id}`: Obtiene los detalles de una reserva por su ID.
- `PUT /reservas/{id}`: Actualiza una reserva existente.
- `DELETE /reservas/{id}`: Elimina una reserva por su ID.

## Validaciones

- **Campos requeridos**: Se aseguran de que todos los campos necesarios estén presentes y sean válidos al crear o actualizar tanto eventos como reservas.
- **Relación entre reservas y eventos**: No se permite la creación de una reserva si el evento asociado no existe en la base de datos.

## Detalles del Dockerfile

El `Dockerfile` define cómo se construye el contenedor de la API. Aquí tienes un desglose de los pasos principales:

1. **Base de la imagen**:
   Utilizamos la imagen oficial de Node.js `node:18`.

2. **Instalación de dependencias**:
   Copiamos los archivos `package.json` y `package-lock.json` al contenedor y ejecutamos `npm install` para instalar todas las dependencias de la aplicación.

3. **Configuración del contenedor**:
   - Copiamos el código fuente al directorio de trabajo `/usr/src/app` dentro del contenedor.
   - Exponemos el puerto `3000` para que la API esté accesible.
   - El contenedor se ejecuta utilizando el comando `CMD ["npm", "run", "dev"]`, que inicia la API en modo desarrollo.

## Volúmenes

- `db_data`: Se utiliza para persistir los datos de MySQL, asegurando que los datos no se pierdan cuando el contenedor se detiene o reinicia.
- `./deployment/migrations`: Contiene las migraciones de base de datos para MySQL.

## Redes

- `api-network`: Una red de tipo `bridge` que permite la comunicación entre los contenedores de la API y la base de datos.

## Comandos Útiles

- **Construir y levantar los contenedores**:

  ```bash
  docker-compose up --build
  ```

- **Detener los contenedores**:

  ```bash
  docker-compose down
  ```

- **Ejecutar un shell dentro del contenedor de la API**:

  ```bash
  docker exec -it <nombre_contenedor_api> /bin/bash
  ```

## Mantenimiento

Si necesitas agregar nuevas dependencias al proyecto, puedes hacerlo editando el archivo `package.json`. Después, ejecuta el siguiente comando dentro del contenedor de la aplicación:

```bash
npm install <nueva_dependencia>
```

## Contribuciones

Si deseas contribuir al proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama con el nombre de tu feature (`git checkout -b feature/nueva-feature`).
3. Haz commit de tus cambios (`git commit -m 'Agrega nueva feature'`).
4. Haz push a la rama (`git push origin feature/nueva-feature`).
5. Abre un Pull Request.


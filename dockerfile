# Imagen base del sistema operativo, con slim ponemos la versión reducida
FROM node:19-slim

# Directorio de trabajo de la aplicación
WORKDIR /app

COPY package*.json ./

RUN npm install

# COPY /src/ /app/       Con esto copiaria solo la carpeta src  con la sentencia de abajo copia todo menos lo que ponemos en .dockerignore
COPY . .

CMD ["npm", "start"];

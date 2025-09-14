# Usar Node.js 22 como imagen base
FROM node:22-alpine

# Instalar herramientas básicas necesarias (bash, git, etc.)
RUN apk add --no-cache bash git openssh-client curl

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de configuración de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto que usa la aplicación (ajusta según necesites)
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]

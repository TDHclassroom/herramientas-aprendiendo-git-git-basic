# Desarrollo con Docker y Dev Container

Este proyecto incluye configuración para Docker y Dev Container de VS Code, facilitando un entorno de desarrollo consistente.

## 🐳 Docker

### Construcción de la imagen
```bash
docker build -t template-html .
```

### Ejecución del contenedor
```bash
docker run -p 3000:3000 -v ${PWD}:/app template-html
```

### Ejecución en modo desarrollo
```bash
docker run -it -p 3000:3000 -v ${PWD}:/app template-html npm run dev
```

## 📦 Dev Container (VS Code)

### Prerrequisitos
- VS Code instalado
- Extensión "Dev Containers" instalada
- Docker Desktop ejecutándose

### Uso
1. Abre VS Code en la carpeta del proyecto
2. Presiona `Ctrl+Shift+P` (o `Cmd+Shift+P` en Mac)
3. Selecciona "Dev Containers: Reopen in Container"
4. Espera a que se construya el contenedor

### Características incluidas
- **Imagen base**: Microsoft DevContainers JavaScript-Node:22 (más robusta que Alpine)
- **Herramientas incluidas**: Node.js 22, bash, git, GitHub CLI, curl, ssh
- **Extensiones útiles** de VS Code preinstaladas:
  - Prettier (formateo de código)
  - ESLint (linting)
  - Auto Rename Tag
  - Tailwind CSS IntelliSense
  - TypeScript y JSON support
- Puertos 3000 y 8080 reenviados automáticamente
- Instalación automática de dependencias

### Diferencias entre configuraciones

#### Opción 1: DevContainer con imagen oficial (recomendado)
- Usa `mcr.microsoft.com/devcontainers/javascript-node:22`
- Incluye todas las herramientas preinstaladas
- Compatible con todas las características de DevContainer
- Más rápida configuración inicial

#### Opción 2: Dockerfile personalizado
- Usa el Dockerfile incluido con `node:22-alpine`
- Incluye bash, git, openssh-client, curl
- Más control sobre el entorno
- Imagen más ligera

### Scripts disponibles
- `npm start` - Mensaje informativo del proyecto
- `npm run dev` - Ejecuta tests en modo watch
- `npm test` - Ejecuta todos los tests
- `npm run test:git` - Ejecuta tests de Git básicos
- `npm run test:github` - Ejecuta tests de GitHub
- `npm run test:coverage` - Ejecuta tests con reporte de cobertura

## 🚀 Comandos útiles

### Dentro del contenedor
```bash
# Instalar nuevas dependencias
npm install <paquete>

# Ejecutar tests específicos
npm run test:git

# Ver cobertura de tests
npm run test:coverage

# Ejecutar tests en modo watch
npm run test:watch

# Verificar instalación de git
git --version

# Verificar instalación de GitHub CLI
gh --version
```

### Gestión del contenedor
```bash
# Ver contenedores en ejecución
docker ps

# Parar contenedor
docker stop <container_id>

# Limpiar contenedores
docker container prune

# Limpiar imágenes no usadas
docker image prune
```

## 🔧 Solución de problemas

### Error: "env: can't execute 'bash': No such file or directory"
- **Causa**: La imagen Alpine Linux no incluye bash por defecto
- **Solución**: El devcontainer.json actual usa la imagen oficial de Microsoft que incluye bash

### Error: Features de Git/GitHub CLI fallan
- **Causa**: Incompatibilidad con Alpine Linux
- **Solución**: Cambiado a imagen `mcr.microsoft.com/devcontainers/javascript-node:22`

### Para usar el Dockerfile personalizado
Si prefieres usar el Dockerfile personalizado en lugar de la imagen oficial:

1. Cambia en `.devcontainer/devcontainer.json`:
```json
{
  "dockerFile": "../Dockerfile",
  // ... resto de configuración
}
```

2. Quita la línea:
```json
"image": "mcr.microsoft.com/devcontainers/javascript-node:22",
```

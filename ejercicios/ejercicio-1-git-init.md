# Ejercicio 1: Inicializar Git

## Objetivo
Aprender a inicializar un repositorio Git y configurar la información básica del usuario.

## Instrucciones

1. Configura tu nombre de usuario de Git:
   ```bash
   git config --global user.name "Tu Nombre"
   ```

2. Configura tu email de Git:
   ```bash
   git config --global user.email "tu.email@ejemplo.com"
   ```

3. Verifica que la configuración se guardó correctamente:
   ```bash
   git config --list
   ```

4. Inicializa un repositorio Git en la carpeta del proyecto (si no está ya inicializado):
   ```bash
   git init
   ```

5. Verifica el estado del repositorio:
   ```bash
   git status
   ```

## Verificación

El repositorio debe estar inicializado y configurado correctamente.

Una vez que hayas completado el ejercicio ejecuta:
```bash
npm test ejercicio/1
```

Si pasa todos los test, continúa con el siguiente ejercicio.

¡Buena suerte y diviértete aprendiendo Git!

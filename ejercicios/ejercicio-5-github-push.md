# Ejercicio 5: Conectar con GitHub y hacer push

## Objetivo
Aprender a conectar tu repositorio local con GitHub y subir tus cambios.

## Prerrequisitos
- Tener una cuenta de GitHub
- Haber creado un repositorio en GitHub (puede estar vacío)

## Instrucciones

1. Verifica la configuración de tu repositorio remoto:
   ```bash
   git remote -v
   ```

2. Si no tienes un remote configurado, añade tu repositorio de GitHub:
   ```bash
   git remote add origin https://github.com/tuusuario/tu-repositorio.git
   ```

3. Verifica que el remote se añadió correctamente:
   ```bash
   git remote -v
   ```

4. Sube tus cambios al repositorio remoto:
   ```bash
   git push -u origin main
   ```
   
   Nota: Si tu rama principal se llama `master`, usa:
   ```bash
   git push -u origin master
   ```

5. Crea un nuevo archivo llamado `AUTHORS.md` con tu información:
   ```
   # Autores
   
   - Tu Nombre (@tu-usuario-github)
   ```

6. Añade el archivo y haz commit:
   ```bash
   git add AUTHORS.md
   git commit -m "Añadir información de autores"
   ```

7. Sube los nuevos cambios:
   ```bash
   git push
   ```

8. Verifica que tus cambios están en GitHub visitando tu repositorio en el navegador.

## Verificación

Tu repositorio local debe estar conectado con GitHub y todos los commits deben estar sincronizados.

Una vez que hayas completado el ejercicio ejecuta:
```bash
npm test ejercicio/5
```

Si pasa todos los test, continúa con el siguiente ejercicio.

¡Felicidades! Ya sabes usar Git con GitHub.

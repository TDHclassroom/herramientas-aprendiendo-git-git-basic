# Ejercicio 6: Clonar y pull de GitHub

## Objetivo
Aprender a clonar repositorios de GitHub y mantener tu repositorio local actualizado.

## Instrucciones

1. Simula cambios en GitHub editando un archivo directamente en la interfaz web:
   - Ve a tu repositorio en GitHub
   - Edita el archivo `mi-proyecto.md` añadiendo una nueva línea:
     ```
     ## Última actualización
     Editado desde GitHub web interface
     ```
   - Haz commit directamente en GitHub con el mensaje "Actualizar mi-proyecto desde GitHub"

2. En tu repositorio local, verifica el estado:
   ```bash
   git status
   ```

3. Intenta hacer pull para obtener los cambios:
   ```bash
   git pull origin main
   ```
   
   (O `git pull origin master` si tu rama principal es master)

4. Verifica que los cambios se descargaron:
   ```bash
   cat mi-proyecto.md
   ```

5. Crea un archivo llamado `sync-test.txt` con cualquier contenido:
   ```bash
   echo "Test de sincronización" > sync-test.txt
   ```

6. Añade, commit y push el nuevo archivo:
   ```bash
   git add sync-test.txt
   git commit -m "Añadir archivo de prueba de sincronización"
   git push
   ```

7. Verifica en GitHub que el archivo se subió correctamente.

8. Simula clonar el repositorio en otra ubicación (opcional):
   ```bash
   cd ..
   git clone https://github.com/tuusuario/tu-repositorio.git repo-clonado
   cd repo-clonado
   ls
   ```

## Verificación

Tu repositorio debe estar sincronizado con GitHub y tener todos los archivos actualizados.

Una vez que hayas completado el ejercicio ejecuta:
```bash
npm test ejercicio/6
```

Si pasa todos los test, continúa con el siguiente ejercicio.

¡Excelente! Ya dominas la sincronización con GitHub.

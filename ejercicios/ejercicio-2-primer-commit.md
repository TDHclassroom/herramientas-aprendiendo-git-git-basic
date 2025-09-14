# Ejercicio 2: Crear archivos y hacer primer commit

## Objetivo
Aprender a crear archivos, añadirlos al área de staging y hacer tu primer commit.

## Instrucciones

1. Crea un archivo llamado `mi-proyecto.md` en la raíz del proyecto con el siguiente contenido:
   ```
   # Mi Proyecto Git
   
   Este es mi primer proyecto usando Git.
   ```

2. Crea una carpeta llamada `docs` en la raíz del proyecto.

3. Dentro de la carpeta `docs`, crea un archivo llamado `notas.txt` con cualquier contenido.

4. Verifica el estado de los archivos con:
   ```bash
   git status
   ```

5. Añade todos los archivos al área de staging:
   ```bash
   git add .
   ```

6. Verifica nuevamente el estado:
   ```bash
   git status
   ```

7. Haz tu primer commit:
   ```bash
   git commit -m "Primer commit: añadir mi-proyecto.md y documentación inicial"
   ```

8. Verifica el historial de commits:
   ```bash
   git log --oneline
   ```

## Verificación

Debes tener al menos un commit con los archivos creados.

Una vez que hayas completado el ejercicio ejecuta:
```bash
npm test ejercicio/2
```

Si pasa todos los test, continúa con el siguiente ejercicio.

¡Excelente trabajo aprendiendo Git!

# Ejercicio 3: Modificar archivos y commits adicionales

## Objetivo
Aprender a modificar archivos existentes, ver las diferencias y crear commits adicionales.

## Instrucciones

1. Modifica el archivo `mi-proyecto.md` añadiendo una nueva línea al final:
   ```
   ## Características
   - Aprendiendo Git paso a paso
   ```

2. Crea un nuevo archivo llamado `CHANGELOG.md` con el siguiente contenido:
   ```
   # Changelog
   
   ## v1.0.0
   - Proyecto inicial
   ```

3. Verifica las diferencias de los archivos modificados:
   ```bash
   git diff
   ```

4. Verifica el estado de los archivos:
   ```bash
   git status
   ```

5. Añade solo el archivo mi-proyecto.md al staging:
   ```bash
   git add mi-proyecto.md
   ```

6. Haz un commit solo del mi-proyecto:
   ```bash
   git commit -m "Actualizar mi-proyecto con características"
   ```

7. Añade el archivo CHANGELOG.md:
   ```bash
   git add CHANGELOG.md
   ```

8. Haz otro commit:
   ```bash
   git commit -m "Añadir CHANGELOG inicial"
   ```

9. Verifica el historial de commits:
   ```bash
   git log --oneline
   ```

## Verificación

Debes tener al menos 3 commits en total y los archivos deben estar actualizados.

Una vez que hayas completado el ejercicio ejecuta:
```bash
npm test ejercicio/3
```

Si pasa todos los test, continúa con el siguiente ejercicio.

¡Vas muy bien con Git!

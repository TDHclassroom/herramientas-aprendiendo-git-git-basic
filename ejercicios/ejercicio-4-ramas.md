# Ejercicio 4: Trabajar con ramas (branches)

## Objetivo
Aprender a crear y trabajar con ramas en Git para desarrollar características de forma aislada.

## Instrucciones

1. Verifica en qué rama estás actualmente:
   ```bash
   git branch
   ```

2. Crea una nueva rama llamada `feature/nueva-funcionalidad`:
   ```bash
   git branch feature/nueva-funcionalidad
   ```

3. Cambia a la nueva rama:
   ```bash
   git checkout feature/nueva-funcionalidad
   ```
   
   O puedes crear y cambiar en un solo comando:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

4. Verifica que estás en la nueva rama:
   ```bash
   git branch
   ```

5. Crea un nuevo archivo llamado `features.txt` con el contenido:
   ```
   Lista de características:
   1. Sistema de usuarios
   2. Dashboard principal
   3. Reportes básicos
   ```

6. Añade y haz commit del nuevo archivo:
   ```bash
   git add features.txt
   git commit -m "Añadir lista inicial de características"
   ```

7. Regresa a la rama main:
   ```bash
   git checkout main
   ```

8. Verifica que el archivo `features.txt` no está en la rama main:
   ```bash
   ls features.txt
   ```

9. Fusiona la rama feature con main:
   ```bash
   git merge feature/nueva-funcionalidad
   ```

10. Verifica que ahora el archivo está en main y elimina la rama feature:
    ```bash
    git branch -d feature/nueva-funcionalidad
    ```

## Verificación

Debes tener el archivo `features.txt` en la rama main y la rama feature debe estar eliminada.

Una vez que hayas completado el ejercicio ejecuta:
```bash
npm test ejercicio/4
```

Si pasa todos los test, continúa con el siguiente ejercicio.

¡Excelente! Ahora sabes trabajar con ramas en Git.

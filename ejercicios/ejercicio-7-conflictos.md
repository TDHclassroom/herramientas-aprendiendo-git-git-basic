# Ejercicio 7: Manejo de conflictos

## Objetivo
Aprender a resolver conflictos que pueden ocurrir cuando múltiples personas trabajan en el mismo archivo.

## Instrucciones

1. Crea una nueva rama para simular trabajo en paralelo:
   ```bash
   git checkout -b feature/conflicto-simulado
   ```

2. Modifica el archivo `mi-proyecto.md` añadiendo al final:
   ```
   ## Información del proyecto
   Versión desarrollada en rama feature
   ```

3. Haz commit de estos cambios:
   ```bash
   git add mi-proyecto.md
   git commit -m "Añadir información en rama feature"
   ```

4. Cambia a la rama main:
   ```bash
   git checkout main
   ```

5. Modifica la misma sección del `mi-proyecto.md` añadiendo al final:
   ```
   ## Información del proyecto
   Versión desarrollada en rama main
   ```

6. Haz commit de estos cambios:
   ```bash
   git add mi-proyecto.md
   git commit -m "Añadir información en rama main"
   ```

7. Intenta fusionar la rama feature (esto creará un conflicto):
   ```bash
   git merge feature/conflicto-simulado
   ```

8. Verifica el estado y los archivos con conflicto:
   ```bash
   git status
   cat mi-proyecto.md
   ```

9. Resuelve el conflicto editando el archivo `mi-proyecto.md` manualmente:
   - Elimina las marcas de conflicto (`<<<<<<<`, `=======`, `>>>>>>>`)
   - Decide qué contenido mantener o combinar ambas versiones
   - El resultado final podría ser:
     ```
     ## Información del proyecto
     Versión combinada de ambas ramas
     ```

10. Marca el conflicto como resuelto y completa el merge:
    ```bash
    git add mi-proyecto.md
    git commit -m "Resolver conflicto de merge"
    ```

11. Elimina la rama temporal:
    ```bash
    git branch -d feature/conflicto-simulado
    ```

12. Verifica el historial:
    ```bash
    git log --oneline --graph
    ```

## Verificación

El conflicto debe estar resuelto y el historial debe mostrar el merge.

Una vez que hayas completado el ejercicio ejecuta:
```bash
npm test ejercicio/7
```

Si pasa todos los test, ¡has completado todos los ejercicios básicos de Git!

¡Felicidades! Ahora sabes manejar conflictos en Git.

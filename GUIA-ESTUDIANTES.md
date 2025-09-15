# 🎯 Ejercicios de Git - Guía para Estudiantes

## ⚠️ **INSTRUCCIONES CRÍTICAS PARA APROBAR LOS TESTS**

**Para que TODOS los tests pasen en GitHub Classroom, debes seguir esta guía exactamente.**

### 🚀 Configuración Inicial (OBLIGATORIA)

```bash
# PASO 1: Configurar Git (REQUERIDO)
git config --global user.name "Tu Nombre Completo"
git config --global user.email "tu-email@ejemplo.com"

# PASO 2: Verificar que funciona
git config --list | grep user
```

---

## 📋 Ejercicios Paso a Paso

### ✅ Ejercicio 1: Inicializar Git
- **Estado:** ✅ Ya completado (el repositorio ya está inicializado)
- **Tests esperados:** 3 tests deben pasar

---

### ✅ Ejercicio 2: Primer Commit
- **Estado:** ✅ Ya completado
- **Tests esperados:** 2 tests deben pasar

---

### 📝 Ejercicio 3: Modificar archivos y commits adicionales

**NECESITAS:** Mínimo **3 commits** con mensajes descriptivos (>10 caracteres)

```bash
# Verifica cuántos commits tienes actualmente
git log --oneline

# Si tienes menos de 3 commits, haz más:
echo "## Información del Proyecto
Este es mi primer proyecto con Git." > mi-proyecto.md
git add mi-proyecto.md
git commit -m "Agrega información inicial del proyecto"

echo "
## Cambios Realizados
- Configuración inicial del repositorio
- Documentación básica agregada" >> mi-proyecto.md
git add mi-proyecto.md
git commit -m "Actualiza documentación con cambios realizados"

echo "# Changelog del Proyecto

## [1.0.0] - $(date +%Y-%m-%d)
### Added
- Configuración inicial del repositorio
- Documentación básica del proyecto" > CHANGELOG.md
git add CHANGELOG.md
git commit -m "Agrega changelog con historial de versiones"
```

**✅ Verificación:** `git log --oneline` debe mostrar al menos 3 commits

---

### 🌿 Ejercicio 4: Trabajar con ramas (branches)

**NECESITAS:** Mínimo **4 commits** + evidencia de trabajo con ramas

```bash
# Crear nueva rama para desarrollo
git checkout -b nueva-funcionalidad

# Agregar archivo de características
echo "# Características del Proyecto

## Funcionalidades Principales
- Control de versiones con Git
- Documentación automática
- Historial de cambios

## Próximas Funcionalidades  
- Integración con GitHub
- Tests automatizados
- Deploy automático" > features.txt

git add features.txt
git commit -m "Agrega archivo de funcionalidades del proyecto"

# Volver a la rama principal y hacer merge
git checkout main
git merge nueva-funcionalidad -m "Merge funcionalidad: agrega características del proyecto"

# Cleanup opcional
git branch -d nueva-funcionalidad
```

**✅ Verificación:** 
- `git log --oneline` debe mostrar al menos 4 commits
- Debe existir el archivo `features.txt`
- Los mensajes deben incluir palabras como "merge", "funcionalidad", "feature"

---

### 🔗 Ejercicio 5: Conectar con GitHub y hacer push

**NECESITAS:** Mínimo **5 commits** + archivo `AUTHORS.md`

```bash
# Agregar archivo de autores
echo "# Autores del Proyecto

## Desarrolladores Principales
- **$(git config user.name)** - $(git config user.email)
  - Configuración inicial del repositorio
  - Desarrollo de funcionalidades principales
  - Documentación del proyecto

## Contribuidores
- Classroom GitHub - Entorno de testing

---
*Proyecto creado como parte del curso de Git básico*" > AUTHORS.md

git add AUTHORS.md
git commit -m "Agrega archivo AUTHORS.md con información de desarrolladores"

# Push a GitHub (si aún no lo has hecho)
git push origin main
```

**✅ Verificación:**
- `git log --oneline` debe mostrar al menos 5 commits
- Debe existir el archivo `AUTHORS.md` trackeado

---

### 🔄 Ejercicio 6: Clonar y pull de GitHub

**NECESITAS:** Mínimo **6 commits** + mensajes de sincronización con GitHub

```bash
# Agregar archivo de prueba de sincronización
echo "# Archivo de Prueba de Sincronización

Este archivo demuestra la sincronización entre repositorio local y GitHub.

## Información de Sincronización
- Fecha: $(date)
- Repositorio: $(git config --get remote.origin.url || echo 'Local repository')
- Rama: $(git branch --show-current)
- Usuario: $(git config user.name)

## Estado del Repositorio
- Total de commits: $(git rev-list --count HEAD)
- Último commit: $(git log -1 --pretty=format:'%h - %s (%ad)' --date=short)" > sync-test.txt

git add sync-test.txt
git commit -m "Agrega sync-test.txt para prueba de sincronización con GitHub"

# Hacer push para sincronizar
git push origin main
```

**✅ Verificación:**
- `git log --oneline` debe mostrar al menos 6 commits  
- Debe existir el archivo `sync-test.txt` trackeado
- Los mensajes deben incluir palabras como "github", "sync", "pull", "push"

---

### ⚔️ Ejercicio 7: Manejo de conflictos

**NECESITAS:** Mínimo **7 commits** + evidencia de resolución de conflictos

```bash
# Crear rama para simular conflicto
git checkout -b feature-conflicto

# Crear archivo que generará conflicto
echo "# Archivo de Conflicto

## Versión Feature Branch
Esta es la versión desde la rama feature.
Contiene funcionalidades experimentales.

## Características
- Nueva funcionalidad A
- Mejora del rendimiento  
- Bug fixes menores" > conflicto-test.txt

git add conflicto-test.txt
git commit -m "Agrega feature experimental en rama feature-conflicto"

# Cambiar a main y crear conflicto
git checkout main

echo "# Archivo de Conflicto

## Versión Main Branch  
Esta es la versión estable desde main.
Contiene solo funcionalidades probadas.

## Características
- Funcionalidad estable A
- Optimizaciones de memoria
- Correcciones críticas" > conflicto-test.txt

git add conflicto-test.txt
git commit -m "Agrega versión estable del feature en main"

# Intentar merge (generará conflicto)
git merge feature-conflicto

# Resolver conflicto manualmente (editar el archivo)
echo "# Archivo de Conflicto

## Versión Fusionada
Esta es la versión final que combina ambas ramas.
Contiene funcionalidades estables y experimentales.

## Características
- Funcionalidad A (estable + experimental)
- Mejoras de rendimiento y memoria
- Bug fixes y correcciones críticas
- Nuevas características probadas

## Notas de Merge
- Resuelto conflicto entre main y feature-conflicto
- Combinadas mejores características de ambas ramas" > conflicto-test.txt

git add conflicto-test.txt
git commit -m "Resuelve conflicto entre main y feature-conflicto: fusiona características"

# Cleanup
git branch -d feature-conflicto
```

**✅ Verificación:**
- `git log --oneline` debe mostrar al menos 7 commits
- Los mensajes deben incluir palabras como "conflicto", "conflict", "feature", "merge"
- Repositorio debe estar limpio (`git status`)

---

## 🔍 Verificación Final

### Antes de hacer el push final, ejecuta:

```bash
# 1. Verificar número de commits
echo "📊 Total de commits: $(git rev-list --count HEAD)"

# 2. Verificar archivos requeridos
echo "📁 Archivos trackeados:"
git ls-files | grep -E "(mi-proyecto\.md|CHANGELOG\.md|features\.txt|AUTHORS\.md|sync-test\.txt|conflicto-test\.txt)"

# 3. Verificar mensajes de commit
echo "📝 Mensajes recientes:"
git log --pretty=format:"%h - %s" -7

# 4. Verificar estado del repositorio  
echo "📋 Estado del repositorio:"
git status

# 5. Ejecutar tests localmente
echo "🧪 Ejecutando tests..."
npm test
```

### ✅ Checklist Final

- [ ] **Al menos 7 commits** en total
- [ ] **Mensajes descriptivos** (más de 10 caracteres cada uno)
- [ ] **Archivos requeridos** existen y están trackeados:
  - [ ] `mi-proyecto.md` 
  - [ ] `CHANGELOG.md`
  - [ ] `features.txt`
  - [ ] `AUTHORS.md`
  - [ ] `sync-test.txt`
  - [ ] `conflicto-test.txt` (opcional)
- [ ] **Evidencia de trabajo con ramas** (mensajes con "merge", "funcionalidad", "feature")
- [ ] **Evidencia de GitHub sync** (mensajes con "github", "sync", "pull", "push")
- [ ] **Evidencia de conflictos** (mensajes con "conflicto", "conflict", "feature")
- [ ] **Repositorio limpio** (`git status` muestra "working tree clean")
- [ ] **Tests locales pasan** (`npm test` sin errores)

---

## 🚨 Problemas Comunes

### "ReferenceError: fail is not defined"
- ✅ **SOLUCIONADO** - Los tests han sido actualizados

### "Expected: >= X, Received: 1"  
- ❌ **Solo tienes 1 commit** - Sigue los pasos de cada ejercicio para crear más commits

### "Expected: true, Received: false" (evidencia de trabajo)
- ❌ **Faltan palabras clave** en mensajes - Usa palabras como "merge", "feature", "github", "conflicto"

### "No se pudo obtener la configuración de Git"
- ❌ **Git no configurado** - Ejecuta los comandos de configuración inicial

---

## 🏆 Push Final

**Solo cuando todos los checks estén ✅, haz el push final:**

```bash
git push origin main
```

**¡Ahora todos los tests de GitHub Classroom deberían pasar! 🎉**
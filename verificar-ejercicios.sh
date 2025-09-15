#!/bin/bash

# 🔍 Script de Verificación de Ejercicios Git
# Ejecuta este script antes de hacer push para asegurar que todos los tests pasen

echo "🎯 VERIFICADOR DE EJERCICIOS GIT"
echo "================================="
echo

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Contadores
PASSED=0
FAILED=0

# Función para mostrar resultados
check_result() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}❌ $1${NC}"
        FAILED=$((FAILED + 1))
    fi
}

echo -e "${BLUE}📋 VERIFICACIÓN DE CONFIGURACIÓN${NC}"
echo "-----------------------------------"

# 1. Verificar configuración de Git
echo -n "1. Configuración de Git user.name: "
GIT_USER=$(git config user.name 2>/dev/null)
if [ -n "$GIT_USER" ] && [ ${#GIT_USER} -gt 0 ]; then
    echo -e "${GREEN}✅ $GIT_USER${NC}"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ No configurado${NC}"
    echo -e "${YELLOW}   Ejecuta: git config --global user.name \"Tu Nombre\"${NC}"
    FAILED=$((FAILED + 1))
fi

echo -n "2. Configuración de Git user.email: "
GIT_EMAIL=$(git config user.email 2>/dev/null)
if [ -n "$GIT_EMAIL" ] && [[ $GIT_EMAIL == *"@"* ]]; then
    echo -e "${GREEN}✅ $GIT_EMAIL${NC}"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ No configurado o inválido${NC}"
    echo -e "${YELLOW}   Ejecuta: git config --global user.email \"tu@email.com\"${NC}"
    FAILED=$((FAILED + 1))
fi

echo
echo -e "${BLUE}📊 VERIFICACIÓN DE COMMITS${NC}"
echo "----------------------------"

# 2. Verificar número de commits
COMMITS=$(git rev-list --count HEAD 2>/dev/null || echo "0")
echo -n "3. Total de commits: $COMMITS "
if [ "$COMMITS" -ge 7 ]; then
    echo -e "${GREEN}✅ Suficientes commits ($COMMITS >= 7)${NC}"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ Necesitas más commits ($COMMITS < 7)${NC}"
    echo -e "${YELLOW}   Sigue la guía en GUIA-ESTUDIANTES.md para crear más commits${NC}"
    FAILED=$((FAILED + 1))
fi

# 3. Verificar mensajes de commit descriptivos
echo -n "4. Mensajes descriptivos: "
SHORT_MESSAGES=$(git log --pretty=format:"%s" | awk 'length($0) <= 10' | wc -l)
if [ "$SHORT_MESSAGES" -eq 0 ]; then
    echo -e "${GREEN}✅ Todos los mensajes son descriptivos (>10 caracteres)${NC}"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ $SHORT_MESSAGES mensajes son muy cortos (≤10 caracteres)${NC}"
    echo -e "${YELLOW}   Mejora los mensajes de commit para ser más descriptivos${NC}"
    FAILED=$((FAILED + 1))
fi

echo
echo -e "${BLUE}📁 VERIFICACIÓN DE ARCHIVOS REQUERIDOS${NC}"
echo "--------------------------------------"

# 4. Verificar archivos requeridos
REQUIRED_FILES=(
    "mi-proyecto.md:Ejercicio 3"
    "CHANGELOG.md:Ejercicio 3"
    "features.txt:Ejercicio 4" 
    "AUTHORS.md:Ejercicio 5"
    "sync-test.txt:Ejercicio 6"
)

for file_info in "${REQUIRED_FILES[@]}"; do
    IFS=':' read -r filename exercise <<< "$file_info"
    echo -n "5. Archivo '$filename' ($exercise): "
    
    if git ls-files | grep -q "^$filename$"; then
        echo -e "${GREEN}✅ Existe y está trackeado${NC}"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}❌ No existe o no está trackeado${NC}"
        echo -e "${YELLOW}   Ver instrucciones de $exercise en GUIA-ESTUDIANTES.md${NC}"
        FAILED=$((FAILED + 1))
    fi
done

echo
echo -e "${BLUE}🔍 VERIFICACIÓN DE EVIDENCIAS${NC}"
echo "------------------------------"

# 5. Verificar evidencia de trabajo con ramas
echo -n "6. Evidencia de trabajo con ramas: "
MESSAGES=$(git log --pretty=format:"%s" | tr '[:upper:]' '[:lower:]')
if echo "$MESSAGES" | grep -q -E "(merge|funcionalidad|feature|rama|branch)"; then
    echo -e "${GREEN}✅ Encontrada en mensajes de commit${NC}"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ No encontrada en mensajes${NC}"
    echo -e "${YELLOW}   Incluye palabras como 'merge', 'feature', 'funcionalidad' en commits${NC}"
    FAILED=$((FAILED + 1))
fi

# 6. Verificar evidencia de sincronización con GitHub
echo -n "7. Evidencia de sincronización GitHub: "
if echo "$MESSAGES" | grep -q -E "(github|sync|pull|push|sincroniz)"; then
    echo -e "${GREEN}✅ Encontrada en mensajes de commit${NC}"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ No encontrada en mensajes${NC}"
    echo -e "${YELLOW}   Incluye palabras como 'github', 'sync', 'push' en commits${NC}"
    FAILED=$((FAILED + 1))
fi

# 7. Verificar evidencia de resolución de conflictos
echo -n "8. Evidencia de conflictos/features: "
if echo "$MESSAGES" | grep -q -E "(conflicto|conflict|feature|resuel)"; then
    echo -e "${GREEN}✅ Encontrada en mensajes de commit${NC}"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ No encontrada en mensajes${NC}"
    echo -e "${YELLOW}   Incluye palabras como 'conflicto', 'feature' en commits${NC}"
    FAILED=$((FAILED + 1))
fi

echo
echo -e "${BLUE}🏠 VERIFICACIÓN DEL ESTADO${NC}"
echo "---------------------------"

# 8. Verificar estado del repositorio
echo -n "9. Estado del repositorio: "
if git diff-index --quiet HEAD -- 2>/dev/null; then
    echo -e "${GREEN}✅ Repositorio limpio (sin cambios pendientes)${NC}"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ Hay cambios pendientes${NC}"
    echo -e "${YELLOW}   Ejecuta: git add . && git commit -m \"Mensaje descriptivo\"${NC}"
    FAILED=$((FAILED + 1))
fi

echo
echo -e "${BLUE}📈 RESUMEN${NC}"
echo "----------"

echo -e "✅ Verificaciones pasadas: ${GREEN}$PASSED${NC}"
echo -e "❌ Verificaciones fallidas: ${RED}$FAILED${NC}"

echo
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 ¡PERFECTO! Todas las verificaciones pasaron.${NC}"
    echo -e "${GREEN}🚀 Puedes hacer push seguro: git push origin main${NC}"
    echo
    echo -e "${BLUE}🧪 Ejecutando tests finales...${NC}"
    if command -v npm &> /dev/null; then
        npm test
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}🏆 ¡Tests completados exitosamente! Listo para GitHub Classroom.${NC}"
        else
            echo -e "${RED}⚠️ Algunos tests fallan. Revisa los errores arriba.${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️ npm no está disponible. Tests automáticos omitidos.${NC}"
    fi
else
    echo -e "${RED}🚨 ATENCIÓN: $FAILED verificaciones fallaron.${NC}"
    echo -e "${YELLOW}📖 Consulta GUIA-ESTUDIANTES.md para instrucciones detalladas.${NC}"
    echo
    echo -e "${BLUE}🔧 Pasos sugeridos:${NC}"
    if [ "$COMMITS" -lt 7 ]; then
        echo -e "   1. Crear más commits siguiendo los ejercicios"
    fi
    if ! echo "$MESSAGES" | grep -q -E "(merge|funcionalidad|feature)"; then
        echo -e "   2. Incluir trabajo con ramas en commits"
    fi
    if ! echo "$MESSAGES" | grep -q -E "(github|sync|pull|push)"; then
        echo -e "   3. Agregar commits de sincronización con GitHub"
    fi
    echo -e "   4. Verificar que todos los archivos requeridos existan"
    echo -e "   5. Hacer commit de cambios pendientes"
fi

echo
echo -e "${BLUE}🔗 Recursos útiles:${NC}"
echo "   📖 GUIA-ESTUDIANTES.md - Instrucciones completas"
echo "   📝 git log --oneline - Ver historial de commits"  
echo "   📁 git ls-files - Ver archivos trackeados"
echo "   📊 git status - Ver estado del repositorio"

exit $FAILED
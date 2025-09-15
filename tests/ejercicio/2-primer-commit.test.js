const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Ejercicio 2: Crear archivos y hacer primer commit', () => {
  const rootPath = path.join(__dirname, '../../');
  
  test('El archivo mi-proyecto.md debe existir con el contenido correcto', () => {
    const miProyectoPath = path.join(rootPath, 'mi-proyecto.md');
    expect(fs.existsSync(miProyectoPath)).toBe(true);
    
    const content = fs.readFileSync(miProyectoPath, 'utf8');
    expect(content).toContain('# Mi Proyecto Git');
    expect(content).toContain('Este es mi primer proyecto usando Git');
  });
  
  test('La carpeta docs debe existir', () => {
    const docsPath = path.join(rootPath, 'docs');
    expect(fs.existsSync(docsPath)).toBe(true);
    
    const stats = fs.statSync(docsPath);
    expect(stats.isDirectory()).toBe(true);
  });

  test('El archivo docs/notas.txt debe existir', () => {
    const notasPath = path.join(rootPath, 'docs', 'notas.txt');
    expect(fs.existsSync(notasPath)).toBe(true);
    
    const stats = fs.statSync(notasPath);
    expect(stats.isFile()).toBe(true);
  });

  test('Debe tener al menos un commit', () => {
    let commitCount;
    
    try {
      const logOutput = execSync('git rev-list --count HEAD', { cwd: rootPath, encoding: 'utf8' });
      commitCount = parseInt(logOutput.trim());
    } catch (error) {
      throw new Error('No se pudo obtener el historial de commits. Asegúrate de haber hecho al menos un commit.');
    }
    
    expect(commitCount).toBeGreaterThanOrEqual(1);
  });

  test('Los archivos deben estar en el último commit', () => {
    let filesInCommit;
    
    try {
      filesInCommit = execSync('git ls-tree --name-only HEAD', { cwd: rootPath, encoding: 'utf8' });
    } catch (error) {
      throw new Error('No se pudo obtener los archivos del último commit.');
    }
    
    expect(filesInCommit).toContain('mi-proyecto.md');
    expect(filesInCommit).toContain('docs');
  });
});

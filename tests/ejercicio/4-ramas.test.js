const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Ejercicio 4: Trabajar con ramas (branches)', () => {
  const rootPath = path.join(__dirname, '../../');
  
  test('El archivo features.txt debe existir con el contenido correcto', () => {
    const featuresPath = path.join(rootPath, 'features.txt');
    expect(fs.existsSync(featuresPath)).toBe(true);
    
    const content = fs.readFileSync(featuresPath, 'utf8');
    expect(content).toContain('Lista de características:');
    expect(content).toContain('Sistema de usuarios');
    expect(content).toContain('Dashboard principal');
    expect(content).toContain('Reportes básicos');
  });
  
  test('Debe estar en la rama main', () => {
    let currentBranch;
    
    try {
      currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: rootPath, encoding: 'utf8' }).trim();
    } catch (error) {
      throw new Error('No se pudo obtener la rama actual.');
    }
    
    expect(['main', 'master']).toContain(currentBranch);
  });

  test('La rama feature/nueva-funcionalidad no debe existir', () => {
    let branches;
    
    try {
      branches = execSync('git branch', { cwd: rootPath, encoding: 'utf8' });
    } catch (error) {
      throw new Error('No se pudo obtener la lista de ramas.');
    }
    
    expect(branches).not.toContain('feature/nueva-funcionalidad');
  });

  test('Debe tener commits adicionales por el trabajo con ramas', () => {
    let commitCount;
    
    try {
      const logOutput = execSync('git rev-list --count HEAD', { cwd: rootPath, encoding: 'utf8' });
      commitCount = parseInt(logOutput.trim());
    } catch (error) {
      throw new Error('No se pudo obtener el historial de commits.');
    }
    
    expect(commitCount).toBeGreaterThanOrEqual(4);
  });

  test('El archivo features.txt debe estar trackeado en Git', () => {
    let trackedFiles;
    
    try {
      trackedFiles = execSync('git ls-files', { cwd: rootPath, encoding: 'utf8' });
    } catch (error) {
      throw new Error('No se pudo obtener los archivos trackeados por Git.');
    }
    
    expect(trackedFiles).toContain('features.txt');
  });

  test('Debe haber evidencia de merge en el historial', () => {
    let commitMessages;
    
    try {
      commitMessages = execSync('git log --oneline', { cwd: rootPath, encoding: 'utf8' });
    } catch (error) {
      throw new Error('No se pudo obtener el historial de commits.');
    }
    
    // Buscar evidencia de trabajo con características o merge
    const hasFeatureWork = commitMessages.toLowerCase().includes('característica') || 
                          commitMessages.toLowerCase().includes('feature') ||
                          commitMessages.toLowerCase().includes('merge') ||
                          commitMessages.toLowerCase().includes('funcionalidad');
    
    expect(hasFeatureWork).toBe(true);
  });
});

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Ejercicio 6: Clonar y pull de GitHub', () => {
  const rootPath = path.join(__dirname, '../../');
  
  test('El archivo mi-proyecto.md debe contener la actualización desde GitHub', () => {
    const readmePath = path.join(rootPath, 'mi-proyecto.md');
    expect(fs.existsSync(readmePath)).toBe(true);
    
    const content = fs.readFileSync(readmePath, 'utf8');
    // Buscar evidencia de actualización desde GitHub
    const hasGithubUpdate = content.includes('Última actualización') || 
                           content.includes('GitHub web interface') ||
                           content.includes('GitHub') ||
                           content.includes('actualización') ||
                           content.includes('Editado');
    
    expect(hasGithubUpdate).toBe(true);
  });
  
  test('El archivo sync-test.txt debe existir', () => {
    const syncTestPath = path.join(rootPath, 'sync-test.txt');
    expect(fs.existsSync(syncTestPath)).toBe(true);
    
    const content = fs.readFileSync(syncTestPath, 'utf8').trim();
    expect(content.length).toBeGreaterThan(0);
  });

  test('Debe tener al menos 6 commits', () => {
    let commitCount;
    
    try {
      const logOutput = execSync('git rev-list --count HEAD', { cwd: rootPath, encoding: 'utf8' });
      commitCount = parseInt(logOutput.trim());
    } catch (error) {
      throw new Error('No se pudo obtener el historial de commits.');
    }
    
    expect(commitCount).toBeGreaterThanOrEqual(6);
  });

  test('El archivo sync-test.txt debe estar trackeado en Git', () => {
    let trackedFiles;
    
    try {
      trackedFiles = execSync('git ls-files', { cwd: rootPath, encoding: 'utf8' });
    } catch (error) {
      throw new Error('No se pudo obtener los archivos trackeados por Git.');
    }
    
    expect(trackedFiles).toContain('sync-test.txt');
  });

  test('Debe tener commits que indiquen sincronización', () => {
    let commitMessages;
    
    try {
      commitMessages = execSync('git log --pretty=format:"%s"', { cwd: rootPath, encoding: 'utf8' });
    } catch (error) {
      throw new Error('No se pudo obtener los mensajes de commit.');
    }
    
    const hasSyncWork = commitMessages.toLowerCase().includes('sincronización') || 
                       commitMessages.toLowerCase().includes('sync') ||
                       commitMessages.toLowerCase().includes('actualizar') ||
                       commitMessages.toLowerCase().includes('pull') ||
                       commitMessages.toLowerCase().includes('github');
    
    expect(hasSyncWork).toBe(true);
  });

  test('El repositorio debe estar limpio (sin cambios pendientes)', () => {
    let status;
    
    try {
      status = execSync('git status --porcelain', { cwd: rootPath, encoding: 'utf8' }).trim();
    } catch (error) {
      throw new Error('No se pudo verificar el estado del repositorio.');
    }
    
    const lines = status.split('\n').filter(line => line.trim() !== '');
    const unignoredChanges = lines.filter(line => {
      const fileName = line.substring(3);
      return !fileName.includes('node_modules') && 
             !fileName.includes('.git') && 
             !fileName.includes('coverage') &&
             !fileName.endsWith('.log') &&
             !fileName.endsWith('package-lock.json');
    });
    
    expect(unignoredChanges.length).toBe(0);
  });
});

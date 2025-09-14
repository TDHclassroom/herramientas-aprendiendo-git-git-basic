const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Ejercicio 5: Conectar con GitHub y hacer push', () => {
  const rootPath = path.join(__dirname, '../../');
  
  test('El archivo AUTHORS.md debe existir', () => {
    const authorsPath = path.join(rootPath, 'AUTHORS.md');
    expect(fs.existsSync(authorsPath)).toBe(true);
    
    const content = fs.readFileSync(authorsPath, 'utf8');
    expect(content).toContain('# Autores');
    expect(content.length).toBeGreaterThan(20); // Debe tener contenido más allá del título
  });
  
  test('Debe tener un remote configurado', () => {
    let remotes;
    
    try {
      remotes = execSync('git remote -v', { cwd: rootPath, encoding: 'utf8' });
    } catch (error) {
      fail('No se pudo obtener la configuración de remotes. Asegúrate de haber configurado origin.');
    }
    
    expect(remotes).toContain('origin');
    expect(remotes.length).toBeGreaterThan(10);
  });

  test('Debe tener al menos 5 commits', () => {
    let commitCount;
    
    try {
      const logOutput = execSync('git rev-list --count HEAD', { cwd: rootPath, encoding: 'utf8' });
      commitCount = parseInt(logOutput.trim());
    } catch (error) {
      fail('No se pudo obtener el historial de commits.');
    }
    
    expect(commitCount).toBeGreaterThanOrEqual(5);
  });

  test('El archivo AUTHORS.md debe estar trackeado en Git', () => {
    let trackedFiles;
    
    try {
      trackedFiles = execSync('git ls-files', { cwd: rootPath, encoding: 'utf8' });
    } catch (error) {
      fail('No se pudo obtener los archivos trackeados por Git.');
    }
    
    expect(trackedFiles).toContain('AUTHORS.md');
  });

  test('No debe haber cambios pendientes', () => {
    let status;
    
    try {
      status = execSync('git status --porcelain', { cwd: rootPath, encoding: 'utf8' }).trim();
    } catch (error) {
      fail('No se pudo verificar el estado del repositorio.');
    }
    
    // Si hay archivos de configuración o test que no están trackeados, los ignoramos
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

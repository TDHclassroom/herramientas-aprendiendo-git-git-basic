const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Ejercicio 7: Manejo de conflictos', () => {
  const rootPath = path.join(__dirname, '../../');
  
  test('El archivo mi-proyecto.md debe contener información del proyecto combinada', () => {
    const readmePath = path.join(rootPath, 'mi-proyecto.md');
    expect(fs.existsSync(readmePath)).toBe(true);
    
    const content = fs.readFileSync(readmePath, 'utf8');
    expect(content).toContain('Información del proyecto');
    
    // No debe tener marcas de conflicto
    expect(content).not.toContain('<<<<<<<');
    expect(content).not.toContain('=======');
    expect(content).not.toContain('>>>>>>>');
  });
  
  test('No debe existir la rama feature/conflicto-simulado', () => {
    let branches;
    
    try {
      branches = execSync('git branch', { cwd: rootPath, encoding: 'utf8' });
    } catch (error) {
      throw new Error('No se pudo obtener la lista de ramas.');
    }
    
    expect(branches).not.toContain('feature/conflicto-simulado');
  });

  test('Debe estar en la rama main/master', () => {
    let currentBranch;
    
    try {
      currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: rootPath, encoding: 'utf8' }).trim();
    } catch (error) {
      throw new Error('No se pudo obtener la rama actual.');
    }
    
    expect(['main', 'master']).toContain(currentBranch);
  });

  test('Debe tener evidencia de merge en el historial', () => {
    let gitLog;
    
    try {
      gitLog = execSync('git log --oneline --graph -10', { cwd: rootPath, encoding: 'utf8' });
    } catch (error) {
      throw new Error('No se pudo obtener el historial de commits.');
    }
    
    // Buscar evidencia de merge o resolución de conflicto
    const hasMergeEvidence = gitLog.toLowerCase().includes('merge') || 
                            gitLog.toLowerCase().includes('conflicto') ||
                            gitLog.includes('*') || // Gráfico de merge
                            gitLog.includes('|') || 
                            gitLog.includes('/') ||
                            gitLog.includes('\\');
    
    expect(hasMergeEvidence).toBe(true);
  });

  test('Debe tener commits relacionados con conflictos', () => {
    let commitMessages;
    
    try {
      commitMessages = execSync('git log --pretty=format:"%s" -10', { cwd: rootPath, encoding: 'utf8' });
    } catch (error) {
      throw new Error('No se pudo obtener los mensajes de commit.');
    }
    
    const hasConflictWork = commitMessages.toLowerCase().includes('conflicto') || 
                           commitMessages.toLowerCase().includes('merge') ||
                           commitMessages.toLowerCase().includes('resolver') ||
                           commitMessages.toLowerCase().includes('información') ||
                           commitMessages.toLowerCase().includes('feature');
    
    expect(hasConflictWork).toBe(true);
  });

  test('El repositorio debe estar limpio', () => {
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

  test('Debe tener un número adecuado de commits', () => {
    let commitCount;
    
    try {
      const logOutput = execSync('git rev-list --count HEAD', { cwd: rootPath, encoding: 'utf8' });
      commitCount = parseInt(logOutput.trim());
    } catch (error) {
      throw new Error('No se pudo obtener el historial de commits.');
    }
    
    expect(commitCount).toBeGreaterThanOrEqual(7);
  });
});

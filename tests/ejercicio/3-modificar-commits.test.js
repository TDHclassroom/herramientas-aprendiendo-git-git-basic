const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Ejercicio 3: Modificar archivos y commits adicionales', () => {
  const rootPath = path.join(__dirname, '../../');
  
  test('El archivo mi-proyecto.md debe contener las características añadidas', () => {
    const readmePath = path.join(rootPath, 'mi-proyecto.md');
    expect(fs.existsSync(readmePath)).toBe(true);
    
    const content = fs.readFileSync(readmePath, 'utf8');
    expect(content).toContain('## Características');
    expect(content).toContain('Aprendiendo Git paso a paso');
  });
  
  test('El archivo CHANGELOG.md debe existir con el contenido correcto', () => {
    const changelogPath = path.join(rootPath, 'CHANGELOG.md');
    expect(fs.existsSync(changelogPath)).toBe(true);
    
    const content = fs.readFileSync(changelogPath, 'utf8');
    expect(content).toContain('# Changelog');
    expect(content).toContain('## v1.0.0');
    expect(content).toContain('Proyecto inicial');
  });

  test('Debe tener al menos 3 commits', () => {
    let commitCount;
    
    try {
      const logOutput = execSync('git rev-list --count HEAD', { cwd: rootPath, encoding: 'utf8' });
      commitCount = parseInt(logOutput.trim());
    } catch (error) {
      fail('No se pudo obtener el historial de commits. Asegúrate de haber hecho al menos 3 commits.');
    }
    
    expect(commitCount).toBeGreaterThanOrEqual(3);
  });

  test('Los commits deben tener mensajes descriptivos', () => {
    let commitMessages;
    
    try {
      commitMessages = execSync('git log --pretty=format:"%s" -3', { cwd: rootPath, encoding: 'utf8' });
    } catch (error) {
      fail('No se pudo obtener los mensajes de commit.');
    }
    
    // Verificar que hay mensajes de commit (no están vacíos)
    const messages = commitMessages.split('\n');
    expect(messages.length).toBeGreaterThanOrEqual(3);
    
    messages.forEach(message => {
      expect(message.length).toBeGreaterThan(10); // Mensajes descriptivos
    });
  });

  test('Los archivos deben estar trackeados en Git', () => {
    let trackedFiles;
    
    try {
      trackedFiles = execSync('git ls-files', { cwd: rootPath, encoding: 'utf8' });
    } catch (error) {
      fail('No se pudo obtener los archivos trackeados por Git.');
    }
    
    expect(trackedFiles).toContain('mi-proyecto.md');
    expect(trackedFiles).toContain('CHANGELOG.md');
  });
});

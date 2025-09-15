const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Ejercicio 1: Inicializar Git', () => {
  const rootPath = path.join(__dirname, '../../');
  
  test('El repositorio Git debe estar inicializado', () => {
    const gitPath = path.join(rootPath, '.git');
    expect(fs.existsSync(gitPath)).toBe(true);
    
    const stats = fs.statSync(gitPath);
    expect(stats.isDirectory()).toBe(true);
  });
  
  test('La configuración de usuario debe estar establecida', () => {
    let userName, userEmail;
    
    try {
      // Intentar obtener la configuración local primero, luego global
      try {
        userName = execSync('git config user.name', { cwd: rootPath, encoding: 'utf8' }).trim();
      } catch (e) {
        userName = execSync('git config --global user.name', { encoding: 'utf8' }).trim();
      }
      
      try {
        userEmail = execSync('git config user.email', { cwd: rootPath, encoding: 'utf8' }).trim();
      } catch (e) {
        userEmail = execSync('git config --global user.email', { encoding: 'utf8' }).trim();
      }
    } catch (error) {
      throw new Error('No se pudo obtener la configuración de Git. Asegúrate de haber configurado user.name y user.email');
    }
    
    expect(userName).toBeTruthy();
    expect(userName.length).toBeGreaterThan(0);
    expect(userEmail).toBeTruthy();
    expect(userEmail.length).toBeGreaterThan(0);
    expect(userEmail).toContain('@');
  });

  test('El comando git status debe funcionar correctamente', () => {
    let gitStatus;
    
    try {
      gitStatus = execSync('git status --porcelain', { cwd: rootPath, encoding: 'utf8' });
    } catch (error) {
      throw new Error('No se pudo ejecutar git status. Verifica que el repositorio esté inicializado correctamente.');
    }
    
    // No verificamos el contenido específico, solo que el comando funcione
    expect(typeof gitStatus).toBe('string');
  });
});

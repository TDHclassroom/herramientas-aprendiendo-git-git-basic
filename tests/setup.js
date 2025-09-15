const { execSync } = require('child_process');
const path = require('path');

// Setup para tests en entorno CI y local
const rootPath = path.join(__dirname, '../');

beforeAll(() => {
  try {
    console.log('🔧 Configurando entorno de tests...');
    
    // Configurar Git si no está configurado
    try {
      const userName = execSync('git config user.name', { cwd: rootPath, encoding: 'utf8' }).trim();
      console.log(`✅ Git user.name ya configurado: ${userName}`);
    } catch {
      console.log('⚙️ Configurando Git user.name...');
      execSync('git config user.name "GitHub Classroom Test"', { cwd: rootPath });
    }
    
    try {
      const userEmail = execSync('git config user.email', { cwd: rootPath, encoding: 'utf8' }).trim();
      console.log(`✅ Git user.email ya configurado: ${userEmail}`);
    } catch {
      console.log('⚙️ Configurando Git user.email...');
      execSync('git config user.email "classroom-test@github.com"', { cwd: rootPath });
    }
    
    // Asegurar que estamos en la rama correcta
    try {
      const currentBranch = execSync('git branch --show-current', { cwd: rootPath, encoding: 'utf8' }).trim();
      console.log(`📂 Rama actual: ${currentBranch}`);
    } catch (error) {
      console.log('⚠️ No se pudo determinar la rama actual:', error.message);
    }
    
    console.log('✅ Setup de Git completado');
  } catch (error) {
    console.error('⚠️ Error durante setup de Git:', error.message);
    // No fallar el setup, solo mostrar warning
  }
});
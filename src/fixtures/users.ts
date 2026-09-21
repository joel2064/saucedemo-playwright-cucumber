/**
 * Datos de prueba centralizados: única fuente de verdad para las credenciales.
 * Evita tener contraseñas repartidas (hardcodeadas) por los step definitions.
 * En Sauce Demo todos los usuarios comparten la misma contraseña.
 */
export interface User {
  username: string;
  password: string;
}

const PASSWORD = 'secret_sauce';

export const USERS = {
  standard: { username: 'standard_user', password: PASSWORD },
  lockedOut: { username: 'locked_out_user', password: PASSWORD },
  problem: { username: 'problem_user', password: PASSWORD },
  performanceGlitch: { username: 'performance_glitch_user', password: PASSWORD },
} as const satisfies Record<string, User>;

/**
 * Devuelve las credenciales a partir del nombre de usuario (el que usan los
 * .feature, p. ej. "standard_user"). Lanza un error claro si no existe, para
 * que un typo en el feature falle con un mensaje entendible.
 */
export function getUserByUsername(username: string): User {
  const user = Object.values(USERS).find((u) => u.username === username);
  if (!user) {
    throw new Error(
        `Usuario no encontrado en fixtures/users.ts: "${username}". ` +
        `Usuarios disponibles: ${Object.values(USERS).map((u) => u.username).join(', ')}`,
    );
  }
  return user;
}

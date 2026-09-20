/**
 * Datos de prueba centralizados. El feature de login usa datos inline vía
 * `Ejemplos`, pero esta capa queda lista para los escenarios de carrito y
 * checkout que se sumarán después (evita credenciales repartidas por el código).
 */
export interface User {
  username: string;
  password: string;
}

export const USERS = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
  performanceGlitch: { username: 'performance_glitch_user', password: 'secret_sauce' },
} as const satisfies Record<string, User>;

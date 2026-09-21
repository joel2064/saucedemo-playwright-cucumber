module.exports = {
  default: {
    // Transpila TypeScript al vuelo (sin build previo)
    requireModule: ['ts-node/register'],
    // World y hooks primero, luego los step definitions
    require: ['src/support/**/*.ts', 'src/steps/**/*.ts'],
    // Ubicación de los .feature
    paths: ['src/features/**/*.feature'],
    parallel: 2,
    // Reportes: consola + HTML + JSON (el JSON permite enganchar reportes externos)
    format: [
      'progress',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
      'summary',
    ],
    formatOptions: { snippetInterface: 'async-await' },
  },
};

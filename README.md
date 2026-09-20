# Sauce Demo · Playwright + Cucumber (TypeScript)

Suite de pruebas automatizadas E2E para [Sauce
Demo](https://www.saucedemo.com/), construida con **Playwright** y
**Cucumber (BDD/Gherkin)** en **TypeScript**, aplicando el patrón **Page
Object Model**.

## Requisitos

-   **Node.js** 22 LTS o superior
-   **npm** 10 o superior
-   Conexión a internet para descargar dependencias y los navegadores de
    Playwright

## Instalación

``` bash
npm install
npx playwright install
```

Opcionalmente, copia `.env.example` a `.env` para personalizar la
configuración.

``` bash
cp .env.example .env
```

## Ejecución

``` bash
# Toda la suite (headless por defecto)
npm test

# Con navegador visible
npm run test:headed

# Smoke
npm run test:smoke

# Escenarios @happyPath
npm run test:valid

# Escenarios @sadPath
npm run test:invalid

# Verificar tipos sin ejecutar pruebas
npm run typecheck
```

## Ejecución por tags

La suite utiliza tags de Cucumber para organizar los escenarios en tres dimensiones:

| Categoría | Tags | Propósito |
|---|---|---|
| Funcionalidad | `@login`, `@cart`, `@checkout` | Ejecutar una funcionalidad específica |
| Tipo de flujo | `@happyPath`, `@sadPath` | Diferenciar flujos exitosos de flujos negativos o de validación |
| Suite | `@smoke` | Identificar escenarios críticos |

Ejemplos:

``` bash
# Todos los happy paths
npx cucumber-js --tags "@happyPath"

# Todos los sad paths
npx cucumber-js --tags "@sadPath"

# Login exitoso
npx cucumber-js --tags "@login and @happyPath"

# Login negativo
npx cucumber-js --tags "@login and @sadPath"

# Solo carrito
npx cucumber-js --tags "@cart"

# Solo checkout
npx cucumber-js --tags "@checkout"

# Carrito o checkout
npx cucumber-js --tags "@cart or @checkout"

# Smoke
npx cucumber-js --tags "@smoke"
```

### Convención de tags

Los tags `@happyPath` y `@sadPath` se aplican a nivel de escenario. De
esta forma, un mismo feature puede contener flujos positivos y negativos
sin mezclar su clasificación.

Ejemplo de login:

``` gherkin
@login

@smoke @happyPath
Esquema del escenario: Inicio de sesión con credenciales válidas
  ...

@sadPath
Esquema del escenario: Inicio de sesión con credenciales inválidas
  ...
```

Carrito y checkout actualmente contienen flujos exitosos:

``` gherkin
@cart
@happyPath
Escenario: Agregar un producto al carrito
  ...

@checkout
@happyPath
Escenario: Completar una compra hasta la confirmación
  ...
```

Esta taxonomía evita acoplar los tags al detalle de implementación. Por
ejemplo, `@login and @sadPath` identifica cualquier escenario negativo
de autenticación sin depender de nombres como `@credenciales-invalidas`.

## Configuración

Se controla por variables de entorno (`.env` o variables inline).

  Variable     Default                       Descripción
  ------------ ----------------------------- ----------------------------------
  `BASE_URL`   `https://www.saucedemo.com`   URL base de la aplicación
  `BROWSER`    `chromium`                    `chromium`, `firefox` o `webkit`
  `HEADLESS`   `true`                        `false` para ver el navegador
  `TIMEOUT`    `30000`                       Timeout por paso (ms)

Ejemplo (Windows PowerShell):

``` powershell
$env:BROWSER="firefox"; $env:HEADLESS="false"; npm test
```

## Estructura del proyecto

``` text
saucedemo-playwright-cucumber/
├── src/
│   ├── features/
│   │   ├── login.feature
│   │   ├── cart.feature
│   │   └── checkout.feature
│   ├── pages/
│   │   ├── base.page.ts
│   │   ├── login.page.ts
│   │   ├── inventory.page.ts
│   │   ├── cart.page.ts
│   │   ├── checkout-information.page.ts
│   │   ├── checkout-overview.page.ts
│   │   └── checkout-complete.page.ts
│   ├── steps/
│   │   ├── login.steps.ts
│   │   ├── cart.steps.ts
│   │   └── checkout.steps.ts
│   ├── support/
│   │   ├── world.ts
│   │   ├── hooks.ts
│   │   └── config.ts
│   └── fixtures/
│       └── users.ts
├── reports/
├── cucumber.js
├── tsconfig.json
├── package.json
└── .env.example
```

## Reportes

Tras cada corrida se generan en `reports/`:

-   `cucumber-report.html` --- reporte navegable con capturas de los
    fallos.
-   `cucumber-report.json` --- salida JSON para integraciones o reportes
    externos.

En caso de fallo, se adjunta automáticamente una captura de pantalla al
reporte.

## Escenarios cubiertos

### Login

-   `@login @smoke @happyPath` --- login exitoso con `standard_user`.
-   `@login @sadPath` --- usuario bloqueado (`locked_out_user`).
-   `@login @sadPath` --- credenciales incorrectas.
-   `@login @sadPath` --- usuario vacío.
-   `@login @sadPath` --- contraseña vacía.

### Carrito

-   `@cart @happyPath` --- agregar un producto y verificar el contador.
-   `@cart @happyPath` --- visualizar el producto agregado en el
    carrito.

### Checkout

-   `@checkout @happyPath` --- completar una compra de extremo a extremo
    hasta la confirmación (`Thank you for your order!`).

## Credenciales de prueba

  Usuario             Contraseña
  ------------------- ----------------
  `standard_user`     `secret_sauce`
  `locked_out_user`   `secret_sauce`

Ver `ESTRATEGIA.md` para el detalle de la estrategia de automatización y
los patrones aplicados.

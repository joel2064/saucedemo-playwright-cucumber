# Estrategia de automatización y patrones

## Enfoque general

La suite sigue un enfoque **BDD (Behavior-Driven Development)**: los escenarios se
describen en Gherkin, en lenguaje natural, de modo que sean legibles por perfiles
técnicos y de negocio. Cada escenario se traduce a acciones concretas sobre la
aplicación mediante *step definitions* que se apoyan en objetos de página.

## Stack

- **Playwright** como motor de automatización de navegador: auto-espera integrada
  (reduce la inestabilidad típica de las esperas manuales), aserciones *web-first*
  y soporte multi-navegador (Chromium, Firefox, WebKit) con una sola API.
- **Cucumber (cucumber-js)** para la capa BDD y el binding con los `.feature`.
- **TypeScript** por el tipado estático, que detecta errores en tiempo de compilación
  y mejora el autocompletado y la mantenibilidad.

## Patrones aplicados

### Page Object Model (POM)
Cada página de la aplicación se modela como una clase (`LoginPage`, `InventoryPage`)
que encapsula sus *locators* y las acciones posibles sobre ella. Los step definitions
no conocen selectores ni detalles del DOM: solo orquestan acciones de alto nivel
(`loginPage.login(...)`). Esto concentra el impacto de un cambio de UI en un único
lugar. Una clase `BasePage` centraliza lo común (referencia a `page`, navegación).

### Custom World (aislamiento de estado)
Cucumber instancia un **World nuevo por cada escenario**. Ahí viven el `context` y la
`page` de Playwright y los page objects (creados de forma perezosa). Como cada
escenario tiene su propio World, el estado queda **aislado por diseño**, lo que
habilita la ejecución en paralelo sin colisiones y sin manejar concurrencia a mano.

### Hooks
- `BeforeAll`: lanza el navegador una sola vez (más rápido).
- `Before`: crea un `context` y una `page` limpios por escenario (aislamiento total,
  sin cookies ni sesión compartida entre pruebas).
- `After`: si el escenario falló, adjunta una captura de pantalla al reporte; luego
  cierra `page` y `context`.
- `AfterAll`: cierra el navegador.

### Datos de prueba
Los casos inválidos se implementan con **`Esquema del escenario` + `Ejemplos`**
(data-driven): una sola definición cubre usuario bloqueado, credenciales incorrectas
y campos vacíos. Los datos reutilizables entre escenarios viven en `src/fixtures`.

## Selectores

Se priorizan los atributos **`data-test`** que expone Sauce Demo (p. ej.
`[data-test="username"]`, `[data-test="error"]`), por ser estables y pensados para
automatización, en lugar de XPaths posicionales frágiles.

## Configuración por entorno

Navegador, modo *headless*, URL base y timeouts se leen de variables de entorno con
valores por defecto (`src/support/config.ts`), de modo que la misma suite corre en
local (con navegador visible) y en CI (headless) sin tocar el código.

## Reportes

Cada corrida genera reporte **HTML** (navegable, con capturas de los fallos) y **JSON**.
El JSON sirve como punto de integración para reportes externos o dashboards de CI.

## Escalabilidad

La estructura por carpetas (`features`, `pages`, `steps`, `support`, `fixtures`)
está pensada para crecer: sumar el flujo de **carrito** y **checkout** implica añadir
sus `.feature`, sus page objects (`CartPage`, `CheckoutPage`, …) y sus steps, sin
tocar la infraestructura existente (World, hooks y configuración se reutilizan tal cual).

# SAUCEDEMO_RETO_PLAYWRIGHT

## Descripción del Proyecto

Este repositorio contiene scripts de pruebas automatizadas para el sitio web Sauce Demo utilizando Playwright como framework de automatización de pruebas.

## Estructura de Directorios

```
SAUCEDEMO_RETO_PLAYWRIGHT/
│
├── global-setup/
│   ├── auth/
│   │    └── .auth-user.json
│   └── auth-global-setup.ts
├── node_modules/
├── pages/
│   ├── BasePage.ts
│   ├── CartPage.ts
│   ├── CheckoutCompletePage.ts
│   ├── CheckoutStepOnePage.ts
│   ├── CheckoutStepTwoPage.ts
│   ├── InventoryPage.ts
│   └── LoginPage.ts
├── playwright-report/
├── test-data/
│   ├── checkout-user-data.json
│   ├── credentials.json
│   └── products-data.json
├── test-results/
├── tests/
│   ├── buy/
│   │   ├── alternate-buy-flow.auth.spec.ts
│   │   └── buy-flow.auth.spec.ts
│   └── login/
│       └── login-flow.spec.ts
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.ts
└── README.md
```

## Componentes del Proyecto

### Pages

El proyecto sigue el patrón de diseño Page Object Model (POM):

- `BasePage.ts`: Contiene métodos y propiedades comunes utilizados en todos los objetos de página
- `LoginPage.ts`: Objeto de página para la página de inicio de sesión
- `InventoryPage.ts`: Objeto de página para la página principal de inventario/productos
- `CartPage.ts`: Objeto de página para la página del carrito de compras
- `CheckoutStepOnePage.ts`: Objeto de página para el primer paso del proceso de pago (información del usuario)
- `CheckoutStepTwoPage.ts`: Objeto de página para el segundo paso del proceso de pago (revisión del pedido)
- `CheckoutCompletePage.ts`: Objeto de página para la página de finalización del pago

### Tests

La suite de pruebas está organizada en diferentes categorías:

- `buy/`: Pruebas relacionadas con el flujo de compra
  - `buy-flow.auth.spec.ts`: Pruebas de flujo de compra estándar (con autenticación previa)
  - `alternate-buy-flow.auth.spec.ts`: Pruebas de flujo de compra alternativo (con autenticación previa)
- `login/`: Pruebas para la funcionalidad de inicio de sesión
  - `login-flow.spec.ts`: Pruebas de flujo de inicio de sesión (sin autenticación previa)

### Configuración Global

- `global-setup/`: Configuración para la preparación de pruebas
  - `auth/`: Configuración de autenticación para pruebas
    - `.auth-user.json`: Credenciales de usuario para autenticación
  - `auth-global-setup.ts`: Script para configurar la autenticación global

### Archivos de Configuración

- `playwright.config.ts`: Archivo de configuración de Playwright
- `.env`: Variables de entorno como la url principal
- `package.json`: Dependencias y scripts del proyecto
- `.gitignore`: Archivos y directorios que serán ignorados por Git

### Datos de Prueba

El directorio `test-data/` contiene archivos JSON con datos utilizados en las pruebas:

- `checkout-user-data.json`: Datos del usuario para el proceso de pago
- `credentials.json`: Credenciales para pruebas de inicio de sesión
- `products-data.json`: Información de productos utilizada en las pruebas

## Primeros Pasos

### Requisitos Previos

- Node.js
- npm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/zagui-master/reto_playwright_t_evolvers.git

# Navegar al directorio del proyecto
cd saucedemo_reto_playwright

# Instalar dependencias
npm install
```

### Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas que no requieran autenticación previa
npx playwright test --project=chromium

# Ejecutar pruebas específicas en cualquier navegador, que no requieran autenticación previa
npx playwright test tests/login/login-flow.spec.ts

# Ejecutar pruebas específicas en un navegador determinado, que no requieran autenticación previa
npx playwright test --project="chromium" tests/login/login-flow.spec.ts

# Ejecutar pruebas con autenticación previa (archivos .auth.spec.ts)
# Es necesario seleccionar el proyecto "authenticated" para estos tests
npx playwright test --project=authenticated tests/buy/buy-flow.auth.spec.ts

# Ejecutar todas las pruebas que requieran autenticación previa
npx playwright test --project=authenticated

# Generar y ver informe HTML
npx playwright show-report
```

**Importante**: Para ejecutar correctamente los tests que requieren autenticación (con el sufijo `.auth.spec.ts`), debes especificar el proyecto "authenticated" usando el parámetro `--project=authenticated`. Esta configuración garantiza que se aplique la autenticación previa necesaria para estos tests.

## Configuración del Proyecto en VSCode

Puedes seleccionar fácilmente entre diferentes proyectos de Playwright (como "authenticated", "chromium", etc.) directamente desde la interfaz de VSCode:

![Selección de Proyecto en VSCode](/screenshots/vscode-project-selection.png)

Para seleccionar el proyecto "authenticated" y ejecutar tests con autenticación previa:

1. Abre el explorador de tests de Playwright en VSCode
2. Haz clic en el selector de proyectos en la parte superior
3. Selecciona "authenticated" de la lista desplegable
4. Ahora puedes ejecutar los tests con `.auth.spec.ts` y se aplicará la autenticación automáticamente

Esta funcionalidad facilita enormemente la ejecución de tests que requieren diferentes configuraciones sin necesidad de recordar comandos complejos.

## Autenticación

La configuración de autenticación se maneja en el directorio `global-setup/auth/`, permitiendo que las pruebas se ejecuten con estados preautenticados.

### Nomenclatura para Tests con Autenticación

Para usar la autenticación en un test específico, es necesario:

1. Añadir el sufijo `.auth` antes de `.spec` en el nombre del archivo del test. Por ejemplo:

   - `buy-flow.auth.spec.ts` - Este test requiere autenticación previa
   - `login-flow.spec.ts` - Este test se ejecutará sin autenticación previa

2. Ejecutar el test usando el proyecto "authenticated" usando el parámetro `--project=authenticated`:
   ```bash
   npx playwright test --project=authenticated tests/buy/buy-flow.auth.spec.ts
   ```

También puedes seleccionar el proyecto "authenticated" desde la interfaz de usuario del editor como se explicó en la sección anterior.

Esta configuración asegura que el estado de autenticación se establezca correctamente antes de ejecutar los tests que lo requieren.

Nota: No todas las pruebas requieren configuración de autenticación.
Se recomienda usar el sufijo `.auth` y el proyecto "authenticated" solo para pruebas específicas que requieran autenticación.
Esto ayuda a mantener la ejecución limpia, rápida y evita sobrecarga innecesaria para pruebas que no dependen de estados preautenticados.

## Informes

Los informes de pruebas se generan en el directorio `playwright-report/`, proporcionando información detallada sobre las ejecuciones de pruebas.

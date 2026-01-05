# Rick and Morty Dashboard - Refactorización y Correcciones




## Estado Inicial del Repositorio

El proyecto inicial presentaba una estructura básica de Next.js 15 con TypeScript para consumir la API de Rick and Morty. El repositorio base incluía problemas típicos de código heredado:

### Estructura Inicial Identificada
-Mala sintáxis en nombramiento de carpetas
- Componentes en `src/components/` y `src/app/components/` (organización dispersa)
- Componentes sin tipado adecuado o con uso excesivo de `any`
- Consumo de API directo con `fetch` en los componentes
- Mezcla de frameworks CSS (Tailwind y Bootstrap)
- Componentes duplicados (`Card.tsx` vs `CharacterCard.tsx`)
- Rutas de login/register sin funcionalidad completa
- Falta de interfaces y tipos definidos para la API
- Manejo básico de estados de carga y errores

## Problemas Identificados

### TypeScript y Tipado
- Uso excesivo de `any` en múltiples archivos, limitando la verificación de tipos
- Interfaces faltantes para respuestas de API y props de componentes
- Funciones sin tipos definidos en parámetros y retornos

### Arquitectura y Organización
- Consumo de API no centralizado (llamadas `fetch` directas en componentes)
- Componentes no utilizados ocupando espacio en el proyecto
- Duplicación de código y definiciones de tipos

### UI y Estilos
- Mezcla de frameworks CSS (Tailwind y Bootstrap)
- Componentes con estilos inconsistentes
- Navbar con enlaces a rutas inexistentes (login, register)

## Cambios Realizados

### 1. Mejoras en TypeScript

**Tipos e Interfaces:**
- Eliminación completa de `any` innecesarios
- Creación de interfaces en `src/types/character/character.ts`:
  - `Character`: estructura completa de personajes
  - `ApiResponse`: respuesta de la API
  - `CharacterStats`: estadísticas de personajes
- Tipado completo de props en todos los componentes
- Tipos definidos para funciones y parámetros

**Archivos modificados:**
- `src/types/character/character.ts` - Interfaces completas
- `src/components/CharacterCard.tsx` - Props tipadas
- `src/components/StatsCard.tsx` - Tipos de variantes
- `src/components/DashboardHeader.tsx` - Interface para props
- `src/services/api.ts`- para centralizar todas las peticiones  con manejo de errores y tipos definidos,manejo adecuado de errores HTTP



**Beneficios:**
- Un solo punto de mantenimiento para cambios en la API
- Reutilización del código en diferentes componentes
- Manejo consistente de errores

### 3. Refactorización de Componentes

**Dashboard (`src/app/dashboard/page.tsx`):**
- Implementación de filtros inline (búsqueda por nombre y estado)
- Cálculo de estadísticas (Total, Alive, Dead, Unknown)
- Manejo de estados de carga y errores
- Filtrado reactivo con `useEffect`
- Uso de `useMemo` para optimización

**Componentes reutilizables:**
- `CharacterCard`: Muestra nombre, imagen, especie y estado
- `StatsCard`: Tarjeta de estadísticas con variantes de color
- `DashboardHeader`: Encabezado con título y subtítulo
- `LoadingState`: Estado de carga
- `Navbar`: Navegación principal

### 4. Limpieza del Proyecto

**Archivos eliminados:**
- `src/components/FiltersPanel.tsx` - Componente separado reemplazado por filtros inline en el dashboard
- `src/app/components/Card.tsx` - Componente duplicado, se utiliza `CharacterCard` en su lugar
- `src/app/components/Sidebar.tsx` - Componente no utilizado en ninguna parte del proyecto
- `src/utils/helpers.ts` - Archivo con función `isAlive` que no se utilizaba en ningún componente
- Rutas y componentes de login/register - Eliminados porque no forman parte del alcance mínimo requerido ni tenían funcionalidad

**Justificación:**
- Se eliminaron componentes duplicados o no utilizados para mantener el código limpio
- Se priorizó mantener solo lo necesario para cumplir con el alcance funcional mínimo
- La estructura quedó más clara y fácil de mantener

**Estructura final:**
```
src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CharacterCard.tsx
│   ├── DashboardHeader.tsx
│   ├── LoadingState.tsx
│   ├── Navbar.tsx
│   └── StatsCard.tsx
├── services/
│   └── api.ts
└── types/
    └── character/
        └── character.ts
```


**Bootstrap como framework principal:**
- Integración de Bootstrap 5.3.0 via CDN en `layout.tsx` usando el componente `Script` de Next.js
- Conversión de componentes que usaban Tailwind a Bootstrap para mantener consistencia
- Estilos unificados en toda la aplicación

**Navbar añadido:**
- Solo mantiene la funcionalidad necesaria (navegación a Dashboard)

**Componentes ajustados:**
- `DashboardHeader`: Conversión de clases Tailwind (`text-2xl font-bold`) a Bootstrap (`h2 fw-bold`)
- `LoadingState`: Cambio de clases Tailwind (`flex justify-center`) a Bootstrap (`d-flex justify-content-center`) con spinner nativo
- Cards y elementos usando sistema de grid de Bootstrap (`row`, `col-lg-*`, etc.)

## Estado Final del Proyecto

### Funcionalidades Implementadas

✅ **Alcance mínimo cumplido:**
- Lista de personajes con nombre, imagen, especie y estado
- Filtrado por nombre (búsqueda)
- Filtrado por estado (Alive, Dead, Unknown)
- Estadísticas de personajes
- Manejo de estados de carga
- Manejo de errores
- Compilación sin errores de TypeScript

### Calidad del Código

✅ **TypeScript:**
- Sin uso de `any` innecesarios
- Interfaces definidas para todos los tipos
- Compilación sin errores

✅ **Arquitectura:**
- Separación de responsabilidades
- Servicio centralizado para API
- Componentes reutilizables y modulares

✅ **Mantenibilidad:**
- Código limpio y organizado
- Sin componentes duplicados o no utilizados
- Estilos consistentes

## Tecnologías Utilizadas

- **Next.js 15.0.0** - Framework React
- **TypeScript 5.9.3** - Tipado estático
- **React 18.3.0** - Biblioteca UI
- **Bootstrap 5.3.0** - Framework CSS
- **API de Rick and Morty** - Fuente de datos

## Estructura del Proyecto

El proyecto sigue una estructura clara y escalable:

- `src/app/` - Páginas y layouts de Next.js
- `src/components/` - Componentes reutilizables
- `src/services/` - Servicios y lógica de API
- `src/types/` - Definiciones de tipos TypeScript

## Comparación: Estado Inicial vs Estado Final

### Cambios Principales

| Aspecto | Estado Inicial | Estado Final |
|---------|---------------|--------------|
| **Tipado TypeScript** | Uso de `any`, interfaces faltantes | Tipado completo, interfaces definidas |
| **Consumo de API** | `fetch` directo en componentes | Servicio centralizado (`api.ts`) |
| **Componentes** | Duplicados y no utilizados | Limpio, solo componentes necesarios |
| **Estilos** | Mezcla Tailwind/Bootstrap | Bootstrap unificado |
| **Navbar** | Enlaces a rutas inexistentes | Solo funcionalidad necesaria |
| **Estructura** | Organización dispersa | Estructura clara y escalable |

### Archivos Nuevos Creados

- `src/services/api.ts` - Servicio centralizado para consumo de API
- `src/types/character/character.ts` - Interfaces TypeScript para tipos de datos

### Archivos Modificados

- `src/app/dashboard/page.tsx` - Refactorizado con filtros inline y mejor manejo de estados
- `src/app/layout.tsx` - Agregado Bootstrap CDN
- `src/components/Navbar.tsx` - Reorganizado y simplificado
- `src/components/DashboardHeader.tsx` - Convertido a Bootstrap
- `src/components/LoadingState.tsx` - Convertido a Bootstrap
- Todos los componentes con props completamente tipadas

## Conclusiones

El proyecto ha sido refactorizado manteniendo la estructura original pero mejorando significativamente:

- **Calidad del código**: TypeScript correctamente implementado, sin `any` innecesarios
- **Organización**: Código limpio, estructura clara, sin duplicaciones
- **Funcionalidad**: Cumple con todos los requisitos del alcance mínimo del ejercicio
- **Mantenibilidad**: Fácil de extender y modificar, separación de responsabilidades

Todas las correcciones se realizaron siguiendo las mejores prácticas de desarrollo, sin reescribir desde cero y respetando la estructura existente del repositorio base, tal como se solicita en las instrucciones de la prueba técnica.

corrección hecha por Daniela Orrego clan Gosling.

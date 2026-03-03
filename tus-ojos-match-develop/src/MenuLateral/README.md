# Menú Lateral - "Donde Comprar"

Este módulo implementa un menú lateral deslizante que muestra información sobre dónde comprar productos online.

## Estructura

```
MenuLateral/
├── config.ts                    # Configuración del global en Payload CMS
├── Component.tsx                # Componente servidor que obtiene los datos
├── Component.client.tsx         # Componente cliente con interacciones
├── MenuLateralWrapper.tsx       # Wrapper que conecta con el provider
├── RowLabel.tsx                 # Componente para labels en el admin
├── hooks/
│   └── revalidateMenuLateral.ts # Hook para revalidar caché
└── README.md                    # Esta documentación
```

## Características

- **Menú deslizante**: Se abre desde el lado derecho de la pantalla
- **Sistema de tabs**: Permite filtrar farmacias por categorías (RedOff, DryOff, etc.)
- **Lista de farmacias**: Muestra logos, nombres y enlaces externos
- **Responsive**: Adaptado para móvil y escritorio
- **Administrable**: Totalmente configurable desde el panel de Payload CMS

## Uso en el código

### Botón para abrir el menú

```tsx
import { DondeComprarButton } from '@/components/DondeComprarButton'

// Uso básico
<DondeComprarButton />

// Con variantes
<DondeComprarButton variant="outline" />
<DondeComprarButton variant="text" />

// Sin icono
<DondeComprarButton showIcon={false} />
```

### Controlar el menú programáticamente

```tsx
'use client'
import { useMenuLateral } from '@/providers/MenuLateral'

function MiComponente() {
  const { openMenu, closeMenu, toggleMenu, isOpen } = useMenuLateral()
  
  return (
    <button onClick={openMenu}>
      Abrir menú lateral
    </button>
  )
}
```

## Configuración en Payload CMS

### Acceder al menú

1. Ingresa al panel de administración de Payload CMS
2. Ve a **Globals** → **Menu Lateral**

### Campos disponibles

#### Título
Título principal que aparece en el menú (ej: "Compra Online")

#### Subtítulo
Texto descriptivo debajo del título

#### Tabs (Pestañas)
Define las categorías para filtrar farmacias:
- **Nombre**: Texto visible en la pestaña
- **Slug**: Identificador único (sin espacios, en minúsculas)

#### Farmacias
Lista de farmacias con:
- **Nombre**: Nombre de la farmacia
- **Logo**: Imagen/logo de la farmacia
- **URL**: Enlace al sitio web
- **Abrir en nueva pestaña**: Checkbox para controlar el comportamiento del enlace
- **Categorías asociadas**: Slugs de las tabs donde aparecerá esta farmacia

## Ejemplo de configuración

### Tabs
```
1. RedOff (slug: redoff)
2. DryOff (slug: dryoff)
```

### Farmacias
```
1. Farmacias Ahumada
   - Logo: [imagen]
   - URL: https://www.farmaciasahumada.cl
   - Categorías: redoff, dryoff

2. Cruz Verde
   - Logo: [imagen]
   - URL: https://www.cruzverde.cl
   - Categorías: redoff
```

## Estilos y personalización

El menú usa Tailwind CSS y puede ser personalizado editando:
- `Component.client.tsx` para modificar los estilos
- Las clases CSS existentes siguen el diseño proporcionado

## Provider

El estado del menú lateral es global y está disponible en toda la aplicación gracias al `MenuLateralProvider`:

```tsx
// Ya está configurado en src/providers/index.tsx
<MenuLateralProvider>
  {children}
</MenuLateralProvider>
```

## Iconos

El menú usa iconos de `lucide-react`:
- `X`: Para cerrar el menú
- `ExternalLink`: Para indicar enlaces externos
- `MapPin`: En el botón "Donde Comprar"

## Notas técnicas

- Los datos se cachean automáticamente usando `unstable_cache` de Next.js
- El tag de caché es `global_menu-lateral`
- Después de cada cambio en el CMS, el caché se revalida automáticamente
- El menú se renderiza en el layout principal pero permanece oculto hasta que se abre

# Guía de Commits

Adoptamos el estándar de **Conventional Commits**.

### Formato

`tipo: descripción en minúsculas`

Si quieres especificar **dónde** ocurrió el cambio (módulo, carpeta, área del sitio), puedes usar **scope** entre paréntesis:

`tipo(scope): descripción en minúsculas`

El **scope es opcional**: usalo cuando aporte contexto real; si con el tipo y la descripción ya se entiende, no hace falta.

### Tipos principales

- **feat**: Una nueva funcionalidad (ej. `feat(libro): añadir sección de la guía con paso de página`).
- **fix**: Corrección de un error (ej. `fix(vite): corregir base path en el preview del build`).
- **refactor**: Cambios en el código que no añaden funciones ni corrigen errores (ej. `refactor(guia): extraer datos del contenido a un módulo`).
- **chore**: Mantenimiento que no cambia el comportamiento del producto: dependencias, tooling, configs, tareas repetitivas (ej. `chore(deps): actualizar vite y @vitejs/plugin-react`).
- **docs**: Cambios solo en la documentación.
- **style**: Cambios de formato (espacios, comas, etc.) que no afectan la lógica.

### Cuerpo del mensaje (opcional)

Si el cambio tiene varias partes, deja una **línea en blanco** después del título y usa **viñetas** para detallar. Ayuda en el historial y en las descripciones de PR.

Ejemplo:

```
feat(guia): integrar flip de páginas y estilos del contenedor del libro

- Contenedor con proporción fija para el visor; teclas y botones de anterior/siguiente
- Ajustes en index.css para el layout full-screen sin romper HMR en Vite
- Contenido de ejemplo de la guía Esparce Paz en datos tipados
```

### Reglas de oro

- La primera línea no debe exceder los 72 caracteres.
- En el cuerpo: motivación o contexto cuando importe; viñetas cuando un commit agrupa varios cambios y conviene leerlos por separado.

---

Esta guía es una ayuda para todos: un historial claro nos ahorra tiempo a nosotros y le deja el camino ordenado a quien llegue después. De antemano te agradezco por cuidar los detalles.

att: Milo ☕

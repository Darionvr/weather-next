## 📌 Definición del proyecto

**Aplicación de clima desarrollada con Next.js 16 y React 18.**  
El proyecto integra la **API de Open-Meteo** para la búsqueda de lugares y la **API de pronóstico meteorológico** para obtener datos actuales, horarios y diarios. La arquitectura aprovecha las nuevas características de **Server Components** y el hook `useActionState` para manejar formularios y estados de búsqueda de manera declarativa.

### 🔹 Características técnicas
- **Next.js 16** con soporte para Server Actions y Suspense.  
- **React `useActionState`** para gestionar el estado del formulario de búsqueda y mostrar loaders (`isPending`) de forma automática.  
- **Debounce en el input** para optimizar peticiones a la API y evitar llamadas innecesarias.  
- **Dropdown de resultados** con renderizado condicional y control de visibilidad (`showResults`) para mejorar la experiencia de usuario.  
- **Skeleton loaders** implementados con Suspense para indicar carga de datos en tiempo real.  
- **CSS Grid con áreas definidas** (`title`, `form`, `today`, `daily`, `hourly`) para organizar la interfaz y lograr un diseño responsivo y claro.  
- **Conexión a APIs externas**:
  - Geocoding: búsqueda de lugares por nombre.  
  - Weather: datos de temperatura, humedad, viento y pronósticos horarios/diarios.  

### 🔹 Flujo de uso
1. El usuario ingresa un lugar en la barra de búsqueda.  
2. El formulario dispara la **Server Action** (`searchPlacesAction`) que consulta la API de geocoding.  
3. Los resultados se muestran en un dropdown interactivo.  
4. Al seleccionar un lugar, se consulta la API de clima y se renderizan los datos en las secciones correspondientes.  
5. El dropdown se oculta automáticamente tras la selección y se reactiva en nuevas búsquedas.  


The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

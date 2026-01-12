
# 🏥 Medical Calendar Component - Product Backlog

## 📋 Información del Proyecto

**Nombre del Proyecto**: Medical Calendar Component
**Product Owner**: Usuario
**Scrum Master**: Claude
**Fecha de Inicio**: 10 de Enero, 2026
**Sprint Duration**: 1 semana
**Stack Técnico**: React 19, TypeScript, Tailwind CSS, date-fns, Vite

---

## 🎯 Visión del Producto

Crear un componente de calendario reutilizable de alta calidad para consultorios médicos, inspirado en el diseño y funcionalidad de Fresha, que permita a los doctores gestionar citas de manera eficiente y profesional.

---

## 📊 Definition of Done (DoD)

Para considerar una User Story como "Done", debe cumplir:

-   ✅ Código implementado y funcional
-   ✅ Responsive (móvil, tablet, desktop)
-   ✅ Cumple con estándares de accesibilidad básicos
-   ✅ Sin errores de consola
-   ✅ Componente documentado con PropTypes/TypeScript
-   ✅ Ejemplos de uso incluidos

---

## 🏃 SPRINT 1: MVP - Core Calendar Functionality

**Objetivo**: Crear la estructura base del calendario con funcionalidad esencial de visualización y navegación.

### Epic 1: Estructura y Layout Base

**Story Points Total**: 21

#### US-001: Configuración Inicial del Proyecto

**Story Points**: 2  
**Prioridad**: CRÍTICA  
**Como** desarrollador  
**Quiero** configurar el proyecto con React 19 y dependencias necesarias  
**Para** tener una base sólida de desarrollo

**Criterios de Aceptación**:

-   [x] Proyecto React 19 inicializado
-   [x] Dependencias instaladas (date-fns, Tailwind CSS)
-   [x] Estructura de carpetas organizada
-   [x] Archivo de configuración de Tailwind
-   [x] Variables CSS para temas

**Tareas**:

-   Inicializar proyecto React 19 con Vite
-   Instalar date-fns, tailwindcss
-   Configurar Tailwind CSS
-   Configurar Vite
-   Crear estructura de carpetas (`/components`, `/hooks`, `/utils`, `/types`)
-   Definir variables CSS de tema

---

#### US-002: Componente CalendarHeader (Navegación)

**Story Points**: 3  
**Prioridad**: CRÍTICA  
**Como** usuario  
**Quiero** navegar entre diferentes fechas del calendario  
**Para** ver citas de diferentes días/semanas

**Criterios de Aceptación**:

-   [ ] Botones Anterior/Siguiente funcionales
-   [ ] Selector de fecha con date picker
-   [ ] Mostrar fecha actual seleccionada
-   [ ] Botón "Hoy" para volver rápidamente
-   [ ] Saltos rápidos (+1 semana, +2 semanas, +4 semanas)
-   [ ] Diseño responsive

**Tareas**:

-   Crear componente CalendarHeader
-   Implementar navegación con date-fns
-   Integrar date picker
-   Añadir botones de navegación rápida
-   Estilos con Tailwind

---

#### US-003: Selector de Vista (Día/3 Días/Semana)

**Story Points**: 3  
**Prioridad**: ALTA  
**Como** usuario  
**Quiero** alternar entre vistas de día, 3 días y semana  
**Para** ajustar el calendario a mis necesidades

**Criterios de Aceptación**:

-   [ ] Botones para cambiar entre vistas
-   [ ] Vista Día muestra un solo día
-   [ ] Vista 3 Días muestra 3 columnas
-   [ ] Vista Semana muestra 7 columnas
-   [ ] Estado de vista persiste durante navegación
-   [ ] Indicador visual de vista activa

**Tareas**:

-   Crear componente ViewSelector
-   Implementar lógica de cambio de vista
-   Ajustar grid según vista seleccionada
-   Estilos para estados activo/inactivo

---

#### US-004: Timeline Vertical con Slots de Tiempo

**Story Points**: 5  
**Prioridad**: CRÍTICA  
**Como** usuario  
**Quiero** ver una timeline vertical con slots de tiempo  
**Para** visualizar el día dividido en intervalos

**Criterios de Aceptación**:

-   [ ] Timeline vertical con horas del día (6am - 10pm)
-   [ ] Slots configurables (15, 30, 60 minutos)
-   [ ] Grid visual que divide cada hora
-   [ ] Línea roja indicando tiempo actual
-   [ ] Línea se actualiza en tiempo real
-   [ ] Scroll automático al tiempo actual

**Tareas**:

-   Crear componente TimelineColumn
-   Generar slots de tiempo dinámicamente
-   Implementar grid con CSS Grid
-   Añadir línea de tiempo actual
-   Implementar actualización cada minuto
-   Auto-scroll a hora actual

---

#### US-005: Grid de Calendario Multi-Columna

**Story Points**: 5  
**Prioridad**: CRÍTICA  
**Como** usuario  
**Quiero** ver columnas para cada día seleccionado  
**Para** visualizar citas en múltiples días simultáneamente

**Criterios de Aceptación**:

-   [ ] Columna por cada día en la vista
-   [ ] Header de columna con día y fecha
-   [ ] Grid sincronizado con timeline
-   [ ] Scroll horizontal suave en vistas multi-día
-   [ ] Diseño responsive (colapsar en móvil)

**Tareas**:

-   Crear componente CalendarGrid
-   Implementar columnas dinámicas según vista
-   Headers de columna con formato de fecha
-   CSS Grid para alineación perfecta con timeline
-   Responsive breakpoints

---

#### US-006: Control de Zoom del Calendario

**Story Points**: 3  
**Prioridad**: MEDIA  
**Como** usuario  
**Quiero** ajustar el zoom del calendario  
**Para** ver más citas (small) o más detalles (large)

**Criterios de Aceptación**:

-   [ ] Slider o botones para ajustar zoom
-   [ ] Nivel Small: altura reducida de slots
-   [ ] Nivel Medium: altura estándar
-   [ ] Nivel Large: altura expandida con más detalles
-   [ ] Zoom persiste en la sesión

**Tareas**:

-   Crear componente ZoomControl
-   Implementar slider de zoom
-   Ajustar altura de slots dinámicamente
-   Guardar preferencia en localStorage

---

## 🏃 SPRINT 2: Gestión de Citas

**Objetivo**: Implementar funcionalidad completa para crear, editar, visualizar y eliminar citas.

### Epic 2: CRUD de Citas

**Story Points Total**: 26

#### US-007: Visualización de Citas en el Calendario

**Story Points**: 5  
**Prioridad**: CRÍTICA  
**Como** usuario  
**Quiero** ver las citas programadas en el calendario  
**Para** conocer mi agenda del día

**Criterios de Aceptación**:

-   [ ] Citas se muestran en su hora correspondiente
-   [ ] Altura de tarjeta refleja duración de la cita
-   [ ] Código de color por estado
-   [ ] Borde izquierdo con color por tipo de consulta
-   [ ] Información visible: nombre, hora, tipo
-   [ ] Manejar citas que se sobreponen

**Tareas**:

-   Crear componente AppointmentCard
-   Calcular posición y altura basado en fecha/duración
-   Implementar sistema de colores
-   Manejar overlapping de citas
-   Responsive para móvil

---

#### US-008: Click en Slot Vacío - Crear Cita

**Story Points**: 5  
**Prioridad**: CRÍTICA  
**Como** usuario  
**Quiero** hacer click en un slot vacío  
**Para** crear una nueva cita rápidamente

**Criterios de Aceptación**:

-   [ ] Click en slot abre modal de nueva cita
-   [ ] Hora pre-llenada según slot clickeado
-   [ ] Quick actions activable/desactivable
-   [ ] Feedback visual en hover
-   [ ] Funciona en todas las vistas

**Tareas**:

-   Detectar click en slots vacíos
-   Calcular hora exacta del click
-   Abrir modal con hora pre-llenada
-   Hover effects en slots
-   Configuración de quick actions

---

#### US-009: Modal de Crear/Editar Cita

**Story Points**: 8  
**Prioridad**: CRÍTICA  
**Como** usuario  
**Quiero** un formulario para crear/editar citas  
**Para** ingresar toda la información del paciente

**Criterios de Aceptación**:

-   [ ] Formulario con todos los campos necesarios:
    -   Nombre del paciente
    -   Teléfono
    -   Email
    -   Tipo de consulta
    -   Fecha y hora
    -   Duración
    -   Notas/motivo
    -   Indicador de paciente nuevo
-   [ ] Validación de campos
-   [ ] Guardar con React 19 useActionState
-   [ ] Loading state durante guardado
-   [ ] Mensajes de error claros
-   [ ] Cerrar modal al guardar exitosamente
-   [ ] Modo edición pre-llena datos

**Tareas**:

-   Crear componente AppointmentModal
-   Implementar formulario con validación
-   Usar useActionState para manejo de estado
-   Integrar con API/estado global
-   Animaciones de modal (entrada/salida)
-   Responsive design

---

#### US-010: Click en Cita - Ver Detalles

**Story Points**: 3  
**Prioridad**: ALTA  
**Como** usuario  
**Quiero** hacer click en una cita existente  
**Para** ver todos sus detalles

**Criterios de Aceptación**:

-   [ ] Click abre panel/modal con detalles completos
-   [ ] Mostrar toda la información de la cita
-   [ ] Opciones: Editar, Eliminar, Cambiar estado
-   [ ] Historial de citas del paciente (si aplica)
-   [ ] Diseño limpio y organizado

**Tareas**:

-   Crear componente AppointmentDetails
-   Implementar click handler en AppointmentCard
-   Mostrar información completa
-   Botones de acciones
-   Integrar historial de paciente

---

#### US-011: Drag & Drop para Reprogramar Citas

**Story Points**: 8  
**Prioridad**: MEDIA  
**Como** usuario  
**Quiero** arrastrar y soltar citas  
**Para** reprogramarlas fácilmente

**Criterios de Aceptación**:

-   [ ] Citas son draggable
-   [ ] Feedback visual durante drag
-   [ ] Drop en nuevo slot actualiza fecha/hora
-   [ ] Validación de horarios (no permitir en pasado)
-   [ ] Confirmación opcional antes de mover
-   [ ] Funciona en vistas día, 3 días y semana
-   [ ] Actualización optimista con useOptimistic

**Tareas**:

-   Implementar drag and drop (nativo o librería)
-   Calcular nueva fecha/hora en drop
-   Validaciones de negocio
-   Actualización optimista
-   Animaciones suaves
-   Manejo de errores

---

#### US-012: Eliminar Cita

**Story Points**: 2  
**Prioridad**: MEDIA  
**Como** usuario  
**Quiero** eliminar una cita  
**Para** liberar el slot cuando se cancela

**Criterios de Aceptación**:

-   [ ] Botón eliminar en detalles de cita
-   [ ] Confirmación antes de eliminar
-   [ ] Actualización inmediata del calendario
-   [ ] Opción de marcar como "cancelada" en vez de eliminar

**Tareas**:

-   Implementar acción de eliminación
-   Modal de confirmación
-   Actualizar estado global
-   Opción cancelar vs eliminar

---

## 🏃 SPRINT 3: Estados y Filtros Avanzados

**Objetivo**: Implementar sistema de estados de citas y filtros avanzados al estilo Fresha.

### Epic 3: Estados de Citas

**Story Points Total**: 18

#### US-013: Cambiar Estado de Cita

**Story Points**: 5  
**Prioridad**: ALTA  
**Como** usuario  
**Quiero** cambiar el estado de una cita  
**Para** reflejar su progreso (confirmada, llegó, en consulta, etc.)

**Criterios de Aceptación**:

-   [ ] Dropdown o botones para cambiar estado
-   [ ] Estados disponibles: Booked, Confirmed, Arrived, Started, Completed, No-show, Cancelled
-   [ ] Color de la tarjeta cambia según estado
-   [ ] Workflow lógico (no saltar estados críticos)
-   [ ] Actualización inmediata en UI

**Tareas**:

-   Crear componente StatusChanger
-   Implementar lógica de estados
-   Actualizar colores dinámicamente
-   Validaciones de workflow
-   Integrar en AppointmentDetails

---

#### US-014: Indicadores Visuales de Estado

**Story Points**: 3  
**Prioridad**: ALTA  
**Como** usuario  
**Quiero** identificar el estado de cada cita visualmente  
**Para** entender mi agenda de un vistazo

**Criterios de Aceptación**:

-   [ ] Cada estado tiene color único
-   [ ] Iconos opcionales por estado
-   [ ] Leyenda de colores visible
-   [ ] Estados críticos destacados (No-show en rojo)
-   [ ] Compatible con modo oscuro

**Tareas**:

-   Definir paleta de colores por estado
-   Crear leyenda de estados
-   Añadir iconos (opcional)
-   Modo oscuro

---

#### US-015: Panel de Filtros Avanzado

**Story Points**: 8  
**Prioridad**: ALTA  
**Como** usuario  
**Quiero** filtrar citas por múltiples criterios  
**Para** encontrar rápidamente lo que busco

**Criterios de Aceptación**:

-   [ ] Panel lateral/dropdown de filtros
-   [ ] Filtros disponibles:
    -   Por estado (múltiple selección)
    -   Por tipo de consulta
    -   Por canal (online/offline)
    -   Por fecha de creación
    -   Por paciente nuevo/recurrente
-   [ ] Filtros se combinan (AND logic)
-   [ ] Contador de citas filtradas
-   [ ] Botón "Limpiar filtros"
-   [ ] Guardar presets de filtros

**Tareas**:

-   Crear componente FilterPanel
-   Implementar cada tipo de filtro
-   Lógica de combinación de filtros
-   Sistema de presets
-   Persistir filtros en sesión

---

#### US-016: Indicador "+X more" para Citas Apiladas

**Story Points**: 3  
**Prioridad**: MEDIA  
**Como** usuario  
**Quiero** ver un indicador cuando hay muchas citas en un slot  
**Para** no saturar la vista

**Criterios de Aceptación**:

-   [ ] Si hay más de 3 citas en mismo horario, mostrar "+X more"
-   [ ] Click expande para ver todas
-   [ ] Funciona en todas las vistas
-   [ ] Diseño limpio y claro

**Tareas**:

-   Detectar overlapping de citas
-   Mostrar primeras N citas
-   Link "+X more" expandible
-   Vista expandida

---

## 🏃 SPRINT 4: Gestión de Tiempo y Disponibilidad

**Objetivo**: Implementar bloqueos de tiempo, horarios laborales y gestión de disponibilidad.

### Epic 4: Disponibilidad y Bloqueos

**Story Points Total**: 21

#### US-017: Bloquear Tiempo en Calendario

**Story Points**: 5  
**Prioridad**: ALTA  
**Como** usuario  
**Quiero** bloquear slots de tiempo  
**Para** marcar descansos, reuniones o tiempo personal

**Criterios de Aceptación**:

-   [ ] Click derecho o botón para bloquear tiempo
-   [ ] Tipos de bloqueo: Almuerzo, Personal, Admin, Emergencia
-   [ ] Duración y título personalizables
-   [ ] Color diferenciado de citas regulares
-   [ ] No permitir agendar citas en tiempo bloqueado

**Tareas**:

-   Crear componente BlockedTime
-   Modal para crear bloqueo
-   Tipos de bloqueo configurables
-   Validación de overlapping
-   Estilos visuales distintos

---

#### US-018: Bloqueos Recurrentes

**Story Points**: 5  
**Prioridad**: MEDIA  
**Como** usuario  
**Quiero** crear bloqueos recurrentes  
**Para** no tener que bloquear manualmente cada día (ej: almuerzo)

**Criterios de Aceptación**:

-   [ ] Opción de recurrencia al crear bloqueo
-   [ ] Patrones: Diario, Semanal, Días específicos
-   [ ] Rango de fechas para recurrencia
-   [ ] Editar/eliminar serie completa o instancia única

**Tareas**:

-   Sistema de recurrencia
-   Generación de instancias
-   Edición de series
-   Almacenamiento eficiente

---

#### US-019: Configurar Horario Laboral

**Story Points**: 5  
**Prioridad**: ALTA  
**Como** usuario  
**Quiero** definir mi horario de trabajo  
**Para** que el calendario solo muestre horas relevantes

**Criterios de Aceptación**:

-   [ ] Configuración de hora inicio/fin por día
-   [ ] Diferentes horarios por día de semana
-   [ ] Área fuera de horario laboral visualmente diferenciada
-   [ ] No permitir citas fuera de horario (opcional)

**Tareas**:

-   Panel de configuración de horarios
-   Aplicar horarios al timeline
-   Estilos para horas no laborables
-   Validaciones

---

#### US-020: Marcar Días No Laborables

**Story Points**: 3  
**Prioridad**: MEDIA  
**Como** usuario  
**Quiero** marcar días completos como no laborables  
**Para** indicar vacaciones o días festivos

**Criterios de Aceptación**:

-   [ ] Opción para marcar día completo como no laborable
-   [ ] Indicador visual en calendario
-   [ ] No permitir agendar en esos días
-   [ ] Lista de días no laborables configurables

**Tareas**:

-   Gestión de días no laborables
-   Indicador visual
-   Validación en creación de citas
-   Calendario de festivos

---

#### US-021: Lista de Espera (Waitlist)

**Story Points**: 8  
**Prioridad**: MEDIA  
**Como** usuario  
**Quiero** gestionar una lista de espera  
**Para** ofrecer slots cuando hay cancelaciones

**Criterios de Aceptación**:

-   [ ] Agregar pacientes a lista de espera
-   [ ] Preferencias de horario del paciente
-   [ ] Notificación cuando se libera slot apropiado
-   [ ] Conversión rápida de waitlist a cita
-   [ ] Vista de lista de espera

**Tareas**:

-   Componente WaitlistManager
-   Sistema de preferencias
-   Matching de slots disponibles
-   Notificaciones
-   Conversión a cita

---

## 🏃 SPRINT 5: Features Especiales para Médicos

**Objetivo**: Implementar características específicas para consultorios médicos.

### Epic 5: Funcionalidad Médica

**Story Points Total**: 24

#### US-022: Tipos de Consulta Configurables

**Story Points**: 3  
**Prioridad**: ALTA  
**Como** usuario  
**Quiero** configurar diferentes tipos de consulta  
**Para** adaptar el calendario a mi práctica médica

**Criterios de Aceptación**:

-   [ ] Panel de configuración de tipos
-   [ ] Definir: nombre, duración, color, precio
-   [ ] Crear, editar, eliminar tipos
-   [ ] Tipos predefinidos: Primera consulta, Seguimiento, Procedimiento, etc.

**Tareas**:

-   Panel de configuración
-   CRUD de tipos de consulta
-   Persistencia de configuración

---

#### US-023: Indicador de Paciente Nuevo vs Recurrente

**Story Points**: 2  
**Prioridad**: MEDIA  
**Como** usuario  
**Quiero** identificar pacientes nuevos  
**Para** prepararme adecuadamente

**Criterios de Aceptación**:

-   [ ] Badge o icono para pacientes nuevos
-   [ ] Diferenciación visual clara
-   [ ] Checkbox en formulario "Paciente nuevo"

**Tareas**:

-   Badge visual
-   Campo en modelo de datos
-   Filtro por tipo de paciente

---

#### US-024: Notas y Motivo de Consulta

**Story Points**: 3  
**Prioridad**: ALTA  
**Como** usuario  
**Quiero** agregar notas a cada cita  
**Para** recordar el motivo de consulta

**Criterios de Aceptación**:

-   [ ] Campo de texto para notas
-   [ ] Visible en detalles de cita
-   [ ] Preview corto en tarjeta (opcional)
-   [ ] Editable después de crear cita

**Tareas**:

-   Campo de notas en formulario
-   Mostrar en AppointmentDetails
-   Tooltip con preview

---

#### US-025: Historial de Citas del Paciente

**Story Points**: 5  
**Prioridad**: MEDIA  
**Como** usuario  
**Quiero** ver el historial de citas de un paciente  
**Para** conocer su historial clínico

**Criterios de Aceptación**:

-   [ ] Al ver detalles de cita, mostrar citas previas del paciente
-   [ ] Timeline de citas pasadas
-   [ ] Información resumida de cada cita
-   [ ] Click para ver detalles completos

**Tareas**:

-   Query de citas por paciente
-   Componente PatientHistory
-   Timeline visual
-   Integración en AppointmentDetails

---

#### US-026: Recordatorios Automáticos

**Story Points**: 8  
**Prioridad**: ALTA  
**Como** usuario  
**Quiero** enviar recordatorios automáticos  
**Para** reducir no-shows

**Criterios de Aceptación**:

-   [ ] Configurar recordatorios (24h, 1h antes)
-   [ ] Canales: Email, SMS, WhatsApp
-   [ ] Plantillas de mensaje configurables
-   [ ] Log de recordatorios enviados
-   [ ] Confirmación de asistencia del paciente

**Tareas**:

-   Sistema de recordatorios
-   Integración con servicios de email/SMS
-   Plantillas configurables
-   Log y tracking

---

#### US-027: Multi-Doctor (Columnas por Profesional)

**Story Points**: 8  
**Prioridad**: MEDIA  
**Como** administrador de clínica  
**Quiero** ver calendarios de múltiples doctores  
**Para** gestionar la agenda de todo el consultorio

**Criterios de Aceptación**:

-   [ ] Selector de doctores
-   [ ] Vista multi-columna (un doctor por columna)
-   [ ] Filtrar por doctor específico
-   [ ] Asignar citas a doctores
-   [ ] Colores diferenciados por doctor

**Tareas**:

-   Selector de doctores
-   Grid multi-doctor
-   Asignación de citas
-   Sistema de colores por doctor

---

## 🏃 SPRINT 6: UX/UI Polish y Responsiveness

**Objetivo**: Refinar la experiencia de usuario y asegurar funcionalidad en todos los dispositivos.

### Epic 6: Polish y Responsive

**Story Points Total**: 21

#### US-028: Diseño Responsive para Móvil

**Story Points**: 8  
**Prioridad**: CRÍTICA  
**Como** usuario móvil  
**Quiero** usar el calendario en mi teléfono  
**Para** gestionar citas desde cualquier lugar

**Criterios de Aceptación**:

-   [ ] Vista móvil optimizada (< 768px)
-   [ ] Una columna en móvil
-   [ ] Navegación touch-friendly
-   [ ] Modales de pantalla completa
-   [ ] Gestos swipe para navegar días
-   [ ] Botones de acción accesibles

**Tareas**:

-   Media queries para móvil
-   Layout de una columna
-   Touch gestures
-   Ajustar componentes
-   Testing en dispositivos reales

---

#### US-029: Animaciones y Micro-interacciones

**Story Points**: 5  
**Prioridad**: MEDIA  
**Como** usuario  
**Quiero** una interfaz fluida y agradable  
**Para** disfrutar usar el calendario

**Criterios de Aceptación**:

-   [ ] Transiciones suaves entre vistas
-   [ ] Animación al crear/editar citas
-   [ ] Hover effects en elementos interactivos
-   [ ] Loading states animados
-   [ ] Page transitions

**Tareas**:

-   CSS transitions
-   Framer Motion (opcional)
-   Loading spinners
-   Hover states
-   Performance optimization

---

#### US-030: Temas Claro y Oscuro

**Story Points**: 5  
**Prioridad**: MEDIA  
**Como** usuario  
**Quiero** cambiar entre tema claro y oscuro  
**Para** reducir fatiga visual

**Criterios de Aceptación**:

-   [ ] Toggle de tema
-   [ ] Tema claro completo
-   [ ] Tema oscuro completo
-   [ ] Persistir preferencia
-   [ ] Transición suave entre temas

**Tareas**:

-   Sistema de temas con CSS variables
-   Toggle component
-   Estilos para ambos temas
-   localStorage para persistir

---

#### US-031: Accesibilidad (A11y)

**Story Points**: 5  
**Prioridad**: ALTA  
**Como** usuario con discapacidad  
**Quiero** poder usar el calendario  
**Para** gestionar mis citas de forma independiente

**Criterios de Aceptación**:

-   [ ] Navegación por teclado completa
-   [ ] ARIA labels en todos los elementos
-   [ ] Contraste de colores suficiente (WCAG AA)
-   [ ] Screen reader compatible
-   [ ] Focus visible en elementos interactivos

**Tareas**:

-   Implementar keyboard navigation
-   ARIA attributes
-   Audit de contraste
-   Testing con screen readers
-   Focus management

---

#### US-032: Atajos de Teclado

**Story Points**: 3  
**Prioridad**: BAJA  
**Como** usuario avanzado  
**Quiero** usar atajos de teclado  
**Para** ser más eficiente

**Criterios de Aceptación**:

-   [ ] Atajos documentados
-   [ ] Ejemplos: N (nueva cita), T (hoy), ← → (navegar)
-   [ ] Modal de ayuda con atajos (?)
-   [ ] Configurable

**Tareas**:

-   Sistema de atajos
-   Modal de ayuda
-   Documentación

---

## 🏃 SPRINT 7: Integración y Exportación

**Objetivo**: Implementar integraciones externas y opciones de exportación.

### Epic 7: Integraciones

**Story Points Total**: 18

#### US-033: Sincronización con Google Calendar

**Story Points**: 8  
**Prioridad**: MEDIA  
**Como** usuario  
**Quiero** sincronizar con Google Calendar  
**Para** tener mis citas en mi calendario personal

**Criterios de Aceptación**:

-   [ ] Exportar citas a Google Calendar
-   [ ] Sincronización bidireccional (opcional)
-   [ ] Solo exportar bloques de tiempo (sin datos sensibles)
-   [ ] Configuración de sincronización

**Tareas**:

-   Google Calendar API integration
-   OAuth flow
-   Exportación de eventos
-   Manejo de privacidad

---

#### US-034: Exportar Calendario (iCal/CSV)

**Story Points**: 5  
**Prioridad**: BAJA  
**Como** usuario  
**Quiero** exportar mi calendario  
**Para** respaldarlo o importarlo en otro sistema

**Criterios de Aceptación**:

-   [ ] Exportar a formato iCal (.ics)
-   [ ] Exportar a CSV
-   [ ] Rango de fechas seleccionable
-   [ ] Opción de incluir/excluir datos sensibles

**Tareas**:

-   Generación de archivos iCal
-   Generación de CSV
-   Download functionality
-   Configuración de privacidad

---

#### US-035: Impresión de Agenda

**Story Points**: 3  
**Prioridad**: BAJA  
**Como** usuario  
**Quiero** imprimir mi agenda  
**Para** tener una copia física

**Criterios de Aceptación**:

-   [ ] Vista de impresión optimizada
-   [ ] Rango de fechas seleccionable
-   [ ] Layout limpio para papel
-   [ ] CSS print-friendly

**Tareas**:

-   Print stylesheet
-   Vista de impresión
-   Botón de imprimir

---

#### US-036: API Pública del Componente

**Story Points**: 5  
**Prioridad**: ALTA  
**Como** desarrollador  
**Quiero** una API clara y bien documentada  
**Para** integrar el componente fácilmente

**Criterios de Aceptación**:

-   [ ] Props bien definidos con TypeScript
-   [ ] Callbacks para eventos principales
-   [ ] Documentación completa
-   [ ] Ejemplos de uso
-   [ ] README detallado

**Tareas**:

-   Definir interfaces TypeScript
-   Documentar props y callbacks
-   Crear ejemplos
-   README con guía de uso

---

## 🏃 SPRINT 8: Testing y Optimización

**Objetivo**: Asegurar calidad, performance y preparar para producción.

### Epic 8: Calidad y Performance

**Story Points Total**: 21

#### US-037: Tests Unitarios

**Story Points**: 8  
**Prioridad**: ALTA  
**Como** desarrollador  
**Quiero** tests unitarios  
**Para** asegurar que el código funciona correctamente

**Criterios de Aceptación**:

-   [ ] Tests para utilidades (date helpers)
-   [ ] Tests para hooks personalizados
-   [ ] Cobertura mínima 70%
-   [ ] Tests pasan en CI/CD

**Tareas**:

-   Configurar Jest/Vitest
-   Tests de utilidades
-   Tests de hooks
-   CI/CD setup

---

#### US-038: Tests de Integración

**Story Points**: 5  
**Prioridad**: MEDIA  
**Como** desarrollador  
**Quiero** tests de integración  
**Para** asegurar que los componentes trabajan juntos

**Criterios de Aceptación**:

-   [ ] Tests con React Testing Library
-   [ ] Flows principales: crear cita, editar, eliminar
-   [ ] Tests de navegación
-   [ ] Tests de filtros

**Tareas**:

-   Setup React Testing Library
-   Tests de flows principales
-   Tests de interacciones

---

#### US-039: Optimización de Performance

**Story Points**: 5  
**Prioridad**: ALTA  
**Como** usuario  
**Quiero** un calendario rápido y fluido  
**Para** trabajar eficientemente

**Criterios de Aceptación**:

-   [ ] Render time < 100ms
-   [ ] Scroll suave a 60fps
-   [ ] Memoización de componentes pesados
-   [ ] Lazy loading de modales
-   [ ] Virtualización de listas largas (si aplica)

**Tareas**:

-   React.memo en componentes
-   useMemo/useCallback optimizations
-   Lazy loading
-   Performance profiling
-   Lighthouse audit

---

#### US-040: Bundle Size Optimization

**Story Points**: 3  
**Prioridad**: MEDIA  
**Como** desarrollador  
**Quiero** un bundle optimizado  
**Para** carga rápida de la aplicación

**Criterios de Aceptación**:

-   [ ] Bundle size < 200kb (gzipped)
-   [ ] Code splitting
-   [ ] Tree shaking configurado
-   [ ] Lazy imports

**Tareas**:

-   Análisis de bundle
-   Code splitting
-   Dynamic imports
-   Eliminar dependencias no usadas

---

## 📈 Métricas del Proyecto

### Velocity Tracking

| Sprint | Story Points Planeados | Story Points Completados | Velocity |
| ------ | ---------------------- | ------------------------ | -------- |
| 1      | 21                     | -                        | -        |
| 2      | 26                     | -                        | -        |
| 3      | 18                     | -                        | -        |
| 4      | 21                     | -                        | -        |
| 5      | 24                     | -                        | -        |
| 6      | 21                     | -                        | -        |
| 7      | 18                     | -                        | -        |
| 8      | 21                     | -                        | -        |

**Total Story Points**: 170

---

## 🎯 Roadmap Visual

```
Sprint 1: ████████░░░░░░░░░░░░░░░░░░░░ (Estructura Base)
Sprint 2: ░░░░░░░░████████░░░░░░░░░░░░ (CRUD Citas)
Sprint 3: ░░░░░░░░░░░░░░░░██████░░░░░░ (Estados y Filtros)
Sprint 4: ░░░░░░░░░░░░░░░░░░░░░░██████ (Disponibilidad)
Sprint 5: ████░░░░░░░░░░░░░░░░░░░░░░░░ (Features Médicas)
Sprint 6: ░░░░████░░░░░░░░░░░░░░░░░░░░ (UX/UI Polish)
Sprint 7: ░░░░░░░░████░░░░░░░░░░░░░░░░ (Integraciones)
Sprint 8: ░░░░░░░░░░░░████░░░░░░░░░░░░ (Testing y Opt.)
```

---

## 🐛 Bug Tracking

### Bugs Conocidos

_Se actualizará conforme se descubran_

| ID  | Descripción | Prioridad | Sprint | Estado |
| --- | ----------- | --------- | ------ | ------ |
| -   | -           | -         | -      | -      |

---

## 📝 Notas y Decisiones Técnicas

### Decisiones Arquitectónicas

1. **React 19**: Aprovechamos nuevos hooks (useActionState, useOptimistic)
2. **Vite**: Build tool y dev server (rápido y moderno)
3. **date-fns**: Manejo de fechas (más ligero que moment.js)
4. **Tailwind CSS**: Estilos utility-first para desarrollo rápido
5. **No backend inicialmente**: Estado local, luego integración API

### Riesgos Identificados

1. **Complejidad de drag & drop**: Considerar librería dedicada
2. **Performance con muchas citas**: Virtualización necesaria
3. **Sincronización con calendarios externos**: APIs de terceros pueden ser complejas

---

## 🔄 Proceso de Sprint

### Daily Standup (Simulado)

-   ¿Qué hice ayer?
-   ¿Qué haré hoy?
-   ¿Hay blockers?

### Sprint Review

Al final de cada sprint, demostrar funcionalidad al Product Owner

### Sprint Retrospective

-   ¿Qué salió bien?
-   ¿Qué se puede mejorar?
-   Action items para próximo sprint

---

## 📚 Definiciones

**Story Points**: Estimación de esfuerzo (Fibonacci: 1, 2, 3, 5, 8, 13, 21)

-   1-2: Tarea simple, < 4 horas
-   3-5: Tarea mediana, 4-8 horas
-   8-13: Tarea compleja, 1-2 días
-   21+: Epic, dividir en historias más pequeñas

**Prioridades**:

-   CRÍTICA: Bloquea funcionalidad core
-   ALTA: Necesaria para MVP
-   MEDIA: Importante pero no urgente
-   BAJA: Nice to have

---

**Última actualización**: 10 de Enero, 2026  
**Próxima revisión**: Al inicio de Sprint 1

// src/App.jsx
/**
 * Componente App - Componente principal de la aplicación
 * 
 * Responsabilidades:
 * 1. Mantener el estado del índice actual
 * 2. Implementar la lógica de navegación (prev, next, random)
 * 3. Gestionar el autoplay con useEffect
 * 4. Pausar autoplay al interactuar (mejora UX)
 * 5. Renderizar los componentes hijos
 * 
 * @component
 * @returns {JSX.Element} Aplicación completa
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import testimonios from './data';
import Testimonial from './components/Testimonial';
import Controls from './components/Controls';
import './styles.css';

export default function App() {
  // ========== ESTADO ==========
  // index: índice del testimonio actual
  // setIndex: función para actualizar el índice
  const [index, setIndex] = useState(0);
  
  // ========== REFERENCIAS ==========
  // useRef: mantiene una referencia mutable que NO causa re-renderización
  // Se usa para guardar el ID del intervalo y poder limpiarlo
  const intervalRef = useRef(null);
  
  // ========== CONSTANTES ==========
  const totalTestimonios = testimonios.length;

  // ========== FUNCIONES DE NAVEGACIÓN ==========
  
  /**
   * Avanza al siguiente testimonio
   * Usa el operador módulo (%) para volver al inicio cuando llega al final
   * Ejemplo: si index=7 y total=8 → (7+1) % 8 = 0
   */
  const next = useCallback(() => {
    setIndex(prev => (prev + 1) % totalTestimonios);
  }, [totalTestimonios]);

  /**
   * Retrocede al testimonio anterior
   * Fórmula: (index - 1 + total) % total
   * Garantiza que al estar en índice 0, vaya al último
   */
  const prev = useCallback(() => {
    setIndex(prev => (prev - 1 + totalTestimonios) % totalTestimonios);
  }, [totalTestimonios]);

  /**
   * Selecciona un testimonio aleatorio diferente al actual
   * Si solo hay 1 testimonio, no hace nada
   */
  const random = useCallback(() => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * totalTestimonios);
    } while (newIndex === index && totalTestimonios > 1);
    setIndex(newIndex);
  }, [index, totalTestimonios]);

  /**
   * Pausa el autoplay temporalmente al interactuar
   * Mejora la experiencia de usuario y accesibilidad
   * 
   * @param {Function} actionFn - Función de navegación a ejecutar
   */
  const handleUserAction = useCallback((actionFn) => {
    // 1. Limpiar intervalo actual (pausar autoplay)
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // 2. Ejecutar la acción solicitada (prev/next/random)
    actionFn();
    
    // 3. Reiniciar autoplay después de 10 segundos de inactividad
    intervalRef.current = setInterval(() => {
      setIndex(prev => (prev + 1) % totalTestimonios);
    }, 5000);
  }, [totalTestimonios]);

  // ========== EFECTO DE AUTOPLAY ==========
  /**
   * useEffect con setInterval para rotación automática cada 5 segundos
   * 
   * ¿Cómo opera el Hook useEffect?
   * 
   * useEffect es un Hook que ejecuta código durante el ciclo de vida del componente:
   * 
   * 1. Montaje: después de que el componente se renderiza por primera vez
   * 2. Actualización: cuando las dependencias especificadas cambian
   * 3. Desmontaje: antes de que el componente se elimine (limpieza)
   * 
   * Sintaxis: useEffect(callback, [dependencias])
   * - callback: función a ejecutar
   * - dependencias: array de variables que al cambiar, re-ejecutan el efecto
   * 
   * Utilidad en este caso:
   * - Iniciar el intervalo al cargar la aplicación
   * - Limpiar el intervalo al desmontar (evita memory leaks)
   * - Reiniciar el intervalo si cambia el número total de testimonios
   */
  useEffect(() => {
    // Iniciar intervalo: cambia de testimonio cada 5 segundos
    intervalRef.current = setInterval(() => {
      setIndex(prev => (prev + 1) % totalTestimonios);
    }, 5000);
    
    // Función de limpieza: se ejecuta al desmontar el componente
    // o antes de re-ejecutar el efecto si las dependencias cambian
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [totalTestimonios]); // Dependencia: se re-ejecuta si totalTestimonios cambia

  // ========== RENDERIZADO ==========
  return (
    <main className="app">
      <h1>✨ Testimonios de nuestros clientes</h1>
      
      <div className="card-wrapper">
        <Testimonial item={testimonios[index]} />
      </div>

      {/* Pasar las funciones envueltas en handleUserAction para pausar autoplay */}
      <Controls 
        onPrev={() => handleUserAction(prev)}
        onNext={() => handleUserAction(next)}
        onRandom={() => handleUserAction(random)}
      />
      
      {/* Indicador de progreso: testimonio actual / total */}
      <p className="counter">
        {index + 1} / {totalTestimonios}
      </p>
    </main>
  );
}

/**
 * ========== EXPLICACIÓN DETALLADA DEL HOOK USERENDER ==========
 * 
 * ¿Qué es useEffect?
 * -----------------
 * useEffect es un Hook de React que permite ejecutar efectos secundarios
 * en componentes funcionales. Los efectos secundarios incluyen:
 * - Temporizadores (setInterval, setTimeout)
 * - Peticiones a APIs (fetch, axios)
 * - Manipulación directa del DOM
 * - Suscripciones a eventos
 * 
 * ¿Cómo opera?
 * ------------
 * useEffect opera en 4 fases del ciclo de vida del componente:
 * 
 * 1. Montaje (Mounting):
 *    - El componente se crea y se inserta en el DOM
 *    - useEffect ejecuta la función callback
 *    - En nuestro caso: inicia setInterval
 * 
 * 2. Actualización (Updating):
 *    - El componente se re-renderiza porque cambió el estado o props
 *    - useEffect compara las dependencias (array)
 *    - Si las dependencias cambiaron, ejecuta la función de limpieza
 *    - Luego ejecuta el callback nuevamente
 * 
 * 3. Desmontaje (Unmounting):
 *    - El componente se elimina del DOM
 *    - useEffect ejecuta la función de limpieza (return)
 *    - En nuestro caso: clearInterval (evita memory leaks)
 * 
 * 4. Limpieza (Cleanup):
 *    - Se ejecuta antes de cada nuevo efecto
 *    - También al desmontar
 * 
 * 
 * Utilidad en este caso:
 * ----------------------
 * 1. Iniciar rotación automática de testimonios
 * 2. Sincronizar el intervalo con el ciclo de vida del componente
 * 3. Limpiar recursos al salir (buena práctica)
 * 4. Reaccionar a cambios (ej: si la lista de testimonios cambia)
 * 
 * 
 * ¿Qué pasa si no limpiamos el intervalo?
 * ----------------------------------------
 * - El intervalo seguiría ejecutándose en segundo plano
 * - Causaría memory leaks (memoria ocupada innecesariamente)
 * - Podría causar errores al intentar actualizar un componente desmontado
 * - Mala práctica de programación
 */
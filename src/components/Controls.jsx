// src/components/Controls.jsx
/**
 * Componente Controls - Botones de navegación
 * 
 * Este componente renderiza los tres botones de control:
 * - Anterior: navega al testimonio previo
 * - Siguiente: navega al siguiente testimonio
 * - Aleatorio: selecciona un testimonio aleatorio
 * 
 * Utiliza el patrón "Lifting State Up" - las funciones se ejecutan en el padre
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onPrev - Función para ir al testimonio anterior
 * @param {Function} props.onNext - Función para ir al siguiente testimonio
 * @param {Function} props.onRandom - Función para ir a un testimonio aleatorio
 * @returns {JSX.Element} Contenedor con los botones de control
 */

import React from 'react';

export default function Controls({ onPrev, onNext, onRandom }) {
  return (
    <div className="controls">
      {/* Botón Anterior */}
      <button 
        onClick={onPrev} 
        aria-label="Testimonio anterior"
        title="Testimonio anterior"
        className="control-btn prev"
      >
        ◀ Anterior
      </button>

      {/* Botón Siguiente */}
      <button 
        onClick={onNext} 
        aria-label="Testimonio siguiente"
        title="Testimonio siguiente"
        className="control-btn next"
      >
        Siguiente ▶
      </button>

      {/* Botón Aleatorio */}
      <button 
        onClick={onRandom} 
        aria-label="Testimonio aleatorio"
        title="Seleccionar testimonio aleatorio"
        className="control-btn random"
      >
        🎲 Aleatorio
      </button>
    </div>
  );
}

/**
 * ¿Qué es "Lifting State Up"?
 * 
 * Es un patrón en React donde el estado se mantiene en un componente padre
 * y se pasan funciones a los hijos para modificar ese estado.
 * 
 * En este caso:
 * - App.jsx mantiene el estado (index)
 * - App.jsx define las funciones (next, prev, random)
 * - Controls recibe estas funciones como props y las ejecuta cuando el usuario hace clic
 * 
 * Ventajas:
 * - Estado centralizado
 * - Componentes hijos más simples (solo renderizan)
 * - Fácil de depurar
 * 
 * ¿Para qué sirve aria-label?
 * - Mejora la accesibilidad para lectores de pantalla
 * - Ayuda a usuarios con discapacidad visual
 * - Requisito obligatorio en los criterios de aceptación
 */
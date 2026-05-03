// src/components/Testimonial.jsx
/**
 * Componente Testimonial - Muestra un testimonio individual
 * 
 * Este componente es puramente presentacional (presentational component).
 * Su única responsabilidad es recibir datos y renderizarlos visualmente.
 * No contiene lógica de negocio ni manejo de estado.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.item - Objeto con los datos del testimonio
 * @param {string} props.item.nombre - Nombre de la persona
 * @param {string} props.item.cargo - Cargo o puesto
 * @param {string} props.item.texto - Texto del testimonio
 * @param {string} props.item.foto - URL de la foto de perfil
 * @returns {JSX.Element} Tarjeta de testimonio renderizada
 */

import React from 'react';

export default function Testimonial({ item }) {
  // Desestructuración del objeto item para acceder directamente a sus propiedades
  // Esto mejora la legibilidad del código evitando escribir "item."
  const { nombre, cargo, texto, foto } = item;

  return (
    // article: elemento semántico para contenido independiente
    // Es ideal para reseñas, comentarios o testimonios
    <article className="testimonial-card">
      
      {/* Imagen de perfil */}
      {/* src: URL de la foto, alt: texto alternativo para accesibilidad */}
      <img 
        src={foto} 
        alt={`Foto de ${nombre}`} 
        className="testimonial-photo" 
      />
      
      {/* Nombre de la persona - nivel h3 por jerarquía (h1 en App) */}
      <h3 className="testimonial-name">{nombre}</h3>
      
      {/* Cargo - con clase para estilizar (color tenue, tamaño pequeño) */}
      <p className="testimonial-role">{cargo}</p>
      
      {/* Texto del testimonio - entre comillas para estilo de cita */}
      <p className="testimonial-text">"{texto}"</p>
    
    </article>
  );
}

/**
 * ¿Por qué article?
 * - Semánticamente correcto para contenido independiente
 * - Mejor accesibilidad para lectores de pantalla
 * - Posicionamiento SEO mejora
 * 
 * ¿Por qué desestructuración?
 * - Evita repetir item.nombre, item.cargo, etc.
 * - Código más limpio y legible
 * - Facilita el mantenimiento
 * 
 * ¿Por qué separar este componente?
 * - Reutilizable en diferentes contextos
 * - Facilita pruebas unitarias
 * - Principio de Responsabilidad Única (SRP)
 */
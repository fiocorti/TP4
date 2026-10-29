import React, { useState } from 'react';
import './tp4.css'; // Importamos la misma hoja de estilos

export default function BlobRPG() {
  // 1. Reemplazamos las variables globales por estados de React
  const [archivoBlob, setArchivoBlob] = useState(null);
  const [mensaje, setMensaje] = useState(null); // Guardará elementos JSX

  // Lógica para crear el Blob
  const handleCrear = () => {
    const contenido = ["Texto generado mediante un Blob para el Trabajo Práctico 4."];
    const nuevoBlob = new Blob(contenido, { type: "text/plain" });
    
    setArchivoBlob(nuevoBlob); // Guardamos el Blob en el estado
    
    // En React no usamos innerHTML, pasamos directamente etiquetas JSX
    setMensaje(
      <>
        <strong>🌿 Texto listo:</strong> Se ha invocado el Blob.
      </>
    );
  };

  // Lógica para descargar
  const handleDescargar = () => {
    if (!archivoBlob) {
      alert("¡Cuidado! Primero debes crear el Blob de texto.");
      return;
    }

    const url = URL.createObjectURL(archivoBlob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = "pergamino_caelia.txt";
    
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);

    setMensaje(
      <>
        <strong>🎒 Inventario actualizado:</strong> El Blob ha sido guardado en tu disco local.
      </>
    );
  };

  // Lógica para usar Slice
  const handleSlice = () => {
    if (!archivoBlob) {
      alert("¡Cuidado! Primero debes crear el Blob para poder cortarlo.");
      return;
    }

    const blobFragmento = archivoBlob.slice(0, 14, "text/plain");
    const lector = new FileReader();
    
    lector.onload = (evento) => {
      const textoExtraido = evento.target.result;
      setMensaje(
        <>
          <strong>Descarga realizada (0-14 bytes):</strong> El mensaje es
          <br /><br />
          <em>"{textoExtraido}"</em>
        </>
      );
    };
    
    lector.readAsText(blobFragmento);
  };

  return (
    <div className="contenedor">
      <h1>Ejemplo de uso de Blobs</h1>
      
      <div className="botones-container">
        {/* Enlazamos las funciones a los eventos onClick */}
        <button onClick={handleCrear}>Crear Blob de texto</button>
        <button onClick={handleDescargar}>Descargar Blob</button>
        <button onClick={handleSlice}>Usar Slice</button>
      </div>
      
      {/* Renderizado condicional: la tarjeta solo aparece si "mensaje" tiene contenido */}
      {mensaje && (
        <p id="mensaje-salida" style={{ display: 'block' }}>
          {mensaje}
        </p>
      )}
    </div>
  );
}
// Guardar objeto en el session storage
export function saveObjInSessionStoraje(key, objet) {
  // Convertir el objeto a una cadena JSON
  var objetoJSON = JSON.stringify(objet);

  // Guardar el objeto en el session storage
  sessionStorage.setItem(key, objetoJSON);
}

// Obtener objeto del session storage
export function getObjInSessionStoraje(key) {
  // Obtener la cadena JSON del session storage
  var objetoJSON = sessionStorage.getItem(key);

  // Convertir la cadena JSON a un objeto JavaScript
  var objet = JSON.parse(objetoJSON);

  // Devolver el objeto
  return objet;
}

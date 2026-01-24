# Notas del vibe codder

## Operator-Template

La mayoría del contendio de las secciones, divisiones y tablas de este doc tienen un contendio destinado a modificarce mediante el archivo .js.

Tener en cuenta que este doc debe llamar a los dos .css contemplados para este proyecto además de a logicTemplate.js, por lo que se debe tener cuidado con el manejo de las rutas relativas a este en caso de que se quiera manejar la estructura del proyecto mediante carpetas.

La plantilla tendrá diferentes contenidos de acuerdo a un parámetro indicado en la sección *<script> </script>* del html, el nombre del parametro es ***OPERADOR_FORZADO***, y de acuerdo al valor de este se cargará el contenido del html, la tarea del siguiente miembro será la de poder setear dicho parametro desde el index cada vez que se habra una subpágina para evitar repetir código inecesariamente además de complementar el contenido presente dentro del doc.

## Logic-template

Este es el archivo .js encargado de la lógica de interactividad y dinamismo del página html, una de las partes más importantes a tener en cuenta es la definicíon de las operaciones lógicas en forma de clases dentro de una lista global al inicio del archivo (checar contenido de la página ahí por favor),
mientras que las función *configurarPagina(elementos, operadorId)* contiene el resto de customizables de interés para la página.

### Para el siguiente miembro del equipo

- TAREA PRINCIPAL: Eliminar la repetición de código modificando index.html para que:

Cada enlace (conjuncion.html, disyuncion.html, etc.) pase el parámetro automáticamente
O crear un sistema de una sola plantilla con parámetros en la URL

#### Si es que hay problemas....

- Revisar consola del navegador (F12 → Console)

- Verificar rutas (todos los archivos en misma carpeta)

- Probar en Live Server primero, luego en GitHub Pages

- Verificar que OPERADOR_FORZADO no tenga tildes ('conjuncion' NO 'conjunción' por ejemplo).


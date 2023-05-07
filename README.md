# <img src="/src/img/tennis_ball_icon.png" width="50"> Frontend APP Top Tenis Valencia  

<details>
  <summary>Contenido 📝</summary>
  <ol>
    <li><a href="#objetivo-🎯">Objetivo</a></li>
    <li><a href="#sobre-el-proyecto-🔎">Sobre el proyecto</a></li>
    <li><a href="#deploy-🚀">Deploy</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#instalación-en-local">Instalación</a></li>
    <li><a href="#agiles">Metodologías ágiles</a></li>
    <li><a href="#vistas">Vistas</a></li>
    <li><a href="#futuras-funcionalidades">Futuras funcionalidades</a></li>
    <li><a href="#contribuciones">Contribuciones</a></li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#webgrafia">Webgrafia</a></li>
    <li><a href="#errores">Errores conocidos</a></li>
    <li><a href="#agradecimientos">Agradecimientos</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>

## Objetivo 🎯
Este proyecto requería conexión a una API funcional ya realizada en mi proyecto anterior en laravel, usar react con react-router-dom para el enrutado de la aplicación, hooks useState y useEffect para el control del estado de los componentes, redux con persist para el almacenamiento de algunos valores en un estado general de la aplicación, JavaScript ES6 con uso de funcionalidad asincrona async/await, y estilos CSS y bootstrap.

## Sobre el proyecto 🔎
La idea principal era crear una aplicación web de gestión de torneos de tenis para jugadores aficionados de una provincia, donde cada participante juega un partido semanal contra un rival asignado en modo liga todos contra todos.
Aunque la app también podría aplicarse para polideportivos municipales, o clubes de tenis donde se realizan torneos internos para sus socios. 
Las principales caracteristicas de esta aplicación son:
- Usuario administrador, se encargará de crear los torneos y realizar los emparejamientos de los jugadores.
También podrá realizar otras funciones como visualizar la información de todos los usuarios registrados en la aplicación, eliminar partidos y torneos.
- Usuario participante, mediante su registro a la aplicación y posterior login, podrá inscribirse a los torneos disponibles, ver el calendario de partidos asignados, añadir el resultado de sus partidos, ver los resultados y clasificación del torneo.
- Usuario sin registro, podrá entrar a home donde se explica el funcionamiento de la aplicación, listar los torneos de la aplicación y por supuesto realizar el registro para conseguir el acceso a un usuario participante.
  
## Deploy 🚀
<div align="center">
    <a href="https://frontend-react-top-tenis-valencia.vercel.app"><strong>Url a producción </strong></a>🚀🚀🚀
</div>

## Stack
<div align="center">
<a href="https://www.reactjs.com/">
    <img src= "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/javascipt-EFD81D?style=for-the-badge&logo=javascript&logoColor=black"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/HTML">
    <img src= "https://img.shields.io/badge/HTML5-FF6C37?style=for-the-badge&logo=HTML5&logoColor=white"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/CSS">
    <img src= "https://img.shields.io/badge/css-1D7CF2?style=for-the-badge&logo=css3&logoColor=white"/>
</a>
<a href="https://www.github.com/">
    <img src= "https://img.shields.io/badge/github-24292F?style=for-the-badge&logo=github&logoColor=white"/>
</a>
<a href="https://nodejs.org/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://jwt.io/">
    <img src= "https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"/>
</a>


 </div>

## Instalación en local
1. Clonar el repositorio
2. ` $ npm install `
3. ``` $ npm run dev ```

## Metodologias ágiles
<div align="center">
    <img src="./src/img/Screenshot_Trello.jpg">
</div>

## Vistas
Home
<img src="./src/img/Home.jpg">  
Register
<img src="./src/img/register.jpg">
Login
<img src="./src/img/login.jpg">
Profile
<img src="./src/img/profile.jpg">
Listado Torneos
<img src="./src/img/listado_torneos.jpg">
Menú Torneos
<img src="./src/img/menu_torneos.jpg">
Emparejamientos
<img src="./src/img/emparejamientos.jpg">
Partidos
<img src="./src/img/Partidos.jpg">
Actualizar resultado
<img src="./src/img/actualizar_resultado.jpg">
Resultados partidos finalizados
<img src="./src/img/resultados_partidos_finalizados.jpg">
Clasificación
<img src="./src/img/clasificacion.jpg">


## Futuras funcionalidades  
⬜ Generar emparejamientos automáticamente  
⬜ Modificar datos de perfil del usuario

## Contribuciones
Las sugerencias y aportaciones son siempre bienvenidas.  

Puedes hacerlo de dos maneras:

1. Abriendo una issue
2. Crea un fork del repositorio
    - Crea una nueva rama  
        ```
        $ git checkout -b feature/nombreUsuario-mejora
        ```
    - Haz un commit con tus cambios 
        ```
        $ git commit -m 'feat: mejora X cosa'
        ```
    - Haz push a la rama 
        ```
        $ git push origin feature/nombreUsuario-mejora
        ```
    - Abre una solicitud de Pull Request

## Licencia
Este proyecto se encuentra bajo licencia MIT

## Webgrafia:
Para conseguir mi objetivo he recopilado información de:
- documentación interna de la formación en GeeksHubs Academy 

## Errores conocidos:
- La puntuación de la clasificación, no aumenta correctamente los puntos cuando el ganador es el jugador1
- La puntuación de la clasificación, se descuadra al modificar un resultado de un partido ya guardado anteriormente 
  
## Agradecimientos:

Agradezco a mis formadores el tiempo dedicado a orientarme en este proyecto:

- **David Ochando**  
<a href="https://www.linkedin.com/in/david-ochando-blasco-90b2ba1a/"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>

- **Dani Tarazona**  
<a href="https://www.linkedin.com/in/daniel-tarazona-tamarit-05634794/"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a> 

## Contacto

Rubén Golfe Silvestre

<img src="./src/img/imagen_perfil_gris.jpg" width="150">

<a href = "mailto:rgolfe81@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/ruben-golfe/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 

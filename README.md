# README
 
Requisitos para poder correr la aplicación:

* node.js
 
para ejecutar el proyecto se utiliza la sentencia <code> rails server </code>, en el directorio raíz.
 
- Dockerización:
  - Proyecto:
    - <code>docker build -t siam_interface .</code>
    - <code>docker run --name siam_interface -p 3000:3000 -d siam_interface</code>

- Cambio de IP para el consumo:
  - ingresar al bash del contenedor
   - <code>sudo docker exec -it <ID_contenedor> bash</code>
  - ejecutar <code>node ip.js</code> e ingresar la nueva ip

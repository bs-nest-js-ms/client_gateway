<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Gateway Este actua como recepcionista entre el frontend web o movil que hace request y los microservicios, este se comunica con los microservicios

- Instalaciones necesarias para este gateway: OJO el Client Gateway es __Rest Api__ los demas son __Microservicios__
- necesitamos instalar el npm i --save @nestjs/microservices para poder comunicarnos con los servicios
-```npm i dotenv joi npm i --save @nestjs/microservices```
-```npm i --save nats```

but first start nats: ```docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats``` and then ```npm run start:dev```
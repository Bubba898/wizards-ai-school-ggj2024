import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { dirname } from 'node:path';

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import fastifyAutoload from "@fastify/autoload";
import {join} from "node:path";

const app = fastify();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'AI',
      description: 'AI',
      version: 'AI need no version',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
});


app.register(fastifyAutoload, {
  dir: join(dirname(__filename), 'routes'),
  dirNameRoutePrefix: false,
})
async function run() {
  await app.ready();

  await app.listen({
    port: 8000,
  });
  console.log("DIr", dirname(__filename))
  console.log(`Documentation running at http://localhost:8000/docs`);
}

run();

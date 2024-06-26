import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { dirname } from 'node:path';

import * as readline from 'readline';

import dotenv from 'dotenv';

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

dotenv.config();
console.log("Starting...")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

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
  console.log("Starting server")
  await app.ready();

  await app.listen({
    host: "0.0.0.0",
    port: +(process.env.PORT || 8080),
  })
  console.log(`Documentation running at https://${process.env.WEBSITE_HOSTNAME}:${process.env.PORT}/docs`);
}

run()

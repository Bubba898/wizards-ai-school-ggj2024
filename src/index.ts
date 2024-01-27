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

  process.env.IP ? await app.listen({
    host: process.env.URL,
    port: +(process.env.PORT || 8080),
  }) : await app.listen({port: +(process.env.PORT || 8080)})
  console.log("DIr", dirname(__filename))
  console.log(`Documentation running at http://${process.env.URL}:${process.env.PORT}/docs`);
}

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is not set, please enter one")
  rl.question("OPENAI_API_KEY: ", (answer) => {
    process.env.OPENAI_API_KEY = answer
    run()
  })
} else {
  console.log("OPEN_API_KEY is set")
  run()
}

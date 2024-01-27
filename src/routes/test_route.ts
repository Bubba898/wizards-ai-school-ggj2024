import {ZodTypeProvider} from "fastify-type-provider-zod";
import {FastifyInstance} from "fastify";
import {TestParam, TestResponse} from "../schemas/test_schema";


export default async function (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/ping/:ping",
    {
      schema: {
        params: TestParam,
        response: {
          200: TestResponse,
        },
        tags: ["Ping"],
        description: "Returns a Pong"
      }
    },
    async(request) => {
      const { ping } = request.params
      return {pong: ping}
    }
  )
}

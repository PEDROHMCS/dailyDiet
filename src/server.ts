import { fastify } from "fastify";
import { userRoutes } from "./routes/userRouter";


const app = fastify()

app.register(userRoutes, {
  prefix: '/user'
})


app.listen(
  {
    port: 3333
  },() => {
    console.log('listening...')
  }
)
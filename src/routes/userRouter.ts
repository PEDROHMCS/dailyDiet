import { FastifyInstance } from "fastify";
import {z} from 'zod'
import { knex } from "../database";
import {randomUUID} from 'crypto'

export async function userRoutes(app : FastifyInstance) {

  // User setup / get users / create users

  app.get('/', async (req, res) => {
    
    const users = await knex('users').select()
    return {
      users
    }
  })

  app.post('/', async (req, res)=>{
    const {body} = req

    const userBodySchema =  z.object({
      name: z.string()
    })

    const verifiedBody = userBodySchema.parse(body)

    await knex('users').insert(
      {
        userID: randomUUID(),
        username: verifiedBody.name
      }
    )

    return res.status(201).send()
  })


  app.post('/:userID/createSnack', async (req, res) => {

    const params = req.params
    const body = req.body

    const snackBodySchema =  z.object({
      name: z.string(),
      description: z.string(),
      isDiet: z.boolean(),
    })

    const schemaParamsFromRoute = z.object({
      userID: z.string().uuid()
    })

    const verifiedParams = schemaParamsFromRoute.parse(params)
    const {name, description, isDiet} = snackBodySchema.parse(body)
    
    await knex('Snacks').insert({
      Name: name,
      Description: description,
      isDiet: isDiet,
      userID: verifiedParams.userID
    })

    res.status(201).send()
  })

  app.get('/:userID/snacks',async (req, res) => {


    const query = req.query
    const params = req.params;

    const schemaParamsFromRoute = z.object({
      userID: z.string().uuid()
    })

    const schemaQueryFromRoute = z.object({
      foodName: z.string().default('')
    })

    
    const {foodName} = schemaQueryFromRoute.parse(query)
    const verifiedParams = schemaParamsFromRoute.parse(params)


    console.log(foodName)

    if(foodName !== ''){
      const filteredSnacks = await knex('Snacks')
      .where('userID', verifiedParams.userID)
      .andWhereLike('Name', `%${foodName.toLowerCase()}%`)
      .select()

      return res.send({
        filteredSnacks
      })
    }
    
    const Snacks = await knex('Snacks')
    .where('userID', verifiedParams.userID)
    .select()

    return res.send({
      Snacks
    })
  })



}
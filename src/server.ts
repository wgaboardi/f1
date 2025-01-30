import fastify from "fastify"
import cors from "@fastify/cors"
const server = fastify({ logger: true})

server.register(cors, {
  origin: "*",
  methods: ["GET"]
})

const teams = [
  { id:1, name: 'ferrari', base: "Woking, United Kingdom"},
  { id:2, name: 'Mercedes', base: "Brackley, United Kingdom"},
  { id:3, name: 'Red bull Racing', base: "Milton Keynes, United Kingdom"},
  
]

const drivers = [
  { id:1, name: 'Max Verstappen', team: "Red Bull Racing"},
  { id:2, name: 'Pilot 2', team: "Brackley, United Kingdom"},
  { id:3, name: 'Pilot 3', team: "Milton Keynes, United Kingdom"},
  
]

server.get("/teams", async(request,response) => {
  response.type("application/json").code(200)
  return  teams
})

server.get("/drivers", async(request,response) => {
  response.type("application/json").code(200)
  return drivers
})

interface DriverParams {
  id: string
}
server.get<{Params: DriverParams}>("/drivers/:id", async(request,response) => {
  response.type("application/json").code(200)
  const id = parseInt(request.params.id)
  const driver = drivers.find(t=> t.id === id)
  if (!driver) {
    response.type("application/json").code(404)
    return { message: "Driver not found"}
  }
  else {
    response.type("application/json").code(200)
    return { driver } 
  }  
})

server.listen({port: 3333}, ()=> {
  console.log('server init')
})

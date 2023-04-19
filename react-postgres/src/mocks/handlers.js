import { rest } from "msw";

// import axios from "axios";
// jest.mock("axios");

export const usersListApi = 
    rest.get('/users/teams', (req, res, ctx) => {
        console.log('Calling MSW handler /users/teams')
        return res(
            ctx.status(200),
            ctx.json(
                { 
                    "status":1,
                    "data":[
                        {"id":"4","empName":"Sarah","manager":null,"team":[{"id":"1","name":"Citi Bank"}]}, 
                        {"id":"5","empName":"Jill","manager":"Sarah","team":[{"id":"1","name":"Citi Bank"}]}, 
                        {"id":"6","empName":"Adam G","manager":"Sarah","team":[{"id":"1","name":"Citi Bank"}]} 
                    ]
                }
            )
        )
    })

console.log('MSW handler')

export const handlers = [usersListApi]

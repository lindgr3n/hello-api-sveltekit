/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/users', async () => {
  const users = await User.all()
  console.log('YES INSIDE ROUTE', users)

  return { users }
}).middleware('auth')

Route.post('/login', async ({ request, auth }) => {
  console.log('WHY DONT WE END UP HERE')

  const email = request.input('email')
  const password = request.input('password')
  console.log('LOGIN', email, password)

  const user = await auth.use('web').attempt(email, password)
  console.log('USER IN ADONIS', user)

  return { user: User.find(user.id) }
})

Route.post('/register', async ({ request, session, response }) => {
  //
  const email = request.input('email')
  const password = request.input('password')

  // Validation

  const existingUser = await User.findBy('email', email)

  if (existingUser) {
    session.flash({
      errors: {
        email: 'Email already exist',
      },
    })
    return response.redirect().back()
  }

  const user = await User.create({ email, password })
  return { user: user }
})

Route.get('/user/:id', async ({ params }) => {
  return User.find(params.id)
}).middleware('auth')

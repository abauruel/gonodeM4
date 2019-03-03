'use strict'

const Route = use('Route')

Route.post('user', 'UserController.store')
Route.post('session', 'SessionController.store')
Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

Route.post('/files', 'FileController.store')
Route.get('files/:id', 'fileController.show')

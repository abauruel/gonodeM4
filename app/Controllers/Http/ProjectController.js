'use strict'
const Logger = use('Logger')
const Project = use('App/Models/Project')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
  async index ({ request, response, view }) {
    Logger.info(Project.all())
    const projects = await Project.query()
      .with('user')
      .fetch()
    return projects
  }

  async store ({ request, response, auth }) {
    const data = request.only(['title', 'description'])
    const project = await Project.create({ ...data, user_id: auth.user.id })

    return project
  }

  async show ({ params }) {
    const project = await Project.findOrFail(params.id)
    await project.load('user')
    await project.load('tasks')
    return project
  }

  async update ({ params, request }) {
    const project = await Project.findOrFail(params.id)
    const data = request.only(['title', 'description'])

    project.merge(data)
    await project.save()
    return project
  }

  async destroy ({ params, request, response }) {
    const project = await Project.findOrFail(params.id)
    project.delete(project)
  }
}

module.exports = ProjectController

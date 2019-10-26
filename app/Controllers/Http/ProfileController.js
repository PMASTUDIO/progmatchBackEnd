'use strict'

const Profile = use('App/Models/Profile')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with profiles
 */
class ProfileController {
  /**
   * Show a list of all profiles.
   * GET profiles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const profiles = await Profile.all()
    return profiles
  }

  /**
   * Render a form to be used for creating a new profile.
   * GET profiles/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Create/save a new profile.
   * POST profiles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const data = request.only(["title", "image"])
    const profile = await Profile.create({ user_id: auth.user.id, ...data })
    return profile
  }

  /**
   * Display a single profile.
   * GET profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const profile = await Profile.findOrFail(params.id)
    return profile
  }

  /**
   * Render a form to update an existing profile.
   * GET profiles/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Update profile details.
   * PUT or PATCH profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a profile with id.
   * DELETE profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const profile = await Profile.findOrFail(params.id)

    if (profile.user_id != auth.user.id){
      return response.status(401)
    }

    await profile.delete()
  }
}

module.exports = ProfileController

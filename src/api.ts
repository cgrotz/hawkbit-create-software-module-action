import * as core from '@actions/core'
import Axios from 'axios'

function getBasicAuthHeader(): String {
  const tenant = core.getInput('hawkbit-tenant')
  const username = core.getInput('hawkbit-username')
  const password = core.getInput('hawkbit-password')
  const token = Buffer.from(`${tenant}\\${username}:${password}`).toString(
    'base64'
  )
  return `Basic ${token}`
}

export interface SoftwareModuleRequest {
  vendor?: string | undefined
  name: string
  description?: string | undefined
  type: string
  version: string
}

export interface SoftwareModuleSelf {
  href: string
}

export interface SoftwareModuleLinks {
  self: SoftwareModuleSelf
}

export interface SoftwareModule {
  createdBy: string
  createdAt: number
  lastModifiedBy: string
  lastModifiedAt: number
  name: string
  description?: string
  version: string
  type: string
  vendor?: string
  deleted: boolean
  _links: SoftwareModuleLinks
  id: number
}

export async function createSoftwareModule(
  type: string,
  version: string,
  name: string,
  vendor?: string,
  description?: string
): Promise<SoftwareModule | null> {
  const hawkbitHostUrl = core.getInput('hawkbit-host-url')

  const url = `${hawkbitHostUrl}/rest/v1/softwaremodules`

  const module: SoftwareModuleRequest = {
    vendor,
    name,
    description,
    type,
    version
  }
  core.info(`Creating Software Module with name ${name}`)
  const response = await Axios.post(url, [module], {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getBasicAuthHeader()
    }
  })
  return response.data
}

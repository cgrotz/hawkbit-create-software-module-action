import * as core from '@actions/core'
import {createSoftwareModule} from './api'

async function run(): Promise<void> {
  try {
    const type: string = core.getInput('software-module-type')
    const name: string = core.getInput('software-module-name')
    const version: string = core.getInput('software-module-version')
    const vendor: string = core.getInput('software-module-vendor')
    const description: string = core.getInput('software-module-description')

    const softwareModule = await createSoftwareModule(
      type,
      version,
      name,
      vendor,
      description
    )
    core.info(`Created software module ${name}:${version}`)
    core.setOutput('software-module-id', softwareModule!.id.toString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

export default async function triggerPipeline({ project, appSetting }) {
    const response = await fetch('/api/circle/trigger_pipeline', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            host: appSetting.host,
            circleToken: appSetting.circleToken,
            projectSlug: project.projectSlug,
            branch: project.branch,
            parameters: project.parameters,
        }),
    })
    if (!response.ok) {
        throw new Error(response.statusText || await response.text())
    }
    const result = await response.json()
    if (result.error) {
        throw new Error(result.error)
    }
    return result
}

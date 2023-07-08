import Project from './Project.js'
import AppSetting from './AppSetting.js'

const version = '1'
const CIRCLE_SETTING_KEY = 'CircleCI_Emitter_Setting'

function initProjectList(setting) {
    return setting?.projectList.map((it) => new Project(it)) ?? []
}

function initAppSetting(setting) {
    return new AppSetting({
        host: setting?.appSetting?.host,
        circleToken: setting?.appSetting?.circleToken,
    })
}

export function saveStateToLocalStorage(state) {
    localStorage.setItem(CIRCLE_SETTING_KEY, JSON.stringify({
        ...state,
        version,
    }))
}

export function getStateFromLocalStorage() {
    const settingString = localStorage.getItem(CIRCLE_SETTING_KEY)
    if (settingString) {
        const setting = JSON.parse(settingString)
        return setting.version === version ? setting : undefined
    }
}

export function initState(setting) {
    setting = setting ? setting : getStateFromLocalStorage()
    return {
        appSetting: initAppSetting(setting),
        projectList: initProjectList(setting),
    }
}


import { createApp, css, Dialog, LightTip } from '../modules.js'
import { openFileAndReadAsText } from '../common/file.js'

const ClassName = css`
  min-width: 540px;

  .form-row {
    :not(:first-child) {
      margin-top: .5rem;
    }

    display: flex;
    align-items: center;

    label {
      min-width: 90px;
    }

    input {
      flex: 1;
    }
  }

  .red {
    color: #eb4646;
  }
`

export function openAppSettingModal({ appSetting, importSetting, }) {
    const dialog = new Dialog({
        title: 'Setting',
        content: '<div class="modal-content-root"></div>',
        buttons: [
            {
                type: 'warning',
                value: 'Import setting',
                className: 'button-import-setting',
                events: (ev) => {
                    openFileAndReadAsText(async (err, text) => {
                        if (err) {
                            console.error(err)
                            LightTip.error(err.message)
                            return
                        }
                        importSetting(text)
                        dialog.remove()
                    })
                }
            },
            {
                type: 'primary',
                value: 'Save',
                form: 'app-setting-form',
            }]
    })
    dialog.querySelector('.button-import-setting').style.float = 'left'
    //
    const vm = createApp({
        template: `
          <form id="app-setting-form" class="ui-form" :class="ClassName" @submit.prevent="onSubmit">
            <div class="form-row">
              <label for="app-setting-host">Host<span class="red">*</span></label>
              <input :value="appSetting.host" type="text" id="app-setting-host"
                     class="ui-input" name="app-setting-host" required>
            </div>
            <div class="form-row">
              <label for="app-setting-circle-token">Circle Token<span class="red">*</span></label>
              <input :value="appSetting.circleToken" type="password" id="app-setting-circle-token"
                     class="ui-input" name="app-setting-circle-token" required>
            </div>
          </form>
        `,
        setup() {
            function onSubmit(ev) {
                const form = new FormData(ev.target)
                appSetting.host = form.get('app-setting-host')
                appSetting.circleToken = form.get('app-setting-circle-token')
                dialog.remove()
                LightTip.success('App setting saved')
            }

            return {
                ClassName,
                appSetting,
                onSubmit,
            }
        },
    })
    vm.mount(dialog.querySelector('.modal-content-root'))
    return { dialog, vm, }
}
import { createApp, css, Dialog, LightTip } from '../deps.js'
import { triggerPipeline } from '../apis/trigger_pipeline.js'

const DialogClassName = css`
    .button-delete, .button-copy {
        float: left;
    }
`

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

        textarea {
            flex: 1;
            resize: vertical;
        }
    }

    .red {
        color: #eb4646;
    }
`

export function openProjectModal({ project, appSetting, onDelete, onCopy }) {
    const dialog = new Dialog({
        title: project.name,
        content: `<div class="modal-content-root"></div>`,
        buttons: [{
            type: 'error',
            value: 'Delete',
            className: 'button-delete',
            events: (ev) => {
                ev.preventDefault()
                try {
                    if (typeof onDelete === 'function') {
                        onDelete()
                        LightTip.success('Delete succeed')
                    }
                } catch (err) {
                    LightTip.error(err.message || 'Delete failed')
                } finally {
                    dialog.remove()
                }
            }
        }, {
            type: 'normal',
            value: 'Copy',
            className: 'button-copy',
            events: (ev) => {
                ev.preventDefault()
                try {
                    if (typeof onCopy === 'function') {
                        onCopy()
                        LightTip.success('Copy succeed')
                    }
                } catch (err) {
                    LightTip.error(err.message || 'Copy failed')
                } finally {
                    dialog.remove()
                }
            }
        }, {
            type: 'primary',
            value: 'Trigger',
            form: 'project-form',
            className: 'trigger-button',
        }]
    })
    dialog.classList.add(DialogClassName)

    const vm = createApp({
        template: `
          <form id="project-form" class="ui-form" :class="ClassName" @submit.prevent="onSubmit">
            <div class="form-row">
              <label for="project-name">Name<span class="red">*</span></label>
              <input :value="project.name" type="text" id="project-name"
                     class="ui-input" name="project-name" required>
            </div>
            <div class="form-row">
              <label for="project-description">Description<span class="red">*</span></label>
              <input :value="project.description" type="text" id="project-description"
                     class="ui-input" name="project-description" required>
            </div>
            <div class="form-row">
              <label for="project-project-slug">Project slug<span class="red">*</span></label>
              <input :value="project.projectSlug" type="text" id="project-project-slug"
                     class="ui-input" name="project-project-slug" required>
            </div>
            <div class="form-row">
              <label for="project-branch">Branch<span class="red">*</span></label>
              <input :value="project.branch" type="text" id="project-branch"
                     class="ui-input" name="project-branch" required>
            </div>
            <div class="form-row">
              <label for="project-parameters">Parameters<span class="red">*</span></label>
              <textarea :value="project.getParametersJsonString()" id="project-parameters"
                        rows="4"
                        class="ui-textarea" name="project-parameters" required></textarea>
            </div>
          </form>
        `,
        setup() {

            async function onSubmit(ev) {
                const getTriggerButtonClassList = () => dialog.querySelector('.trigger-button').classList
                try {
                    getTriggerButtonClassList().add('loading')
                    const form = new FormData(ev.target)
                    project.name = form.get('project-name')
                    project.description = form.get('project-description')
                    project.projectSlug = form.get('project-project-slug')
                    project.branch = form.get('project-branch')
                    project.setParametersJsonString(form.get('project-parameters').toString())
                    //
                    const triggered = await triggerPipeline({
                        project,
                        appSetting,
                    })
                    project.addNewTriggered(triggered)
                    //
                    dialog.remove()
                    LightTip.success('Trigger succeed')
                } catch (err) {
                    console.error(err)
                    LightTip.error(err.message)
                } finally {
                    getTriggerButtonClassList().remove('loading')
                }
            }

            return {
                ClassName,
                project,
                onSubmit,
            }
        },
    })
    vm.mount(dialog.querySelector('.modal-content-root'))
    return { dialog, vm, }
}
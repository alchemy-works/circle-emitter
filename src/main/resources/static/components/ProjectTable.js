import { css } from '../modules.js'
import Button from './Button.js'
import { openProjectModal } from './ProjectModal.js'

const ClassName = css`
  .th-operate {
    width: 100px;
  }

  .th-title {
    width: 150px;
    text-align: left;
  }

  .td-operate {
    text-align: center;
  }

  .td-empty {
    text-align: center;
  }

  .title {
    color: #4c5161;
    font-weight: bold;
  }

  .description {
    color: #a2a9b6;
  }
`

export default {
    template: `
      <div :class="ClassName">
      <table class="ui-table">
        <thead>
        <tr>
          <th class="th-title">Projects</th>
          <th></th>
          <th class="th-operate"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="!state.projectList.length">
          <td class="td-empty" colspan="3">Empty</td>
        </tr>
        <tr v-else v-for="(it) of state.projectList" :key="it.name">
          <td>
            <div class="title">
              <a :href="it.getPipelineUrl(state.appSetting.host)" target="_blank">{{ it.name }}</a>
            </div>
            <div class="description">{{ it.description }}</div>
          </td>
          <td>
            <div v-if="it.getLatestTriggered()">
              Latest triggered:&nbsp;
              <a :href="it.getLatestWorkflowUrl(state.appSetting.host)" target="_blank">
                Workflow({{ it.getLatestWorkflowCreatedAt() }})
              </a>
            </div>
          </td>
          <td class="td-operate">
            <Button @click="onClickOpenProject(it)">Trigger</Button>
          </td>
        </tr>
        </tbody>
      </table>
      </div>
    `,
    components: { Button },
    props: {
        state: Object,
    },
    setup(props) {
        async function onClickOpenProject(project) {
            openProjectModal({
                project,
                appSetting: props.state.appSetting,
            })
        }

        return {
            ClassName,
            onClickOpenProject,
        }
    },
}
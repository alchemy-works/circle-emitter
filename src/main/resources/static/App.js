import { css, reactive, watch, onMounted } from './modules.js'
import HeadLine from './components/HeadLine.js'
import ProjectTable from './components/ProjectTable.js'
import { initState, saveStateToLocalStorage } from './common/context.js'

const ClassName = css`
  max-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 1rem;

  .project-table {
    margin-top: 1rem;
  }

  a {
    color: var(--ui-blue, #2a80eb);
    text-decoration-line: none;
  }
`

export default {
    template: `
      <div :class="ClassName">
        <HeadLine :state="state"/>
        <ProjectTable class="project-table" :state="state"/>
      </div>
    `,
    components: { HeadLine, ProjectTable },
    setup(props) {
        const state = reactive(initState())

        watch(() => state, (newState) => {
            saveStateToLocalStorage(newState)
        }, {
            deep: true,
        })

        return {
            state,
            ClassName,
        }
    },
}
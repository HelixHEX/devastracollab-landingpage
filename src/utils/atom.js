import axios from 'axios'
import { selector, atom } from "recoil";
import { reorder } from './reorder';
import { baseURL } from './globalVar'
// const user =  window.Clerk.user

export const currentProjectAtom = atom({
  key: 'currentProject',
  default: ''
});

axios.defaults.withCredentials = true
export const fetchProject = selector({
  key: 'fetchProjectSelector',
  get: async ({ get }) => {
    try {
      const uuid = get(currentProjectAtom)
      if (uuid !== '') {
        const response = await axios.post(baseURL + window.Clerk.user.publicMetadata.type + '/project', {
          userId: window.Clerk.user.id,
          projectuuid: uuid
        })
        const data = await response.data
        return data.project
      }
    } catch (error) {
      throw error
    }
  }
})

export const projectAtom = atom({
  key: 'projectAtom',
  default: fetchProject,
  dangerouslyAllowMutability: true
})

//old
//#region 
// export const fetchProjects = selector({
//   key: 'fetchProjectsSelector',
//   get: async ({ get }) => {
//     try {
//       const response = await axios.post(baseURL + '/projects', {
//         userId: window.Clerk.user.id
//       })
//       const data = await response.data

//       let projects = data.projects.map(project => {
//         let done = 0;
//         let notcomplete = 0;
//         let tasks = project.tasks.tasks
//         if (tasks) {
//           tasks.forEach((task, index) => {
//             if (task.status === 'done') {
//               done += 1;
//             } else {
//               notcomplete += 1
//             }
//           })
//         }
//         let progress = Math.floor(done / (done + notcomplete) * 100)
//         if (!progress) {
//           progress = 0
//         }
//         return {
//           ...project,
//           progress
//         }
//       })
//       return projects
//     } catch (error) {
//       throw error
//     }
//   }
// })
//#endregion

//new
export const fetchProjects = selector({
  key: 'fetchProjectsSelector',
  get: async ({ get }) => {
    try {
      const response = await axios.post(baseURL + window.Clerk.user.publicMetadata.type + '/projects', {
        userId: window.Clerk.user.id
      })
      const data = await response.data

      let projects = data.projects
      return projects
    } catch (error) {
      throw error
    }
  }
})


export const tempFahrenheit = atom({
  key: 'tempFahrenheit',
  default: 32,
});

export const reorderTask = selector({
  key: 'reorderTaskSelector',
  get: ({ get }) => get(projectAtom),
  set: ({ set, get }, params) => {
    let { project, tasks, source, destination } = params
    let current = project.formatedTasks.find(task => task.status === source.droppableId)
    let next = project.formatedTasks.find(task => task.status === destination.droppableId)
    const target = current.tasks[source.index]

    if (source.droppableId === destination.droppableId) {
      const reordered = reorder(current.tasks, source.index, destination.index);
      const newArr = tasks.map(x => (x.status === current.status ? { ...x, tasks: reordered } : x));
      const newProject = {
        ...project,
        formatedTasks: newArr
      }
      set(projectAtom, newProject)
    } else {
      current = {
        ...current,
        tasks: current.tasks.filter((task, index) => index !== source.index)
      }
      next = {
        ...next,
        tasks: [
          ...next.tasks,
          target
        ]
      }
      const newTasks = tasks.map(task => {
        if (current.status === task.status) {
          return {
            ...task,
            tasks: current.tasks
          }
        } else if (next.status === task.status) {
          return {
            ...task,
            tasks: next.tasks
          }
        }

        return task
      })
      const newProject = {
        ...project,
        formatedTasks: newTasks
      }
      set(projectAtom, newProject)

    }
  }
});

export const deleteTaskSelector = selector({
  key: 'deleteTaskSelector',
  get: ({get}) => get(projectAtom),
  set: ({set, get}, params) => {
    const {index} = params
    let project = get(projectAtom)
    let tasks = project.tasks 
    let newProject = {
      ...project,
      tasks: tasks.filter((task, oldIndex) => oldIndex !== index)
    }
    set(projectAtom, newProject)
  }
})

export const updateTasksSelector = selector({
  key: 'updateTasksSelector',
  get: ({ get }) => get(projectAtom),
  set: ({ set, get }, params) => {
    const { addedTask } = params
    let project = get(projectAtom)
    let tasks = project.tasks
    let newProject = {
      ...project,
      tasks: [...tasks, addedTask]
    }
    set(projectAtom, newProject)
  }
})

export const updateMiniTaskSelector = selector({
  key: 'updateMiniTaskSelector',
  get: ({ get }) => get(projectAtom),
  set: ({ set, get }, params) => {
    const { addedTask } = params

    let project = get(projectAtom)
    let tasks = project.tasks.map((task) => {
      if (task.uuid === addedTask.uuid) {
        return {
          ...task,
          tasks: addedTask.tasks
        }
      }
      return task
    })
    let newProject = {
      ...project,
      tasks
    }
    set(projectAtom, newProject)
  }
})

export const addMiniTaskStatusSelector = selector({
  key: 'addMiniTaskStatusSelector',
  get: ({ get }) => get(projectAtom),
  set: ({ set, get }, params) => {
    const { updatedMiniTask } = params
    let project = get(projectAtom)

    let tasks = project.tasks.map((task) => {
      if (task.uuid === updatedMiniTask.uuid) {
        return {
          ...task,
          tasks: task.tasks.map((miniTask, index) => {
            if (index === updatedMiniTask.index) {
              return {
                ...miniTask,
                completed: updatedMiniTask.miniTask.completed
              }
            }
            return miniTask
          })
        }
      }
      return task
    })
    let newProject = {
      ...project,
      tasks
    }
    set(projectAtom, newProject)
  }
})

export const deleteMiniTaskSelector = selector({
  key: 'deleteMiniTaskSelector',
  get: ({ get }) => get(projectAtom),
  set: ({ set, get }, params) => {
    const { uuid, index } = params
    let project = get(projectAtom)

    let tasks = project.tasks.map((task) => {
      if (task.uuid === uuid) {
        return {
          ...task,
          tasks: task.tasks.filter((x, oldIndex) => oldIndex !== index)
        }
      }
      return task
    })

    let newProject = {
      ...project,
      tasks
    }
    set(projectAtom, newProject)
  }
})

export const accountTypeAtom = atom({
  key: 'accountTypeAtom',
  default: ''
})

export const accountTypeSelector = selector({
  key: 'accountTypeSelector',
  get: ({get}) => get(accountTypeAtom),
  set: ({set}, params) => {
    set(accountTypeAtom, params)
  }
})

export const updateTaskTitleSelector = selector({
  key: 'updateTaskTitleSelector',
  get: ({get}) => get(projectAtom),
  set: ({set, get}, params) => {
    const {index, newTitle} = params 
    const project = get(projectAtom)
    const tasks = project.tasks.map((task, oldIndex) => {
      if (oldIndex === index) {
        return {
          ...task,
          title: newTitle
        }
      }
      return task
    })
    const newProject = {
      ...project,
      tasks
    }
    set(projectAtom, newProject)
  }
})

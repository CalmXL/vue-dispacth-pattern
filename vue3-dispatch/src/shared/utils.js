// 创建任务
export function asyncTaskCreator (
  asyncTask, 
  syncTasks
) {
  const asyncTaskPool = new Map();
  asyncTaskPool.set(asyncTask, syncTasks);
  return asyncTaskPool;
}

// Notify 通知
export function taskNotify (state, taskPool) {
  return function (type, payload) {
    for (let t in taskPool) {
      if (t === type && taskPool[t].length !== 0) {
        taskPool[t].forEach(task => {
          if (task instanceof Map) {
            for (let [ asyncTask, tasks ] of task) {
              asyncTask(payload).then(res => {
                if (tasks.length !== 0) {
                  tasks.forEach(item => {
                    item(state, { payload, data: res.data });
                  })
                }
              }).catch((e) => {
                console.log(e);
              })
            }
          } else {
            task(state, { payload, data: null });
          }
        })
      }
    }
  }
}
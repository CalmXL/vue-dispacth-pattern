# 派发器 + 通知任务执行

## 文件夹功能

- src 
	- hooks -> 实现useReducers
	- services -> 完成异步请求
	- shared -> 共享文件
		- utils.js -> 工具函数
		- http.js -> axios 拦截封装
	- components 组件
		- todoList -> todoList 组件
			- Form.vue
			- store -> 实现 派发器的任务
				- action -> 用于执行逻辑库
					- task.js -> 同步任务
					- index.js -> 使用封装的 asyncTaskCreateor(Map结构) -> 创建单任务集中管理 
							   -> 最终暴露所有任务集中管理的 taskPool
				- actionType.js -> 用于派发事件的状态名称
				- reducer.js -> 创建 reducer， 并通过useReducer 返回用于事件派发的 dispatch, state(需要做响应式处理)
				- state.js -> 初始状态声明
				- index.js -> 用于统一暴露所需参数


## hooks

useReducer -> 返回 state， dispatch
```
	import { reactive } from 'vue';
	export default function (reducer, initialState) {
		const state = reactive(initialState);

		const dispatch = (type) => {
			return function (payload) {
				reducer(state, { type, payload })
			}
		} 

		return [
			state,
			dispatch
		]
	}
```

## action 
	
1. task.js 异步完成之后传入返回data, 同步函数的执行
```
	// data 为异步任务完成后 返回的数据
	const task = (state, { payload, data}) => {
		// 同步任务的执行...
	}
```

2. index.js 
	- 单任务： 异步任务 + 同步任务的任务集中管理
	- 所有任务的整合
```
	// 创建任务的封装
	function asyncTaskCreator (asyncTask， syncTasks) {
		const asyncTaskPool = new Map();
		asyncTaskPool.set(asyncTask, syncTasks);
		return asyncTaskPool
	}

	const addTodoTask = asyncTaskCreator(todoService['addTodo'], [
		addTodo, // task引入
		addCount // task引入
	]);

	const removeTodoTask = asynctaskCreator(...);
	const toggleTodoTask = asyncTaskCreator(...);

	//
	export default {
		['addTodo']: [
			addTodoTask
		],
		['removeTodo']: [
			removeTodoTask
		],
		['toggleTodo']: [
			toggleTodoTask
		]
		...
	}
```

## reducer

- 使用了任务通知机制

```
// 执行返回一个 需要 type, payload 的函数， 用于派发执行对应任务集中管理的全部任务
function teskNotify (state, taskPool) {
	return function (type, payload) {
		for (let t in taskPool) {
			if (t === type && taskPoll[t].length > 0) {
				taskPool[t].forEach(task => {
					if (task instanceof Map) { // 带有异步任务
						for (ley [ asyncTask, tasks ] of task) { // for 解构 出map 的键值对
							asyncTask(payload).then((res) => {
								tasks.forEach(item => {
									item(state, { payload, data: res.data });
								})
							}).catch(e => {
								console.log(e)；	
							})
						}
					} else {	 
						task();
					}
				})
			}
		}
	} 
}


function reducer (state, { type, payload }) {
	const notify = taskNotify(state, taskPool);
	return noify(type, payload);
}

export default function () {
	const [
		state,
		todoDispatch
	] = useReducer(reducer, initialState);

	return {
		...toRefs(state),
		todoDispacth
	}
}

```



















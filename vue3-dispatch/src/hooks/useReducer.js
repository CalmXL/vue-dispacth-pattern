import { reactive } from "vue"; 

export default function (reducer, initialState) {
  // 将 state 响应式
  const state = reactive(initialState);

  // dispatch 接收类型，返回函数接收 payload 参数
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
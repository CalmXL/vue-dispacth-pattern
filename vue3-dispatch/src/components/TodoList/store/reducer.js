// import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, INIT_TODOLIST } from "./actionType";
// import action from './action';
import { useReducer } from '@/hooks';
import initialState from './state';
import { toRefs } from "vue";
import { taskNotify } from '@/shared/utils';
import taskPool from './actions/index'

function reducer (state, { type, payload }) {
  const notify = taskNotify(state, taskPool);
  return notify(type, payload);
}

export default function () {
  const [
    state,
    todoDispatch
  ] = useReducer(reducer, initialState);

  return {
    ...toRefs(state),
    todoDispatch
  }
}
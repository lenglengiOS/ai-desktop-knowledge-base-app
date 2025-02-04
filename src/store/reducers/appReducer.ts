import * as Types from "../constant/actionTypes";

const initState = {
  loading: false,
  loadingText: "加载中...",
  // 安装错误信息
  errMessage: "",

  // 当前安装步骤
  currentStep: "",

  // 是否安装成功
  isSuccess: false,
};

type ActionType = { payload: any; type: String };

const appReducer = (state = initState, action: ActionType) => {
  const payload = action.payload;
  switch (action.type) {
    // 显示loading
    case Types.SHOW_LOADING:
      return { ...state, loading: true, loadingText: payload || "加载中..." };

    // 隐藏loading
    case Types.HIDE_LOADING:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default appReducer;

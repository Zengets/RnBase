const themeReducer = (state, action) => {
    if (!state) return {
        remember:true,
        title:"",
        headImg:null
    }

    switch (action.type) {
        case 'CHANGE_REM':
            return { ...state, remember: action.remember }
            break
        case 'CHANGE_TIT':
            return { ...state, title: action.title }
            break
        case 'CHANGE_IMAGE':
            return { ...state, headImg: action.headImg }
            break

        default:
            return state
    }
}
export default themeReducer
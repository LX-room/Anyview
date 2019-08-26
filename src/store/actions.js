/*
通过mutation间接更新state的多个方法的对象，主要是执行异步函数
*/
export default{
    sendSchoolListReq(){
        this._vm.socket.sendSock({type: 6,content: '获取学校列表'}, this._mutations.getSchoolListRes[0])
    },
    sendLoginReq(store,user){
        this._vm.socket.sendSock({type: 0, content: user}, this._mutations.getLoginRes[0])
    },
    sendQuestionListReq(store){
        let id=JSON.parse(localStorage.getItem('user')).id
        this._vm.socket.sendSock({type: 3, content: id}, this._mutations.getQuestionListRes[0])
    },
    sendQuestionContentReq(store,{id,name}){
        this._vm.socket.sendSock({type: 4, content: id}, this._mutations.getQuestionContentRes[0])
        store.state.presentQuestion.name=name
    }
}

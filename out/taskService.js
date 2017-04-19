var TaskService = (function () {
    function TaskService() {
        this.taskList = [];
        this.observerList = [];
        TaskService.count++;
        if (TaskService.count > 1) {
            throw 'singleton!!!';
        }
    }
    //获取TaskService的实例
    TaskService.getInstance = function () {
        if (TaskService.instance == null) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    };
    //不公开数据，交给调用方处理
    TaskService.prototype.getTaskByCustomRule = function (rule) {
        //拷贝数据
        var clone = this.taskList;
        //为传入函数增加了参数
        return rule(clone);
    };
    TaskService.prototype.addTask = function (task) {
        this.taskList.push(task);
    };
    TaskService.prototype.addObserver = function (observer) {
        this.observerList.push(observer);
    };
    TaskService.prototype.removeObserver = function (observer) {
        //排序
        //.....
        this.observerList.pop;
    };
    //public removeObserver(observer : Observer){}
    TaskService.prototype.removeTask = function (task) {
        this.taskList.pop;
    };
    //将任务发送给所有观察者,并让观察者进行相应的处理
    //只能内部调用
    TaskService.prototype.notify = function (task) {
        for (var i = 0; i < this.observerList.length; i++) {
            this.observerList[i].onChange(task);
        }
    };
    return TaskService;
}());
TaskService.count = 0;

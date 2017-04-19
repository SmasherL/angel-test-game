var Task = (function () {
    function Task(id, name, status, fromNpcId, toNpcId, condition) {
        this.current = 0;
        this.total = -1;
        this.id = id;
        this.name = name;
        this.status = status;
        this.fromNpcId = fromNpcId;
        this.toNpcId = toNpcId;
        this.condition = condition;
        if (condition == "talk") {
            this.total = -1;
        }
        else if (condition == "kill") {
            this.total = 10;
        }
    }
    Task.prototype.getId = function () {
        return this.id;
    };
    Task.prototype.getName = function () {
        return this.name;
    };
    Task.prototype.getStatus = function () {
        return this.status;
    };
    Task.prototype.getFromNpcId = function () {
        return this.fromNpcId;
    };
    Task.prototype.getToNpcId = function () {
        return this.toNpcId;
    };
    Task.prototype.setStatus = function (taskStatus) {
        this.status = taskStatus;
    };
    Task.prototype.setCurrent = function () {
        this.current++;
        this.checkStatus();
    };
    Task.prototype.getCurrent = function () {
        return this.current;
    };
    //检测进行中到可提交
    Task.prototype.checkStatus = function () {
        if (this.status == TaskStatus.DURING && this.current >= this.total) {
            this.status = TaskStatus.CANSUBMIT;
            TaskService.getInstance().notify(this);
        }
    };
    //接受任务
    Task.prototype.onAccept = function () {
        if (this.getStatus() == TaskStatus.ACCEPTABLE) {
            this.setStatus(TaskStatus.DURING);
            if (this.condition == "talk") {
                new NPCTalkTaskCondition().onAccept(this);
            }
            else if (this.condition == "kill") {
                new KillMonsterTaskCondition().onAccept(this);
            }
            TaskService.getInstance().notify(this);
        }
    };
    //完成任务
    Task.prototype.onSubmit = function () {
        if (this.id == "") {
            return ErrorCode.MISSING_TASK;
        }
        if (this.getStatus() == TaskStatus.CANSUBMIT) {
            this.setStatus(TaskStatus.SUBMITTED);
            TaskService.getInstance().notify(this);
            //将下一个任务设为可完成
            for (var i = 0; i < TaskService.getInstance().taskList.length - 1; i++) {
                if (this.id == TaskService.getInstance().taskList[i].getId()) {
                    TaskService.getInstance().taskList[i + 1].setStatus(TaskStatus.ACCEPTABLE);
                    TaskService.getInstance().notify(TaskService.getInstance().taskList[i + 1]);
                    break;
                }
            }
        }
        return ErrorCode.SUCCESS;
    };
    return Task;
}());
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    TaskStatus[TaskStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CANSUBMIT"] = 3] = "CANSUBMIT";
    TaskStatus[TaskStatus["SUBMITTED"] = 4] = "SUBMITTED";
})(TaskStatus || (TaskStatus = {}));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["SUCCESS"] = 0] = "SUCCESS";
    ErrorCode[ErrorCode["MISSING_TASK"] = 1] = "MISSING_TASK";
})(ErrorCode || (ErrorCode = {}));

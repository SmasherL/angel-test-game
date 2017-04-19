var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(id) {
        var _this = _super.call(this) || this;
        _this.isClick = false;
        _this.id = id;
        return _this;
    }
    NPC.prototype.getId = function () {
        return this.id;
    };
    //根据变化的任务的相应状态改变相应NPC头顶的符号
    NPC.prototype.onChange = function (task) {
        //任务刚创建时
        if (task.getStatus() == TaskStatus.ACCEPTABLE) {
            if (this.id == task.getFromNpcId() && this.isClick) {
                task.onAccept();
                this.isClick = false;
            }
        }
        else if (task.getStatus() == TaskStatus.CANSUBMIT) {
            if (this.id == task.getToNpcId() && this.isClick) {
                task.onSubmit();
                this.isClick = false;
            }
        }
        //task0
        if (task.getId() == "0") {
            if (task.getStatus() == TaskStatus.DURING || task.getStatus() == TaskStatus.CANSUBMIT) {
                if (this.id == "npc_0") {
                    this.image.src = "NPC.jpg";
                }
                if (this.id == "npc_1") {
                    this.image.src = "NPC_canSubmit.jpg";
                }
            }
            else if (task.getStatus() == TaskStatus.SUBMITTED) {
                if (this.id == "npc_0") {
                    this.image.src = "NPC.jpg";
                }
                if (this.id == "npc_1") {
                    this.image.src = "NPC.jpg";
                }
            }
        }
    };
    return NPC;
}(angel.Bitmap));

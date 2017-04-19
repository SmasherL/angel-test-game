var NPCTalkTaskCondition = (function () {
    function NPCTalkTaskCondition() {
    }
    //Task与TaskConditionContext的区别
    //不想让NPCTalkTaskCondition得到task的所有信息
    NPCTalkTaskCondition.prototype.onAccept = function (context) {
        context.setCurrent();
    };
    NPCTalkTaskCondition.prototype.onSubmit = function () {
    };
    return NPCTalkTaskCondition;
}());
var KillMonsterTaskCondition = (function () {
    function KillMonsterTaskCondition() {
    }
    KillMonsterTaskCondition.prototype.onAccept = function (context) {
        context.setCurrent();
    };
    KillMonsterTaskCondition.prototype.onSubmit = function () {
    };
    return KillMonsterTaskCondition;
}());

var canvas = document.getElementById("app");
var stage = angel.run(canvas);
//SVN : 以文件为核心
//GIT : 以版本为核心
// 命令行工具
// shell / bat
// c / go 
// VM + script (Node + TypeScript) -- (egret create / egret build)
//npm link -> engine
//engine config
angel.Ticker.getInstance().register(function (deltaTime) {
    //console.log(deltaTime);
});
//帧动画
var idleData = {
    name: "111",
    frames: [
        { "image": "playerIdle1.jpg" },
        { "image": "playerIdle1.jpg" },
        { "image": "playerIdle1.jpg" },
        { "image": "playerIdle1.jpg" },
        { "image": "playerIdle1.jpg" },
        { "image": "playerIdle1.jpg" },
        { "image": "playerIdle2.jpg" },
        { "image": "playerIdle2.jpg" },
        { "image": "playerIdle2.jpg" },
        { "image": "playerIdle2.jpg" },
        { "image": "playerIdle2.jpg" },
        { "image": "playerIdle2.jpg" }
    ]
};
var moveData = {
    name: "111",
    frames: [
        { "image": "playerMove1.jpg" },
        { "image": "playerMove1.jpg" },
        { "image": "playerMove1.jpg" },
        { "image": "playerMove1.jpg" },
        { "image": "playerMove1.jpg" },
        { "image": "playerMove1.jpg" },
        { "image": "playerMove2.jpg" },
        { "image": "playerMove2.jpg" },
        { "image": "playerMove2.jpg" },
        { "image": "playerMove2.jpg" },
        { "image": "playerMove2.jpg" },
        { "image": "playerMove2.jpg" }
    ]
};
var player = new angel.MovieClip(idleData);
player.image.src = "player1.jpg";
player.image.width = 128;
player.image.height = 128;
var playerTween = new angel.Tween(player, moveData, idleData);
var npc = new NPC("npc_0");
npc.image.src = "NPC_canAccept.jpg";
npc.image.width = 128;
npc.image.height = 128;
npc.x = 128 * 1;
npc.y = 128 * 2;
npc.addEventListener("onclick", function (e) {
    npc.isClick = true;
    TaskService.getInstance().notify(task);
}, this, false);
var npc1 = new NPC("npc_1");
npc1.image.src = "NPC.jpg";
npc1.image.width = 128;
npc1.image.height = 128;
npc1.x = 128 * 3;
npc1.y = 128 * 1;
npc1.addEventListener("onclick", function (e) {
    npc1.isClick = true;
    TaskService.getInstance().notify(task);
}, this, false);
//点击npc0接受，点击npc1提交
var task = new Task("0", "将消息传递给另一个NPC", TaskStatus.ACCEPTABLE, "npc_0", "npc_1", "talk");
TaskService.getInstance().addTask(task);
TaskService.getInstance().addObserver(npc);
TaskService.getInstance().addObserver(npc1);
//图片
var avater = new angel.Bitmap();
avater.image.src = "avater.jpg";
//加载完图片资源
avater.image.onload = function () {
    stage.addChild(new MyMap());
    stage.addChild(npc);
    stage.addChild(npc1);
    stage.addChild(player);
};
//vertexShaderSourceCode : 顶点着色器，决定形状  模型-决定数据
//fragmentShaderSourceCode ： 片元着色器，决定颜色   材质-决定数据

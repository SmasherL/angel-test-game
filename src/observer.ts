interface Observer{

    //接受到信息后进行相应的处理，信息作为参数可以是任意事物，如task等
    onChange(object : any);

}


class NPC extends angel.Bitmap implements Observer{

    private id : String;

    isClick = false;

    constructor(id : String){

        super();
        this.id = id;
    }

    public getId() : String{

        return this.id;
    }


    //根据变化的任务的相应状态改变相应NPC头顶的符号
    onChange(task : Task){

        //任务刚创建时
        if(task.getStatus() == TaskStatus.ACCEPTABLE){

            if(this.id == task.getFromNpcId() && this.isClick){

                task.onAccept();
                this.isClick = false;
                
            }

        }else if(task.getStatus() == TaskStatus.CANSUBMIT){

            if(this.id == task.getToNpcId() && this.isClick){

                task.onSubmit();
                this.isClick = false;
            }
        }


        //task0
        if(task.getId() == "0"){
           
            if(task.getStatus() == TaskStatus.DURING || task.getStatus() == TaskStatus.CANSUBMIT){

                if(this.id == "npc_0"){

                    this.image.src = "NPC.jpg";
                }

                if(this.id == "npc_1"){           

                    this.image.src = "NPC_canSubmit.jpg";
                }

            }else if(task.getStatus() == TaskStatus.SUBMITTED){

                if(this.id == "npc_0"){
                    this.image.src = "NPC.jpg";
                }

                if(this.id == "npc_1"){
                    this.image.src = "NPC.jpg";
                }
            }
        }

        
    }
    
}




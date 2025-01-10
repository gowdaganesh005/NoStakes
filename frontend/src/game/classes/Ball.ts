
export class Ball{
    private x: number;
    private y: number;
    private radius: number;
    private color: string;
    private vx: number;
    private vy: number;
    private ctx: CanvasRenderingContext2D;
    private obstacles: number;
    private sinks: number;
    private onFinish: (index:number) => void;

    constructor(x: number,y: number,radius: number,color: string, ctx: CanvasRenderingContext2D, obstacles: number, sinks: number, onFinish: (index:number) => void){
        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
        this.vx=0
        this.vy=0
        this.ctx=ctx
        this.obstacles=obstacles
        this.sinks=sinks
        this.onFinish=onFinish
    }

    draw(){
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius , 0 ,Math.PI * 2);
        this.ctx.fillStyle=this.color
        this.ctx.fill()
        this.ctx.closePath()
    }
    
}
import { gravity, horizontalFriction, verticalFriction } from "../constants";
import { pad, unpad } from "../pad";
import { Obstacle, Sink } from "../types";

export class Ball{
    private x: number;
    private y: number;
    private radius: number;
    private color: string;
    private vx: number;
    private vy: number;
    private ctx: CanvasRenderingContext2D;
    private obstacles: Obstacle[];
    private sinks: Sink[];
    private onFinish: (index:number) => void;

    constructor(x: number,y: number,radius: number,color: string, ctx: CanvasRenderingContext2D, obstacles: Obstacle[], sinks: Sink[], onFinish: (index:number) => void){
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
        this.ctx.arc(unpad(this.x), unpad(this.y), this.radius , 0 ,Math.PI * 2);
        this.ctx.fillStyle=this.color
        this.ctx.fill()
        this.ctx.closePath()
    }
    
    update(){
        // here the velocity along y is updated and new positon is calculated using d=x+v*t but we dont consider t as the factor to maintain determinism of the game
        this.vy += gravity;
        this.x += this.vx;
        this.y += this.vy;

        this.obstacles.forEach(ele => {
            // calculating the distance from each other
            const dist=Math.hypot(this.x-ele.x,this.y-ele.y);
            if(dist < pad(this.radius + ele.radius)) {
                const angle = Math.atan2(this.y-ele.y,this.x-ele.x)
                const velocity = Math.sqrt((this.vx*this.vx) + (this.vy*this.vy))
                this.vy = velocity* Math.sin(angle) * verticalFriction;
                this.vx = velocity* Math.cos(angle) * horizontalFriction;

                const overlap = (this.radius + ele.radius) - unpad(dist);
                this.x += pad(Math.cos(angle) * overlap);
                this.y += pad(Math.sin(angle) * overlap);

            }
            
        });
        // checking if it went into sink

        for(let i=0;i<this.sinks.length; i++){
            const ele=this.sinks[i]
            if( (unpad(this.y) + this.radius ) > (ele.y - ele.height / 2) &&
                (unpad(this.x) > ele.x - ele.width / 2)  && 
                (unpad(this.x) < ele.x + ele.width / 2)
            ){
                this.vx=0;
                this.vy=0;
                this.onFinish(i);
                break;
               

            }       
        }
    
    }
    
}
import { ballRadius, HEIGHT, obstacleRadius, sinkWidth, WIDTH } from "../constants";
import { pad, unpad } from "../pad";
import { createObstacles, createSinks, Obstacle, Sink } from "../types";
import { Ball } from "./Ball";

export class BallManager{
    private balls: Ball[];
    private canvasRef: HTMLCanvasElement
    private obstacles: Obstacle[]
    private sinks: Sink[]
    private ctx: CanvasRenderingContext2D
    private requestId?: number
    private onFinish?: (index:number,startX?:number)=>void

    constructor(canvasRef:HTMLCanvasElement,onFinish:(index:number)=>void){
        this.balls = [];
        this.canvasRef = canvasRef;
        this.ctx  = this.canvasRef.getContext("2d")!;
        this.obstacles = createObstacles();
        this.sinks = createSinks();
        this.update()
        this.onFinish = onFinish
    }

    addBall(startX?: number){
        const newBall = new Ball(
            startX || pad(WIDTH/2 + 13),
            pad(20),
            ballRadius,
            "red",
            this.ctx,
            this.obstacles,
            this.sinks,
            (index)=>{
                this.balls=this.balls.filter(ball => ball !== newBall)
                this.onFinish?.(index,startX)
            }
        )

        this.balls.push(newBall)
    }

    drawObstacles(){
        for(let i=0;i<this.obstacles.length;i++){
            const cur=this.obstacles[i]
            this.ctx.beginPath();
            this.ctx.arc(unpad(cur.x),unpad(cur.y),cur.radius,0,Math.PI * 2);
            this.ctx.fillStyle = "white"
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    getColor(index:number){
        if(index < 2 || index > 14){
            return  {background: "#e30b18" , color: 'white'}
        }
        if(index < 3 || index > 13){
            return  {background: "#f45122" , color: 'white'}
        }
        if(index < 5 || index > 11){
            return  {background: "#f77f24" , color: 'white'}
        }
        if(index < 6 || index > 10){
            return  {background: "#ffa433" , color: 'black'}
        }
        if(index < 7 || index > 9){
            return  {background: "#fdbb14" , color: 'black'}
        }
        else{
            return  {background: "#f7dc16" , color: 'black'}
        }
       

    }

    drawSinks(){
        const spacing = obstacleRadius * 2;
        for(let i=0; i< this.sinks.length ;i++){
            this.ctx.fillStyle = this.getColor(i).background
            const sink = this.sinks[i];
            this.ctx.font='normal 13px Arial';
            this.ctx.fillRect(sink.x,sink.y-sink.height/2,sink.width-spacing,sink.height)
            this.ctx.fillStyle =this.getColor(i).color
            this.ctx.fillText((sink.multiplier).toString() + `x`,sink.x-15 + sinkWidth / 2,sink.y)
        }

    }

    draw(){
        this.ctx.clearRect(0,0,WIDTH,HEIGHT)
        this.drawObstacles();
        this.drawSinks();
        this.balls.forEach(ball=>{
            ball.draw();
            ball.update();
        })
    }

    update(){
        this.draw();
        this.requestId = requestAnimationFrame(this.update.bind(this))
    }

    stop(){
        if(this.requestId){
            cancelAnimationFrame(this.requestId)
        }
    }
}
import { useEffect, useRef, useState } from "react"
import { BallManager } from "../game/classes/BallManager";
import { HEIGHT, WIDTH } from "../game/constants";
import axios from "axios"

export function Game(){
    const [ballManager,setBallManager]=useState<any>();
    const canvasRef=useRef<any>()

    useEffect(()=>{
        if(canvasRef.current){
            const ballManager=new BallManager(canvasRef.current ,(index:number)=>{})
            setBallManager(ballManager)
        }
    },[canvasRef])


    return(
        <>
        <div className="flex bg-black">
        <div className="my-10">
        <canvas ref={canvasRef} width={WIDTH} height={HEIGHT}></canvas>
        </div>
        <div className="flex flex-col justify-center">
        <button
            className=" text-white bg-green-700 p-4 text-xl font-extrabold "
            onClick={async()=>{
                const response = await axios.post("http://localhost:3000/game")
                if(ballManager){
                    ballManager.addBall(response.data.point)
                }
            }}
        >
            Add Ball
        </button>
        </div>
        

        </div>

        </>
    )
}
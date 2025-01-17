import { useEffect, useRef, useState } from "react";
import { BallManager } from "../game/classes/BallManager";
import { HEIGHT, WIDTH } from "../game/constants";
import { pad } from "../game/pad";

export function Simulation() {
    const canvasRef=useRef<any>()
    let [output,setOutput]=useState<any>({
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
        12: [],
        13: [],
        14: [],
        15: [],
        16: [],
        17: []
    })
    async function simulate(ballManager: BallManager){
        let i = 0;
        while (1) {
            i++;
            ballManager.addBall(pad(WIDTH/2 + 20 * (Math.random() -0.5)))
            
            await new Promise((resolve) => setTimeout(resolve,10000));
        }
    }
    useEffect(()=>{
        if(canvasRef.current){
            const ballManager= new BallManager(
                canvasRef.current as unknown as HTMLCanvasElement,
                (index:number ,startX?:number)=>{
                    setOutput((output:any)=>(
                        {...output,
                            [index]: [...(output[index]),startX]
                        }
                    ))
                }
            )
            simulate(ballManager);
            return ()=>{
                ballManager.stop();
            }
        }
    },[canvasRef])

    return (
        <div className="flex  items-center justify-center">
            <div className="flex text-gray-200">
                {JSON.stringify(output,null, 2)}

            </div>
            <div>
                <canvas ref={canvasRef} width={WIDTH} height={HEIGHT}></canvas>
            </div>

        </div>
    )
}
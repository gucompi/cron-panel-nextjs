'use client'
import {Delete, Edit, PlayArrow, Stop} from "@mui/icons-material";
import {runCron,runCrons,stopOrRestartCron} from "@/app/utils/cron.api";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const handlePlay = async (cron) => {
    if(!cron) {
        return runCrons().subscribe({
            next: data => {
                //setIsLoading(false);
            },
            error: (error) => {
                //setIsLoading(false);
                console.log(error);
            }
        });

    }else{
        return runCron(cron).subscribe({
            next: data => {
                //setIsLoading(false);
            },
            error: (error) => {
                //setIsLoading(false);
                console.log(error);
            }
        });
    }
}
const handleStopAndRestart = (cron) => {
    return stopOrRestartCron(cron._id).subscribe({
        next: data => {
            debugger;
            //setIsLoading(false);
        },
        error: (error) => {
            //setIsLoading(false);
            console.log(error);
        }
    });
}

const Actions = ({cron}) => {
    const { push } = useRouter();

    const handleEdit = function(cron) {
        push(`/crons/edit/${cron._id}`);
    }
    if(!cron) {
        return (
            <div className="flex items-center space-x-3.5">
                <button onClick={()=>handlePlay()} className="hover:text-primary">
                    <PlayArrow/>
                </button>
            </div>
            );
    }else{
        return (
            <div className="flex items-center space-x-3.5">
                <button onClick={()=>handlePlay(cron)} className="hover:text-primary">
                    <PlayArrow/>
                </button>
                <button className="hover:text-primary" onClick={()=>handleStopAndRestart(cron)}>
                    { cron.enabled===undefined || cron.enabled ? <Stop/> : <PlayArrow/>}
                </button>
                <button className="hover:text-primary">
                    <Edit onClick={()=>handleEdit(cron)}/>
                </button>
            </div>
        )
    }

}

export default Actions
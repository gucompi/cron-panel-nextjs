import {NextRequest, NextResponse} from "next/server";
import {getCron, startCron, stopCron} from "@/app/utils/db";

export const PUT = async (request:NextRequest,{params}) => {
    //get id from url
    const {id} = params;
    let cron = await getCron(id);
    if(!cron){
        return NextResponse.json({
            error: "Cron not found",
        }).status(404);
    }
    if(cron.enabled == undefined || cron.enabled) {
        await stopCron(id);
    } else {
        await startCron(id);
    }
    return NextResponse.json({
        data: cron,
    });
}
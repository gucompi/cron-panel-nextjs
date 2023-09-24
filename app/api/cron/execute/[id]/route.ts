import {executeCron, getCron, startCron, stopCron} from "@/app/utils/db";
import {NextRequest, NextResponse} from "next/server";

export const POST = async (request:NextRequest,{params}) => {
    //get id from url
    const {id} = params;
    let cron = await getCron(id);
    if(!cron){
        return NextResponse.json({
            error: "Cron not found",
        }).status(404);
    }
    await executeCron(id);
    return NextResponse.json({
        data: cron,
    });
}

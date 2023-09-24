import {NextRequest, NextResponse} from "next/server";
import {executeCron, getPendingCrons} from "@/app/utils/db";

export const POST = async (request:NextRequest,{params}) => {
    const crons = await getPendingCrons();

    let results = await Promise.all(crons.map(async (cron)=>{
        return executeCron(cron._id);
    }));
    return  NextResponse.json({
        data: results,
    });
}
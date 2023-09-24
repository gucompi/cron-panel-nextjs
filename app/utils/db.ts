import CronModel from "../../models/cron.model";
import ExecutionModel from "../../models/execution.model";
import cronParser from "cron-parser";
import {callProcess} from "@/app/utils/tookane.api";
import connectDB from "@/db/db";


export const createCron = async (cron)=>{
    await connectDB();
    return CronModel.create({
        name: cron.name,
        url: cron.url,
        cron: cron.cronString,
    });
}
function wait(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("done");
        }, ms);
    });
}
export const stopCron = async (id:string)=>{
    await connectDB();
    const cron = await getCron(id);
    if(!cron){
        throw new Error("Cron not found");
    }
    cron.enabled = false;
    await CronModel.updateOne({_id: id}, cron);

    return cron;
}
export const startCron = async (id:string)=>{
    await connectDB();
    const cron = await getCron(id);
    if(!cron){
        throw new Error("Cron not found");
    }
    cron.enabled = true;
    await CronModel.updateOne({_id: id}, cron);
    return cron;
}
export const executeCron = async (id:string)=>{
    await connectDB();
    const cron = await getCron(id);
    if(!cron){
        throw new Error("Cron not found");
    }
    let execution = await ExecutionModel.create({
        cron: id,
        start: new Date(),
        status: "running",
    });

    cron.isRunning = true;
    const parseCron = cronParser.parseExpression(cron.cron);
    let nextInterval = parseCron.next();
    const cooldown_period = cron.cooldown_period || 5
    if(nextInterval.getTime() - new Date().getTime() <= cooldown_period * 60 * 1000){
        nextInterval = parseCron.next()
    }
    cron.nextExecution = nextInterval.toDate();

    await CronModel.updateOne({_id: id}, cron);

    const results = await callProcess(cron.url, cron.method);
    if(results.message && results.message.includes("done")){
        execution.status = "success";
    }else{
        execution.status = "error";
    }
    execution.end = new Date();
    execution.message = results;
    await ExecutionModel.updateOne({_id: execution._id}, execution);

    cron.isRunning = false;
    await CronModel.updateOne({_id: id}, cron);
    return cron;
}

export const getPendingCrons = async ()=>{
    await connectDB();
    return CronModel.find({
        $and: [{
            "$or": [
                {nextExecution: {$lte: new Date()}},
                {nextExecution: {$exists:false}},
            ]
        },
            {
                "$or": [
                    {isRunning: false},
                    {isRunning: {$exists:false}},
                ]
            },
            {enabled: true},
        ]
    });
}

export const getCron = async (id:string)=>{
    await connectDB();
    return CronModel.findById(id).lean();
}
export const getCrons = async ()=>{
    await connectDB();
    const crons = await CronModel.find({}).lean();
    return crons.map((cron)=>{
        return {
            ...cron,
            cron: parseCron(cron.cron,cron.nextExecution  )
        }
    });
}

const parseCron = (cronString:string,nextExecution:Date)=>{

    // Parsea la cadena cron
    try {
        const nextInterval = nextExecution;
        const currentDate = new Date();
        const timeUntilNextExecutionMillis = nextInterval.getTime() - currentDate.getTime();
        const timeUntilNextExecutionSeconds = Math.floor(timeUntilNextExecutionMillis / 1000);
        const timeUntilNextExecutionMinutes = Math.floor(timeUntilNextExecutionSeconds / 60);
        const timeUntilNextExecutionHours = Math.floor(timeUntilNextExecutionMinutes / 60);

        let timeUntilNextExecution = '';

        if (timeUntilNextExecutionHours > 0) {
            timeUntilNextExecution = `${timeUntilNextExecutionHours} hora${timeUntilNextExecutionHours > 1 ? 's' : ''}`;
        } else if (timeUntilNextExecutionMinutes > 0) {
            timeUntilNextExecution = `${timeUntilNextExecutionMinutes} minuto${timeUntilNextExecutionMinutes > 1 ? 's' : ''}`;
        } else if(timeUntilNextExecutionSeconds > 0) {
            timeUntilNextExecution = `${timeUntilNextExecutionSeconds} segundo${timeUntilNextExecutionSeconds > 1 ? 's' : ''}`;
        }else if(timeUntilNextExecutionMillis > 0){
            timeUntilNextExecution = `${timeUntilNextExecutionMillis} milisegundo${timeUntilNextExecutionMillis > 1 ? 's' : ''}`;
        }else{
            timeUntilNextExecution = `Hace ${Math.abs(timeUntilNextExecutionSeconds)} segundos`;
        }

        const cronObject  = {
            source: cronString,
            next: nextInterval.toISOString(),
            timeUntilNextExecution
        };

        return cronObject;
    } catch (error) {
        console.error('Error al analizar la cadena cron:', error.message);
        return {}
    }

}
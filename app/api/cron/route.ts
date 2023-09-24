import {NextResponse} from "next/server";
import {createCron} from "../../utils/db";
export const POST = async (request) => {
    const {cron} = await request.json();
    let createdCron = await createCron(cron);
    return NextResponse.json({
        data: createdCron,
    });
}


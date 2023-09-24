import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import EditCronForm from "@/components/crons/edit.form";
import {getCron} from "@/app/utils/db";
export const metadata: Metadata = {
    title: "Form Layout Page ",
    description: "This is Form Layout page for CronAdmin Next.js",
    // other metadata
};

const FormLayout = async ({params}) => {
    const cron = await getCron(params.id);
    console.log(cron)
    // @ts-ignore
    return (
        <>
            <Breadcrumb className="flex row  m-auto justify-center " pageName="Crons / Create"></Breadcrumb>
            <EditCronForm cron={cron}></EditCronForm>
        </>
    );
};

export default FormLayout;

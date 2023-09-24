import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import CreateCronForm from "@/components/crons/create.form";
export const metadata: Metadata = {
    title: "Form Layout Page ",
    description: "This is Form Layout page for CronAdmin Next.js",
    // other metadata
};

const FormLayout = () => {

    // @ts-ignore
    return (
        <>
            <Breadcrumb className="flex row  m-auto justify-center " pageName="Crons / Create"></Breadcrumb>
            <CreateCronForm></CreateCronForm>
        </>
    );
};

export default FormLayout;

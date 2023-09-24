'use client'
import {sendCron} from "@/app/utils/cron.api";
import {useState} from "react";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
const EditCronForm = ({cron}) => {
    const [name, setName] = useState(cron.name);
    const [url, setUrl] = useState(cron.url);
    const [cronString, setCronString] = useState(cron.cron);
    const [isLoading, setIsLoading] = useState(false);
    const [isEnabled, setIsEnabled] = useState(cron.enabled);
    const [cooldownperiod, setCooldownperiod] = useState(cron.cooldown_period || 5);
    const [payload, setPayload] = useState(cron.payload || '');
    const handleSendForm =  (e) => {
        e.preventDefault();
        setName('');

        setIsLoading(true);
        sendCron({
            name,
            url,
            cronString
        }).subscribe({
            next: data => {
                setIsLoading(false);
            },
            error: (error) => {
                setIsLoading(false);
                console.log(error);
            }
        });
    }

    // @ts-ignore
    return (
        <>
            <div className="flex row w-full">
                <div className="flex m-auto w-full">

                    {/* <!-- Contact Form --> */}
                    <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Edit Cron
                            </h3>
                        </div>
                        <form action="#">
                            <div className="p-6.5">
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Cron Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your Cron Name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Url to use
                                    </label>
                                    <input
                                        type="text"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="Enter the Url"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Cron String
                                    </label>
                                    <input
                                        type="text"
                                        value={cronString}
                                        onChange={(e) => setCronString(e.target.value)}
                                        placeholder="Enter the crontab string"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Cool Down Period
                                    </label>
                                    <input
                                        type="number"
                                        value={cooldownperiod}
                                        onChange={(e) => setCooldownperiod(e.target.value)}
                                        placeholder="Enter the Cool Down Period number"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Cron Payload
                                    </label>
                                    <textarea
                                        value={payload}
                                        onChange={(e) => setPayload(e.target.value)}
                                        rows={6}
                                        placeholder="Insert a payload to send with the cron"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    ></textarea>
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Enabled
                                    </label>
                                    <SwitcherThree value={isEnabled} onChangeValue={setIsEnabled}></SwitcherThree>
                                </div>

                                <button
                                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                                    onClick={handleSendForm}
                                >
                                    Create Cron
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditCronForm;

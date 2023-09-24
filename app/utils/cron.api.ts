
import { Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError, delay } from 'rxjs/operators';

const createUrl = (path: string) => {
    return (window?.location.origin || "http://localhost:3001") + path;
}
export const sendCron = (cron:any) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    return fromFetch(createUrl("/api/cron"),  {
        method: 'POST',
        headers: myHeaders,
        body:  JSON.stringify({cron}),
    }).pipe(delay(1000)).pipe(
        switchMap((res) => {
            if(!res.ok){
                throw new Error(res.statusText);
            }
            return res.json();
        }),
        catchError((err) => {
            console.error(err);
            throw new Error(err);
        })
    )

}

export const runCron = (cron:any) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    return fromFetch(createUrl(`/api/cron/execute/${cron._id}`),  {
        method: 'POST',
        headers: myHeaders,
        body:  JSON.stringify({cron}),
    }).pipe(delay(1000)).pipe(
        switchMap((res) => {
            if(!res.ok){
                throw new Error(res.statusText);
            }
            return res.json();
        }),
        catchError((err) => {
            console.error(err);
            throw new Error(err);
        })
    )
}


export const runCrons = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    return fromFetch(createUrl(`/api/cron/execute`),  {
        method: 'POST',
        headers: myHeaders,
        body:  JSON.stringify({}),
    }).pipe(delay(1000)).pipe(
        switchMap((res) => {
            if(!res.ok){
                throw new Error(res.statusText);
            }
            return res.json();
        }),
        catchError((err) => {
            console.error(err);
            throw new Error(err);
        })
    )
}

export const stopOrRestartCron = (id) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    return fromFetch(createUrl(`/api/cron/${id}`),  {
        method: 'PUT',
        headers: myHeaders,
        body:  JSON.stringify({}),
    }).pipe(delay(1000)).pipe(
        switchMap((res) => {
            if(!res.ok){
                throw new Error(res.statusText);
            }
            return res.json();
        }),
        catchError((err) => {
            console.error(err);
            throw new Error(err);
        })
    )
}




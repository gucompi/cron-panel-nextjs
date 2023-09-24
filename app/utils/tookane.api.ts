export const callProcess = async (url:string,method:string) => {
    try{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "y$B&E)H@MbQeThWmZq4t7w!z%C*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeShVkYp3s");

        let res = await fetch(`${process.env.API_HOST}/${sanitize(url)}`, {
            method,
            headers: myHeaders
        });
        const json =  await res.json();
        return json;
    }catch(e){
        console.log(e);
    }
}
const sanitize = (url:string) => {
    //if starts with / remove it
    return url.replace(/^\//,"");
}
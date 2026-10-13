
export async function getData(source)
{
    
    try
    {
        const res = await fetch(source);

        if(!res.ok)
        {
            const data = res.json()
        }

            const data = await res.json();
            console.log(data)
            // throw(
            //     {status: `Status: ${data.status}`},
            //     {error: `Server Error: ${data.message}`}
            // )
            // console.log(data)
            return(data);
    }

        catch(err) {
            console.log(`Error Status: ${err.status}`, `Server Message: ${err.message}`)
        }


}


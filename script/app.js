// let allBtn = document.getElementById

// All Issue Feact Link

let allIssue = async ()=>{
    let url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'

    let res = await fetch(url);
    let data = await res.json();
     
    console.log(data);
}

allIssue()


// Show Issue Into Container

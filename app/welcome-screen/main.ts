import listEndpoints from "express-list-endpoints"

class Main{
    html

    constructor(_app: any){
        console.log(listEndpoints(_app)) 
        let endpoints = ''
        listEndpoints(_app).reverse().forEach(el =>{
            endpoints += `
                <div class="endpoint-box endpoint-${el.methods[0]}">
                    <div class="methods methods-${el.methods[0]}">${el.methods[0]}</div>
                    <div class="path">${el.path}</div>
                </div>
            `
        })

        this.html =  `<!DOCTYPE html>
            <html>
            <head>
            <title>Defaul API</title>
            </head>
            <body>
            
            <h1>Tryknex API</h1>
            <h4>These are the current endpoints<h4>
            ${endpoints}
            
            </body>
            <style>
                html{
                    font-family: sans-serif;
                    background-color: rgb(109 109 109 / 12%);
                    color: #4c4c4c;
                }
                .endpoint-box{
                    display: flex;
                    box-shadow: 1px 1px 1px rgb(0 0 0 / 30%);
                    margin-bottom: 12px;
                    background-color: white;
                    height: 34px;
                }
                .endpoint-POST{}
                .endpoint-PUT{}
                .endpoint-GET{}
                .endpoint-DELETE{}
                .methods{
                    width: 80px;
                    text-align: center;
                    color: white;
                    padding: 4px 10px;
                    margin-right: 4px;
                    font-size: 13px;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .methods-POST{
                    background-color: #00b344 !important;
                }
                .methods-PUT{
                    background-color: ORANGE !important;
                }
                .methods-GET{
                    background-color: #0083ff !important;
                }
                .methods-DELETE{
                    background-color: #c30b0b !important;
                }
                .path{
                    display: flex;
                    align-items: center;
                    color: rgb(47 47 47 / 80%);
                    font-size: 15px;
                    font-weight: 200;
                    margin-left: 8px;
                    letter-spacing: 0.5px;
                }
            </style>
            </html>`  
    }
}

export default Main


    
        
// export default htmlScreen

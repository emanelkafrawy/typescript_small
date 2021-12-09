import dotenv from 'dotenv'
dotenv.config();

import app from './app';
import './DB';

function main(){
    app.listen(app.get('port'), ()=>{
        console.log('server running at port', app.get('port'));
        
    })
}

main();
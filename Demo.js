//Modules
const fs = require('fs');
fs.writeFile('./sample.txt', 'Testing FS Module',(err)=>{
    return
}
console.log("File Created Succesfully!")
})

fs.readFile('./sample.txt','utf8',(err,data)=>{if(err){
    console.log("Err occured!")
    return
}
    console.log('Data in file:',data);
})
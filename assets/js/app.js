
var pc = 300;
var ac;

var memory = {
    300: 1940,
    301: 5941,
    302: 2941,
    940: 0000,
    941: 0000
}
var cpuRegisters = {
    "pc": 300,
    "ac": 0,
    "IR": 1940
}

function enterData() {
    var memoryDataOne = document.getElementById("memoryDataOne").value
    var memoryDataTwo = document.getElementById("memoryDataTwo").value
    if(isNaN(memoryDataOne)){
        document.getElementById("memoryDataOne").value = ''
        alert("Input only accepts a number")
    }
    else if(isNaN(memoryDataTwo)){
        var memoryDataTwo = document.getElementById("memoryDataTwo").value = ''
        alert("Input only accepts a number")
    }
    
    else{
        memory[940] = memoryDataOne;
        memory[941] = memoryDataTwo;
        document.getElementById("memoryDataOne").value = ''
        document.getElementById("memoryDataTwo").value = ''
        document.getElementById('question').innerHTML = ''
        document.getElementById('loading-container').innerHTML ='<div class="loader" style="padding:50px"><h1>Loading To Ac</h1></div>'
        reloadUi();
        events();
    }
    

}
function loadAcFromMemory() {
    document.getElementById('loading-container').innerHTML ='<div class="loader" style="padding:50px" ><h1>Store and Add To Ac</h1></div>'
    console.log("\n\n\n\nLoading Ac From memory 0001 \n");
    cpuRegisters.pc++;
    console.log(`Program counter is ${cpuRegisters.pc}`);
    cpuRegisters.ac = memory[940];
    console.log(`Accumulator  is ${cpuRegisters.ac}`);
    cpuRegisters.IR = memory[301];
    console.log(`Instruction Register is ${cpuRegisters.IR}`);
    reloadUi();

}


function storeAcFromMemory() {
    console.log("\n\n\n\n StoringAc to memory\n");
    console.log(`Memory at address 941 ${memory[941]}`);
    cpuRegisters.pc++;
    console.log(`Program counter is ${cpuRegisters.pc}`)
    console.log(`Accumulator  is ${cpuRegisters.ac}`);
    cpuRegisters.IR = `${storeAcFromMemoryOpCode}941`
    console.log(`Instruction Register is ${cpuRegisters.IR}`);
    memory[941] += memory[940];
    console.log(`Memory at address 941 ${memory[941]}`);

}

function addToAcFromMemory() {
    console.log("\n\n\n\n Adding Ac to memory\n");
    cpuRegisters.pc++;
    console.log(`Program counter is ${cpuRegisters.pc}`);
    console.log(`Accumulator  is ${cpuRegisters.ac}`);
    cpuRegisters.IR = `${memory.storeAcFromMemory}`;
    console.log(`Instruction Register is ${cpuRegisters.IR}`);

}
function storeandAddFromMemory() {
    document.getElementById('loading-container').innerHTML ='<h1>Process finished</h1>'

    console.log("\n\n\n\n Adding and Storing Ac to memory\n");
    cpuRegisters.pc++;
    console.log(`Program counter is ${cpuRegisters.pc}`);
    cpuRegisters.ac = parseInt(memory[941])+parseInt(memory[940]);

    memory[941] = parseInt(memory[941])+parseInt(memory[940]);
    console.log(`Accumulator  is ${cpuRegisters.ac}`);
    cpuRegisters.IR = memory[302];
    console.log(`Instruction Register is ${cpuRegisters.IR}`);
    reloadUi();

}


function reloadUi() {
    document.getElementById('memory-data').innerHTML = ``
    document.getElementById('cpu-data').innerHTML = ''
    for (const memoryData   in memory) {

        document.getElementById('memory-data').innerHTML += `<br> Adress &nbsp;${memoryData} - >>    ${memory[memoryData]} `
       
    }
    for (const register in cpuRegisters) {
        document.getElementById('cpu-data').innerHTML += `<br>Name &nbsp;  ${register}  -->${cpuRegisters[register]}`;
    }
}

function events() {
    setTimeout(() => {
        loadAcFromMemory();
        setTimeout(() => {
            storeandAddFromMemory();
        }, 4000);
    }, 5000);
    
}

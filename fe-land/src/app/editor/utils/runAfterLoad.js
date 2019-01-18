
window.addEventListener('load',function load(){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    runAfterLoad.run();
},false);

export const runAfterLoad = {
    list : [],
    add : function(oFunction, oArgumentsInArray){
        let toList = {
            fn: oFunction,
            arg: oArgumentsInArray
        };
        runAfterLoad.list.push(toList);
    },
    run : function(){
        runAfterLoad.list.map(item =>
        {
            item.fn.apply(this, item.arg);
            console.log( 'RUN AFTER LOAD: '+ item.fn.name + '()');
        })
    }
};
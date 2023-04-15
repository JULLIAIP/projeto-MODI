export class Transaction {
    constructor(
        private value : number, 
        private description : string, 
        private date: string  = new Date().toString()
    ) {
        
    }

    getValue = ()=>this.value
    getDescription = ()=>this.description
    getDate = ()=>this.date  
}
interface Place {
    /* called by one "positive" Visit */
    function notifyRisk();
    
    function visit(DateTime) returns(Visit);
    
    function clean();
}

contract Place is Place {
    private Visit[] visits;
    
    constructor() public {
        visits = new Visit[];
    } 
    
    function notifyRisk() {
        Visit infectedVisit = msg.sender;
        
        for (uint i = 0; i < visits.length; i ++) {
            Visit visit = visits[i];
            if (visit.dateTime.closeTo(infectedVisit.dateTime)) {
                visit.notifyRisk();
            }
        }
    }
    
    // isOwned
    function visit(DateTime dateTime, address user) {
        Visit visit = new Visit(dateTime, user);
        visits.push(visit);
        returns visit;
    }
    
    // isOwned
    function clean() {
        
    }
}

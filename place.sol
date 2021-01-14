interface Place {
    /* called by one "positive" Visit */
    function notifyRisk() external view;
    
    function visit(DateTime) external view returns(Visit);
    
    function clean() external view;
}

contract Place is Place {
    Visit[] visits;
    
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
    
    function visit(DateTime dateTime) external view {
        Visit visit = new Visit(dateTime, msg.sender);
        visits.push(visit);
        returns visit;
    }
    
    function clean() external view {
        
    }
}

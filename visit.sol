interface Visit {
    /* called by the User App */
    function recordPositiveTest(NHSCredentials) external view;
    
    /* called only by the corresponding Place */
    function notifyRisk(Place) external view;
}

contract Visit is Visit {
    public bool riskState;
    public address place;
    public address user;
    public DateTime dateTime;
   
    constructor(DateTime _dateTime, address _user) public {
        dateTime = _dateTime;
        user = _user;
        place = msg.sender;
    }
   
    function recordPositiveTest(NHSCredentials nhsCredentials) external view{
        // something with isOwned by the user
        if (nhsCredentials.verify(user)) {
            riskState = true;
            place.notifyRisk();
        }
    }
   
    function notifyRisk() external {
        // msg.sender should == place
        // something with isOwned by the place
        riskState = true;
    }
}

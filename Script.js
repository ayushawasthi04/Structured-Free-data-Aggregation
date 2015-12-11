TIMEOUT(60000);
allm = sim.getMotes();

var ref = ["Hello", "Bye", "hi", "destroy"];
var last = [];
var ctr = 0;
var arr = [];
var range = [26, 25, 28, 30, 27];
var count = allm.length;

var s_time = [];
var e_time = [];
var summ = [];
var count_elem = [];
while(count > 0) {
    if (msg.contains("Starting") ) {
        log.log("New Mote Found \n");
        arr[id-1] = mote;
        log.log ("Nodes " + id + "at : " + arr[id-1].getInterfaces().getPosition().getXCoordinate() + " , " + arr[id-1].getInterfaces().getPosition().getYCoordinate() + "\n" );
	msg = "Co-ord at : " + arr[id-1].getInterfaces().getPosition().getXCoordinate() + " " + arr[id-1].getInterfaces().getPosition().getYCoordinate();
        write(mote,msg);
	count = count - 1;
     }
	YIELD();
} 
log.log("******\n");
for ( var i = 0; i < allm.length; i++ ) {
	log.log ("Nodes " + i+1 + "at : " + arr[i].getInterfaces().getPosition().getXCoordinate() + " , " + arr[i].getInterfaces().getPosition().getYCoordinate() + "\n" );
	
}
log.log("******\n");
var cc = 9;


while(cc > 0) { 
	var refer_msg = msg;
	cc  = cc -1;
	var x_size = 100;

	var y_size = 100;	
	var k = Math.floor((Math.random()* ref.length));
	var radius = range[Math.floor((Math.random()* range.length))];
	
	var refer_msg = msg;
	if (refer_msg.contains("Sink got message")) {
		var p = refer_msg.split("'");
		var f = p[1];
		var res = f.split(":");
		log.log ("Event Id : " + res[0] + "\n" );
		var pos = Number(res[0]);
		var cur_date = new Date();
		e_time[pos] = 	time;
		summ[pos] = summ[pos] + e_time[pos];
		count_elem[pos] = count_elem[pos] + 1;
		for ( var u = 0 ; u < ctr ; u++) {
			  log.log("Eid : " + u + " :  ST -> " + s_time[u] + " ET -> " + e_time[u] + " " + summ[u] + " " + count_elem[u] + " \n");
		} 			
	}

	msg = ctr + ":" + ref[k]; // generating a message
	

	var p = 5000000;
	while (p > 0 ) {
		p = p -1;
	}
	var flag = 0;
	//WAIT_UNTIL (msg.equals(ref[k]));
	var x = Math.floor((Math.random() * x_size));
	var y = Math.floor((Math.random() * y_size));
    var cur_date = new Date();
	log.log("Event : " + msg + " was generated on " + time +" at ( "+ x + " , " + y + " ) \n");
	s_time[ctr] = time;  // stores the start time
	summ[ctr] = 0;
	count_elem[ctr] = 0;
    ctr ++;
	for (var i = 0 ; i < allm.length; i++) {
		mote = arr[i];
		var d_x = mote.getInterfaces().getPosition().getXCoordinate();
		var d_y = mote.getInterfaces().getPosition().getYCoordinate();
		var dist = Math.sqrt( (d_x - x)* (d_x - x) + (d_y - y) * (d_y - y) );
		if ( dist <= radius) {
			write (mote, msg);
			log.log("Event : " + msg + " with radius : " + radius + " sensed by mote Number : " + i + "'\n");
			flag = 1;
		}
	}
	if (flag == 0) {
		log.log("Event : " + msg + " with radius : " + radius + " was out of range from sensors'\n");
	}
	YIELD();
}

while(1 > 0) {
	var refer_msg = msg;
	if (refer_msg.contains("Sink got message")) {
		var p = refer_msg.split("'");
		var f = p[1];
		var res = f.split(":");
		var pos = Number(res[0]);
		var cur_date = new Date();
		e_time[pos] = 	time; 
		summ[pos] = summ[pos] + time;
		count_elem[pos] = count_elem[pos] + 1 ;
		for ( var u = 0 ; u < ctr ; u++) {
			  log.log("Eid : " + u + " " + s_time[u] + " " + e_time[u] + "  " + summ[u] + " " + count_elem[u] + " \n");
				
		} 			
	}
	YIELD();
}

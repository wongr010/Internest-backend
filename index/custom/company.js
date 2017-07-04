var candidatesshown=false;
var isemployer=false;


function checkmeet() {
    var x = document.getElementById("myCheck");
    x.checked = true;
}

function showcandidates(){ /*Candidate match*/

	if (!candidatesshown){
		document.getElementById("show-candidates").innerHTML = "View top candidates";
	 $("#hidden-candidate").removeClass("hidden");
	 candidatesshown=true;
	}

	else{
		document.getElementById("show-candidates").innerHTML = "View all Candidates";
		$("#hidden-candidate").addClass("hidden");
		candidatesshown=false;
	}

}

function interview_confirmed(){

	alert("Interviews confirmed!");

}

function deactivatejobs(jobno){ /*Taking down uploaded jobs*/
	confirm("Are you sure you want to deactive job no. "+ jobno + "?");
}

function toggleposition(prev_page){ /*Dynamically change which sign-up page to redirect to*/
	if (!isemployer) {
		isemployer=true;
		if(prev_page=='newuser'){
			document.getElementById("newuser-toggle").href="registration.html";
		}
		else document.getElementById("user-toggle").href="companydash.html";
	}
	else {
		isemployer=false;
		if (prev_page=='newuser'){
			document.getElementById("newuser-toggle").href="studentreg.html";
		}
		else document.getElementById("user-toggle").href="student dashboard.html";
	}
	

}

function reset(){
	isemployer=false;
}


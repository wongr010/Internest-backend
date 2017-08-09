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

function checkPass(){
	var pass1=document.getElementById("passwd1");
	var pass2=document.getElementById("passwd2");
	var message=document.getElementById('confirmation');

	var green="#66cc66";
	var red="#ff6666";

	if (pass1.value!=pass2.value){
		pass2.style.backgroundColor=red;
		message.style.color=red;
		message.innerHTML="Passwords do not match!"
		$("#submission").addClass("disabled");
	}
	else{
		pass2.style.backgroundColor=green;
		message.style.color=green;
		message.innerHTML="Passwords match"
		$("#submission").removeClass("disabled");
	}
	//alert(document.getElementById("passwd1").value);
	//alert(document.getElementById("passwd2").value);
}


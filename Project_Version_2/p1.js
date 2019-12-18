function getRandom() {
	return (Math.floor(Math.random() * 26));
}

var nunmberOfLetters = document.getElementById('text');
var botn = document.getElementById('btn');

var letters = Array("A", "B", "C", "D", "E", "F", "G", "H", "I",
	"J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
	"W", "X", "Y", "Z");

var ButtonHolder = document.getElementById("div");
// function templete to store in the localStorage
function storage(name, type, target, time) {
	this.type = type;
	this.target = target;
	this.time = time;
	this.name = name;
	// this.add=function()
	// {
	// var Prev_Event=localStorage.getItem(name);
	// if(Prev_Event==null)
	// 	{
	// 	var a=this.name;
	// 	if(a==".Load" || a==".Unload" || a==".Generate")
	// 		{
	// 			localStorage.setItem(name,this.type+"&"+this.time);
	// 		}
	// 		else
	// 		{
	// 			localStorage.setItem(name,this.type+"&"+this.target+"&"+this.time);
	// 		}
	// 	}
	// 	else
	// 	{
	// 		var a=this.name;
	// 		if(a==".Load" || a==".Unload" || a==".Generate")
	// 		{
	// 			localStorage.setItem(name , Prev_Event+" and "+this.type+"&"+this.time);
	// 		}
	// 		else
	// 		{
	// 			localStorage.setItem(name , Prev_Event+" and "+ this.type+"&"+this.target+"&"+this.time);
	// 		}
	// 	}
	// }
	this.Add_Event = function ()
	{
		// get the Old event if exists
		var Prev_Event = localStorage.getItem(name);
		// check if the Event stored before or not
		if (Prev_Event == null) {

			localStorage.setItem(name, this.type + "///" + this.target + "///" + this.time);
		}
		else {
			localStorage.setItem(name, Prev_Event + "&" + this.type + "///" + this.target + "///" + this.time);
		}
	}
}

var temp;
// The event in the generate button
botn.onclick = function (e) {
	var arr = [];
	//freeing the div of the buttons in  every generation
	ButtonHolder.textContent = "";
	if(nunmberOfLetters.value !='')
	{
		if (nunmberOfLetters.value <= 26 && nunmberOfLetters.value > 0) 
		{
			for (var i = 0; i < nunmberOfLetters.value; i++) 
			{
				temp = getRandom();
				// No repeating in letters
				while (arr.indexOf(temp) != -1) 
				{
					temp = getRandom();
				}
				arr[i] = temp;
			}
			// Generating the New Buttons
			for (var i = 0; i < nunmberOfLetters.value; i++) 
			{
				var q = document.createElement("button");
				var v = document.createTextNode(letters[arr[i]]);
				q.appendChild(v);
				ButtonHolder.appendChild(q);
				// LocalStorge Storing
				// localStorage[letters[arr[i]]+" created"]=new Date();
				// e.target is letters[arr[i]]
				////////////////////  name  ////////////////  type  /// target   ///// time
				var s = new storage(letters[arr[i]] + " created", "Create", letters[arr[i]], new Date());
				s.Add_Event();
			}
		}
		else
		{
			alert("you should enter a number from 1 to 26");
		}
	}
	else
	{
		alert("please, Insert a number between 1 and 26")
	}
	// localStorage[e.target.textContent]=new Date();
	var s = new storage(".Generate", e.type, e.target.value, new Date());
	s.Add_Event();
};

// Generating the Image
ButtonHolder.addEventListener("click", function (e) {
	var photo = document.getElementsByTagName("img")[0];
	photo.src = e.target.textContent + ".gif";
	photo.setAttribute("style", "width:300px; height:300px; margin:35px ;");
	// localStorage[e.target.textContent+" "+e.type]=new Date();
	var s = new storage("_" + e.target.textContent + " Clicked", e.type, e.target.textContent, new Date());
	s.Add_Event();
});

// LocalStorge Storing
window.addEventListener("load", function (e) {

	// localStorage["load"]=new Date();
	var s = new storage(".Load", e.type, "Load", new Date());
	//var s=new storage(".Load",e.type,e.target,new Date());
	s.Add_Event();
});

// LocalStorge Storing
window.addEventListener("unload", function (e) {
	// localStorage["unload"]=new Date();
	var s = new storage(".Unload", e.type, "Unload", new Date());
	//var s=new storage(".Unload",e.type,e.target,new Date());
	s.Add_Event();
});

// sending data to the php page and it will send to the database
setInterval(function () {
	if (localStorage.length != 0) {
		var All_Events = [];
		for (var i = 0; i < localStorage.length; i++) {
			All_Events[i] = localStorage.getItem(localStorage.key(i));
		}

		$.ajax(
			{
				type: "POST",
				url: "test.php",
				data: { "objects": JSON.stringify(All_Events) },
				success: function (response) {
					console.log(response);
				},
				error: function () {
					console.log("Error Please check the AJAX(POST) Method");
				}
			});
		localStorage.clear();
	}
	else 
	{
		console.log("The localStorage is empty");
	}

}, 5000);

// button to get the data from the database
var restore_data = document.getElementById("retrive_data");
// restore data from the php page 
restore_data.onclick = function () {
	$.ajax(
		{
			type: "GET",
			url: "test.php",
			data: {"object":""},
			success: function (response) 
			{
				var The_Elements = document.getElementById("show");
				The_Elements.innerHTML = '';
				if (response == "There an error in retriving the data") 
				{
					The_Elements.innerHTML = "<b>There an error in retriving the data</b>";			
				}
				else 
				{
					var Back_Event = JSON.parse(response);
					for (var i = 0; i < Back_Event.length; i++) 
					{
						
						The_Elements.append("Type:	" + Back_Event[i].type + "	|	Target:	" + Back_Event[i].target + "	|	Time	" + Back_Event[i].time);
						The_Elements.innerHTML += "<br>";
						The_Elements.style.border = '2px dashed blue';
						// Viewing the data in a table
						// var table_row=document.createElement("tr");
						// var table_data1=document.createElement("td");
						// table_data1.style.border='2px dashed red';
						// var table_data2=document.createElement("td");
						// table_data2.style.border='2px dashed green';
						// var table_data3=document.createElement("td");
						// table_data3.style.border='2px dashed gold';
						// table_data1.append(Back_Event[i].type);
						// table_data2.append(Back_Event[i].target);
						// table_data3.append(Back_Event[i].time);
						// table_row.append(table_data1,table_data2,table_data3);
						// The_Elements.append(table_row);
					}
				}
			},
			error: function () {
				console.log("Error Please check the AJAX(GET) Method");
			}
		});
}
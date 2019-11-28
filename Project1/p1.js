function getRandom()
{
	return (Math.floor(Math.random()*26));
}
var nunmberOfLetters = document.getElementById('text');
var botn = document.getElementById('btn');

var letters = Array("A","B","C","D","E","F","G","H","I",
	"J","K","L","M","N","O","P","Q","R","S","T","U","V",
	"W","X","Y","Z");

var ButtonHolder = document.getElementById("div");
var temp;
// The event in the generate button
botn.onclick = function(e){
	if(nunmberOfLetters.value!="")
	{
	if(nunmberOfLetters.value<=26 && nunmberOfLetters.value>0)
	{
		var arr = [];
		//freeing the div of the buttons in  every generation
		ButtonHolder.textContent = "";
			for(var i = 0;i < nunmberOfLetters.value;i++)
			{
				temp = getRandom();
				// Check repeating in letters
				while(arr.indexOf(temp)!=-1)
					{
						temp=getRandom();
					}
				arr[i]=temp;
			}
			// Generating the New Buttons
			for(var i = 0;i < nunmberOfLetters.value;i++){   
				var q = document.createElement("button");
				var v = document.createTextNode(letters[arr[i]]);
				q.appendChild(v);
				ButtonHolder.appendChild(q);
				// LocalStorge Storing
				localStorage["Button "+letters[arr[i]]+" Clicked"]=new Date();
			}    
		
		localStorage[" Button "+e.target.value+" Clicked"]=new Date();
	}else{
		alert("You should enter number between 1 and 26");
	}
	}else{alert("Please enter a number in the empty Box");}
};
// Generating the Image
ButtonHolder.addEventListener("click",function(e){
	e.target.style.border="5px dashed white";
    var photo=document.getElementsByTagName("img")[0];
    photo.src=e.target.textContent+".gif";
    photo.setAttribute("style","width:300px; height:300px; margin:35px ;");
    localStorage["Image "+e.target.textContent+" Created"]=new Date();

	
	
});
// LocalStorge Storing
window.addEventListener("load",function(){
    
    localStorage["load"]=new Date();
});
// LocalStorge Storing
window.addEventListener("unload",function(){
    localStorage["unload"]=new Date();
});
// Cleacing the localStorage
setInterval(function(){localStorage.clear()},25000);

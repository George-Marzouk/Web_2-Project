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
    var arr = [];
	//freeing the div of the buttons in  every generation
    ButtonHolder.textContent = "";
    if(nunmberOfLetters.value <= 26 && nunmberOfLetters.value >0){
        for(var i = 0;i < nunmberOfLetters.value;i++)
		{
            temp = getRandom();
			// No repeating in letters
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
            localStorage[letters[arr[i]]+" created"]=new Date();
            
        }    
    }
    localStorage[e.target.textContent]=new Date();
};
// Generating the Image
ButtonHolder.addEventListener("click",function(e){
    var photo=document.getElementsByTagName("img")[0];
    photo.src=e.target.textContent+".gif";
    photo.setAttribute("style","width:300px; height:300px; margin:35px ;");
    localStorage[e.target.textContent+" "+e.type]=new Date();
    
    
});
// LocalStorge Storing
window.addEventListener("load",function(){
    
    localStorage["load"]=new Date();
});
// LocalStorge Storing
window.addEventListener("unload",function(){
    localStorage["unload"]=new Date();
});

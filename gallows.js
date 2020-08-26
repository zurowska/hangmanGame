var phraseToGuess=prompt('Podaj hasło, które będziemy za chwilę zgadywać', '');
phraseToGuess=phraseToGuess.toUpperCase();

var phraseLenght=phraseToGuess.length;
var wrongHit=0;
var sounds={
	success: new Audio("audio/success.wav"),
	fail: new Audio("audio/fail.wav")
};
var coveredLetters="";

for(i=0; i<phraseLenght; i++)
{
    if(phraseToGuess.charAt(i)==" ") 
    {
        coveredLetters=coveredLetters+" ";
    }
    else 
    {
        coveredLetters=coveredLetters+"-";
    }
}

function showPhrase()
{
    document.getElementById("board").innerHTML=coveredLetters;
}

window.onload=start;

var letters=new Array(35);

letters[0]="A";
letters[1]="Ą";
letters[2]="B";
letters[3]="C";
letters[4]="Ć";
letters[5]="D";
letters[6]="E";
letters[7]="Ę";
letters[8]="F";
letters[9]="G";
letters[10]="H";
letters[11]="I";
letters[12]="J";
letters[13]="K";
letters[14]="L";
letters[15]="Ł";
letters[16]="M";
letters[17]="N";
letters[18]="Ń";
letters[19]="O";
letters[20]="Ó";
letters[21]="P";
letters[22]="Q";
letters[23]="R";
letters[24]="S";
letters[25]="Ś";
letters[26]="T";
letters[27]="U";
letters[28]="V";
letters[29]="W";
letters[30]="X";
letters[31]="Y";
letters[32]="Z";
letters[33]="Ż";
letters[34]="Ź";


function start()
{
    var divContent="";
    
    for(i=0; i<=34; i++)
    {
        var element="lit"+i;
        divContent=divContent+'<div class="letter" onclick="check('+i+')" id="'+element+'">'+letters[i]+'</div>';
        
        if((i+1)%7==0) 
        {
            divContent=divContent+'<div style="clear:both;"></div>';
        }
    }
    
    document.getElementById("alphabet").innerHTML=divContent;
    
    
    showPhrase();
}

String.prototype.setSign=function(space, sign)
{
    if(space>this.length-1) 
    {
        return this.toString();
    }
    else 
    {
        return this.substr(0, space)+sign+this.substr(space+1);
    }
}

function check(nr)
{
   var hit=false;
   
   for(i=0; i<phraseLenght; i++)
   {
       if(phraseToGuess.charAt(i)==letters[nr])
       {
           coveredLetters=coveredLetters.setSign(i, letters[nr]);
           hit=true;
       }
   }
   
   if(hit==true)
   {
       sounds.success.play();
       var element="lit"+nr;
       
       document.getElementById(element).classList.add("success");
       
       showPhrase();
   }

   else 
   {
       sounds.fail.play();
       var element="lit"+nr;
       
		document.getElementById(element).classList.add("fail");	
		document.getElementById(element).setAttribute("onclick",";");
		
		//wrong
		wrongHit++;
		var image="img/s"+wrongHit+".jpg";
		document.getElementById("gallows").innerHTML='<img src="'+image+'"alt=""/>';
   }
   
   //win
   if(phraseToGuess==coveredLetters)
   {
       document.getElementById("alphabet").innerHTML="Tak jest! To prawidłowe hasło: "+phraseToGuess+'</br></br> <span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
   }
   
    //lost
    if(wrongHit>=9)
    {
       document.getElementById("alphabet").innerHTML="Przegrana! Prawidłowe hasło: "+phraseToGuess+'</br></br> <span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>'; 
    }
    
}








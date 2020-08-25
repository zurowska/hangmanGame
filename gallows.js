var word=prompt('Podaj hasło, które będziemy za chwilę zgadywać', '');
word=word.toUpperCase();

var len=word.length;
var wrong=0;

var yes=new Audio("sounds/yes.wav");
var no=new Audio("sounds/no.wav");

var word1="";

for(i=0; i<len; i++)
{
    if(word.charAt(i)==" ") word1=word1+" ";
    else word1=word1+"-";
}

function show_word()
{
    document.getElementById("board").innerHTML=word1;
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
    var div_content="";
    
    for(i=0; i<=34; i++)
    {
        var element="lit"+i;
        div_content=div_content+'<div class="letter" onclick="check('+i+')" id="'+element+'">'+letters[i]+'</div>';
        if((i+1)%7==0) div_content=div_content+'<div style="clear:both;"></div>';
    }
    
    document.getElementById("alphabet").innerHTML=div_content;
    
    
    show_word();
}

String.prototype.setSign=function(space, sign)
{
    if(space>this.length-1) return this.toString();
    else return this.substr(0, space)+sign+this.substr(space+1);
}

function check(nr)
{
   var hit=false;
   
   for(i=0; i<len; i++)
   {
       if(word.charAt(i)==letters[nr])
       {
           word1=word1.setSign(i, letters[nr]);
           hit=true;
       }
   }
   
   if(hit==true)
   {
       yes.play();
       var element="lit"+nr;
       
       document.getElementById(element).style.background="#6e625c";
       document.getElementById(element).style.color="#276b29";
       document.getElementById(element).style.border="3px solid #276b29";
       document.getElementById(element).style.cursor="default";
       
       show_word();
   }

   else 
   {
       no.play();
       var element="lit"+nr;
       
		document.getElementById(element).style.background="#6e625c";
		document.getElementById(element).style.color="#912e2a";
		document.getElementById(element).style.border="3px solid #912e2a";
		document.getElementById(element).style.cursor="default";	
		document.getElementById(element).setAttribute("onclick",";");
		
		//wrong
		wrong++;
		var image="img/s"+wrong+".jpg";
		document.getElementById("gallows").innerHTML='<img src="'+image+'"alt=""/>';
   }
   
   //win
   if(word==word1)
   document.getElementById("alphabet").innerHTML="Tak jest! To prawidłowe hasło: "+word+'</br></br> <span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
    
    //lost
    if(wrong>=9)
    document.getElementById("alphabet").innerHTML="Przegrana! Prawidłowe hasło: "+word+'</br></br> <span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
}








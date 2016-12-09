var expression='';
var redo=0;

function setExpression(exp){
	document.getElementById("expressionArea").value=exp;
}

function getValue(obj){
	if(redo==1){
		clearAll();
		clearErrorMessage();
		redo=0;
	}
	expression += obj.value;
	setExpression(expression);
}
function backSpace(){
	if(redo==1){
		clearAll();
		clearErrorMessage();
		redo=0;
		return;
	}
	expression = expression.substring(0,expression.length-1);	
	setExpression(expression);
}
function clearAll(){
	redo=0;
	expression="";
	setExpression(expression);
	clearErrorMessage();
}
function showResult(obj){
	if(redo==1){
		clearAll();
		redo=0;
		return;
	}
	if(checkMultiOperator(expression)&&checkFloat(expression)){
		try{
			var res=eval(expression);
			if(typeof(res)=="undefined"){
				clearAll();
				redo=0;
				return;
			}
			if(res=="Infinity"){
				redo=1;
				showErrorMessage("0不能做除数！");
				return;
			}
			getValue(obj);
			expression=expression+'\n'+res;
			setExpression(expression);
			redo=1;
		}
		catch(exception){
			redo=1;
			showErrorMessage("输入的表达式不符合规范！");
		}
	}
	else{
		redo=1;
		showErrorMessage("输入的表达式不符合规范！");
	}
}

function showErrorMessage(str){
	document.getElementById('errorMessage').textContent = str;
}

function clearErrorMessage(){
	document.getElementById('errorMessage').textContent = "";
}

function checkMultiOperator(expression) {  
        /** 
         * ([\+\-\*\/][\+\*\/]+) [+,*,-,/]搭配一个或是多个[+,*,/] 
         * ([\*\/](\-)+) [*,/]搭配一个或是多个[-] 
         * ([\+\-](\-){2,}) [+,-]搭配两个以上的[-] 
         * @type RegExp 
         */  
      var reg = /([\+\-\*\/][\+\*\/]+)|([\*\/](\-)+)|([\+\-](\-){2,})/;    
      if(reg.test(expression)) {  
          return false;  
      }  
      return true;  
}
function checkFloat(expression) {  
        /** 
         * (^\.)|(\.$) expression以.开头或结尾 
         * ([\+\-\*\/]\.)|(\.[\+\-\*\/]) expression出现".+","+."等情况 
         * ((\d+\.+)+\d*) expression出现"2.2.3.4.5","..","..."等情况 
         */  
        var reg = /(^\.)|(\.$)|([\+\-\*\/]\.)|(\.[\+\-\*\/])|((\d+\.+){2,}\d*)/;  
        if (reg.test(expression)) {  
            return false;  
        }  
        return true;  
} 

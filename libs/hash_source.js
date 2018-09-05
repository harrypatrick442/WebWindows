var HashSource=new (function(){
	var hash=0;
    this.getNew=function(){return hash++;};
})();
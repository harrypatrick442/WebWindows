var HashMap=new (function(){
    var hashes = {};
	var construct = function(){
		this.put=function(obj, value ) {
			if(!obj.hash){
				obj.hash = HashSource.getNew();
			}
			hashes[ obj.hash ] = value;
		};

		this.get=function( obj ) {
			return hashes[ obj.hash ];
		};
	}
	return construct;
})();
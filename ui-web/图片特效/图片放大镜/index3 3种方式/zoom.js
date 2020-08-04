!function(w,d){
	function Z(){
		this.len = 1;
		this.dom = d.querySelectorAll(arguments[0][0]);
		if(arguments[0][1]){
			this.len = this.dom.length;
		};
	};
	Z.prototype = {
		init : function(o){
			if(!this.dom[0]){alert('Error：not find this dom');return}
			this.type =o>3 ? 0 : ( o ? o : 0);
			this.load();
		},
		load : function(){
			var _t = this;
			for(var i=0;i<_t.len;i++){
				_t.dom[i].off = false;
				_t.dom[i].onmousemove = _t.dom[i].ontouchmove = function(ev){
					var e = ev || event;
					var dom = this;
					if(this.querySelector('.imgLoad')){return false};
					if(!this.off){
						var img = this.querySelector('.zoom-img');
						if(!img){alert('error not find class "zoom-img"');return}
						var _lo = d.createElement('span');
						_lo.innerHTML = '加载中...';
						_lo.className = 'imgLoad';
						this.appendChild(_lo);
						//创建图片
						var _img = new Image();
						_img.onload = function(){
							if(_t.type==2){
								dom.cz = d.createElement('div');
								dom.cz.className = 'cloudZoom';
								dom.cz.style.background = 'url('+ img.getAttribute('src') +')  no-repeat';
								dom.appendChild(dom.cz);
							};
							dom.w1 = this.width,dom.h1 = this.height;
							dom.w2 = img.width,dom.h2 = img.height;
							dom.scale = _t.type>= 1 ? (dom.w1 - dom.w2)/dom.w2 : dom.w1/dom.w2;
							dom.removeChild(_lo);
							dom.off = true;
							dom.zoom = d.createElement('div');
							dom.zoom.className = _t.type==2 ? 'imgZoom3' :  (_t.type== 1 ? 'imgZoom2':  'imgZoom');
							dom.zoom.style.background =_t.type<=1 ? 'url('+ img.getAttribute('src') +')  no-repeat' : ''
							dom.appendChild(dom.zoom);
						};
						_img.src = img.src;
					}else{
						var l = _t._gt(dom).left;
						var t = _t._gt(dom).top;
						this.zoom.style.display = 'block';
						if(_t.type==2){
							this.cz.style.display = 'block';
						};
						var top = document.documentElement.scrollTop || document.body.scrollTop ;
						var _bor =_t.type== 1 ? 0 : (this.zoom.offsetWidth - this.zoom.clientWidth)/2;
						var _zw = _t.type== 1 ? 0 : this.zoom.offsetWidth/2;
						var _zh = _t.type== 1 ? 0 : this.zoom.offsetHeight/2;
						var l1 = (e.clientX) - l -(_t.type== 2 ? 0 : _zw);
						var t1 = (e.clientY+top) - t -(_t.type== 2 ? 0 : _zw);
						if(_t.type == 0 || _t.type == 2){
							if(l1+(_t.type== 2 ? 0 : _zw)<=(_t.type== 2 ? _zw : 0)){
								l1 =(_t.type== 2 ? _zw : -_zw);
							}else if(l1+_zw>=this.w2){
								l1=this.w2-_zw;
							};
							if(t1+(_t.type== 2 ? 0 : _zw)<=(_t.type== 2 ? _zw : 0)){
								t1 =(_t.type== 2 ? _zw : -_zw);
							}else if(t1+_zw>=this.h2){
								t1=this.h2-_zw;
							};
							this.zoom.style.left = (_t.type == 2 ? (l1-_zw) : l1)+'px';
							this.zoom.style.top = (_t.type == 2 ? (t1-_zw) : t1)+'px';
						};
						if(_t.type==2){
							var px  = (l1 - _zw) /(this.w2 -  this.zoom.offsetWidth);
							var py  = (t1 - _zh) /(this.h2 -  this.zoom.offsetHeight);
							this.cz.style.backgroundPosition = (-px*(this.w1 -this.cz.offsetWidth ) -_bor)+"px "+ (-py*(this.h1 -this.cz.offsetHeight )-_bor)+"px";
						}else{
							this.zoom.style.backgroundPosition = (-(l1+_zw)*this.scale + _zw-_bor)+"px "+ (-(t1+_zw)*this.scale+_zw-_bor)+"px";
						};
					};
					if(e.preventDefault) e.preventDefault();
					else e.returnValue = false; 
					return false;
				};
				_t.dom[i].onmouseleave =_t.dom[i].ontouchend = function(){
					if(_t.type==2){
						this.off = false;
						this.querySelector('.cloudZoom') ? this.removeChild(this.querySelector('.cloudZoom')) :'';
						this.querySelector('.imgZoom3') ? this.removeChild(this.querySelector('.imgZoom3')) : '';
						this.cz ? this.cz.style.display = 'none' : '';
					};
					this.zoom ? this.zoom.style.display = 'none' : '';
				};
			};
		},
		_gt : function(obj){
			var t = 0,l = 0;    
		    while(obj){    
		        t+=obj.offsetTop;    
		        l+=obj.offsetLeft;    
		        obj = obj.offsetParent;    
		    };    
		    return {top:t,left:l}; 
		}
	};
	function z(){return new Z(arguments)};window.zoom = z;
}(window,document);
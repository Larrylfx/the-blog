
function insertNode(type){
	//插入头部
	var headerHTML  = '<a class="btn-left" onclick="history.go(-1)"></a>'
    				+'<input type="text" class="text-input" placeholder="请输入关键词！" />'
    				+'<input type="submit" value="" class="btn-sub" />';
	//插入底部
    var footerHTML = '<div class="footer">'
				        		+'<ul class="footer-nav">'
				             	+'<a href="index.html" class="active">'
				                    +'<li> <i class="home"></i>'
				                        +'<span>森巢</span>'
									+'</li>'
				                +'</a>'
				                +'<a href="classify.html">'
				                     +'<li> <i class="category"></i>'
				                        +'<span>分类</span>'
				                    +'</li>'
				                +'</a>'
				                +'<a href="cart.html">'
				                  +'<li>'
				                        +'<i class="cartgoods"></i>'
				                        +'<span>购物车</span>'
				                    +'</li>'
				                +'</a>'
				                +'<a href="login.html">'
				                    +'<li>'
				                        +'<i class="i"></i>'
				                        +'<span>我的</span>'
				                    +'</li>'
				                +'</a>'
				            +'</ul>'
				        +'</div>';
	var nd_header = document.getElementById('header');
	var nd_footer = document.getElementById('footer');
	if(nd_header){
		nd_header.innerHTML = headerHTML;
	}
	if(nd_footer){
		console.log('走了吗')
		nd_footer.innerHTML = footerHTML;
	}
}
//操作商品数量
/*
	type 1代表减数量 2代表加数量
	cur  操作dom
 */
function operateNumber(type,cur){



}
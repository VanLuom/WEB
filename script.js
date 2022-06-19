
/*-----------------------GioHang--------------------------*/
document.getElementById("showgiohang").style.display ="none";
var gioHang = new Array();
 
function addToCard(x){
    var boxSp = x.parentElement.children;
    var img = boxSp[0].src;
    var tensp = boxSp[1].innerText;
    var giasp = boxSp[2].children[0].innerText;
    var soluong = parseInt(boxSp[3].value);
    var product = new Array(img, tensp, giasp, soluong)


   console.log(gioHang);
   //kiem tra gio hang
   var kt = 0;
   for (let i = 0; i < gioHang.length; i++) {
        if(gioHang[i][[2]] == tensp){
            kt =1;
            soluong += parseInt(gioHang[i][3]);
            gioHang[i][3] = soluong;
            break
        }
       
   }
   if(kt == 0){
       //them moi- add to cart
       gioHang.push(product)
   }
   showcountsp();

}
function showcountsp(){
    document.getElementById("soluonghang").innerHTML = gioHang.length;
}
function showMyCart(){
    var ttgh ="";
    var tong = 0;   
    for (let i = 0; i < gioHang.length; i++) {
        var tt =parseInt(gioHang[i][2]) * parseInt(gioHang[i][3]);
        tong += tt;
       ttgh +='<tr>'+
       '<td>'+(i + 1)+'</td>'+
       '<td><img src="'+gioHang[i][0]+'" alt=""></td>'+
       '<td>'+gioHang[i][1]+'</td>'+
       '<td>'+gioHang[i][2]+'</td>'+
       '<td>'+gioHang[i][3]+'</td>' +
       '<td>' +
           '<div>'+tt+'</div>' +
       '</td>' +
       '<td>' +
           '<button onclick="xoaSp(this)">Xoá</button>' +
       '</td>' +
        '</tr>';
   
        
    }
    ttgh +='<tr>' +
    '<th colspan="5">Tổng Đơn hàng</th>' +
    '<th>' +
        '<div>'+tong+'</div>' +
    '</th>' +
'</tr>';
document.getElementById("mycart").innerHTML = ttgh;
}
function xoaSp(x){
    //xoa tr
    var tr = x.parentElement.parentElement;
    var tensp = tr.children[2].innerText;
    tr.remove();
    for (let i = 0; i < gioHang.length; i++) {
        if(gioHang[i][1]==tensp){
            gioHang.splice(i, 1);

        }
        
    }
    showMyCart();
    showcountsp();
}
function xoatatca(){
    gioHang =[];
    showMyCart();
    showcountsp();

}
function showhidecart(){

    var x = document.getElementById("showgiohang");
    if (x.style.display == "block"){
        x.style.display = "none";
    }else{
        x.style.display = "block";
        showMyCart();
    }
   
       

}
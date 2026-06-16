const API_URL="https://script.google.com/macros/s/AKfycbyHKr32h5l-H4hBeWzmeu1NnMW6jOEw66dvmPePLmvdbLJXnoj6vgf21g1z1OZdM86hJQ/exec";

let dscnv=[];
let dkcu=[];
let benhvien=[];

fetch(API_URL)
.then(r=>r.json())
.then(data=>{

dscnv=data.dscnv;
dkcu=data.dkcu;
benhvien=data.benhvien;

const dsnv=document.getElementById("dsnv");

dscnv.slice(1).forEach(r=>{

let o=document.createElement("option");

o.value=r[0];

dsnv.appendChild(o);

});

const dsbv=document.getElementById("dsbv");

benhvien.slice(1).forEach(r=>{

let o=document.createElement("option");

o.value=r[1];

dsbv.appendChild(o);

});

});

document
.getElementById("tennv")
.addEventListener("change",()=>{

const ten=
document.getElementById("tennv").value;

const nv=
dscnv.find(x=>x[0]==ten);

const cu=
dkcu.find(x=>x[1]==ten);

if(!nv) return;

document.getElementById("ttnv").innerHTML=`

<b>Mã NV:</b> ${nv[2]}<br>
<b>Bộ phận:</b> ${nv[4]}<br>
<b>Chức vụ:</b> ${nv[5]}<br>
<b>KCB hiện tại:</b> ${cu ? cu[3] : ""}

`;

});

document
.getElementById("benhvien")
.addEventListener("change",()=>{

const ten=
document.getElementById("benhvien").value;

const bv=
benhvien.find(x=>x[1]==ten);

if(!bv) return;

document.getElementById("ttbv").innerHTML=`

<b>Mã BV:</b> ${bv[2]}<br>
<b>Đăng ký:</b> ${bv[4]}<br>
<b>Địa chỉ:</b> ${bv[5]}<br>
<b>Ghi chú:</b> ${bv[6]}

`;

});

function gui(){

const ten=
document.getElementById("tennv").value;

const bvten=
document.getElementById("benhvien").value;

const nv=
dscnv.find(x=>x[0]==ten);

const cu=
dkcu.find(x=>x[1]==ten);

const bv=
benhvien.find(x=>x[1]==bvten);

if(!nv || !bv){

alert("Kiểm tra lại dữ liệu");

return;

}

fetch(API_URL,{
method:"POST",
body:JSON.stringify({

hoten:ten,
manv:nv[2],
bophan:nv[4],
chucvu:nv[5],
kcbcu:cu ? cu[3] : "",
bvmoi:bvten,
mabv:bv[2]

})

})
.then(r=>r.text())
.then(x=>{

alert("Đăng ký thành công");

});

}

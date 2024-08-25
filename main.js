import {getValueRadio,setInner,onClick,getValue} from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import {redirect} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";
import {getJSON,postJSON} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/api.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";


console.log(getCookie("login"));
if (getCookie("login")===""){
    //redirect("/");
}

getJSON("https://asia-southeast2-awangga.cloudfunctions.net/pamongdesa/data/lms/user",'login',getCookie('login'),runafterGet);

onClick("tombol",runOnRating);
onClick("bantuan",runOnHelpdesk);

function runOnHelpdesk(){
    redirect('https://api.whatsapp.com/send/?phone=6281510040020&text=bantuan+admin&type=phone_number&app_absent=0');
}

function runafterGet(result){
    console.log(result);
    if (result.status===200){
        setInner("petugas",result.data.data.fullname);
        setInner("solusi",result.data.data.village);
    }else{
        console.log(result.data);
        //redirect('/');
    }
    
}

function runOnRating(){
    let rating = getValueRadio("rating");
    let komentar = getValue("komentar");

    if (!rating || komentar.trim() === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Rating dan komentar tidak boleh kosong.'
        });
        return;
    }

    let datarating = {
        rating: Number(rating),
        komentar: komentar
    };
    setInner("feedback","Mohon tunggu sebentar data sedang dikirim");
    postJSON("https://asia-southeast2-awangga.cloudfunctions.net/pamongdesa/data/lms/testi","login",getCookie("login"),datarating,responseFunction);
}

function responseFunction(result){
    console.log(result);
    if (result.status===200){
        setInner("feedback","Terima kasih Bapak/Ibu "+result.data.info+" atas testimoni yang diberikan.");
    }else{
        setInner("feedback","Gagal mengirimkan data "+toString(result.status));
    }

}
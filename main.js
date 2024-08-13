import {getValueRadio,setInner,onClick,hide,show,getValue} from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import {getHash,redirect} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";
import {get,postWithToken} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.6/croot.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";


get("https://asia-southeast2-awangga.cloudfunctions.net/pamongdesa/data/peserta/sent/"+getHash(),runafterGet)

onClick("tombol",runOnRating);
onClick("bantuan",runOnHelpdesk);

function runOnHelpdesk(){
    redirect('https://wa.me/6281510040020?text=bantuan+admin');

}

function runafterGet(result){
    console.log(result);
    setInner("petugas",result.fullname);
    setInner("solusi",result.desa);
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
        id: getHash(),
        rating: Number(rating),
        komentar: komentar
    };
    setInner("feedback","Mohon tunggu sebentar data sedang dikirim");
    postWithToken("https://asia-southeast2-awangga.cloudfunctions.net/pamongdesa/data/peserta/unsubscribe","login",getCookie("login"),datarating,responseFunction);
}

function responseFunction(result){
    console.log(result);
    setInner("feedback","Anda telah berhenti berlangganan informasi dari kami, terima kasih kak "+result.info);

}
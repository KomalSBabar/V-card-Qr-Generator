function generateQR(){

    let name = document.getElementById("name").value.trim();
    let designation = document.getElementById("designation").value.trim();
    let company = document.getElementById("company").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let website = document.getElementById("website").value.trim();

    let vcard =
`BEGIN:VCARD
VERSION:3.0
FN:${name}
TITLE:${designation}
ORG:${company}
TEL:${phone}
EMAIL:${email}
URL:${website}
END:VCARD`;

    document.getElementById("qrcode").innerHTML = "";

    new QRCode(document.getElementById("qrcode"), {
        text: vcard,
        width: 250,
        height: 250
    });

    document.getElementById("placeholder").style.display = "none";
    document.getElementById("successMsg").style.display = "block";
    document.getElementById("downloadBtn").style.display = "block";
}

function downloadQR(){

    let canvas = document.querySelector("#qrcode canvas");

    if(!canvas){
        alert("Please generate a QR Code first.");
        return;
    }

    let link = document.createElement("a");
    link.download = "vcard-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

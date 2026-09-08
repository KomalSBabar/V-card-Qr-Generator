
window.addEventListener("load", () => {

    let savedTheme =
        localStorage.getItem("theme");

    if(savedTheme === "dark"){

        document.body.classList.add("dark-mode");

        document.getElementById("themeBtn").innerText =
            "☀️ Light Mode";
    }

});

function generateQR() {

    let name = document.getElementById("name").value.trim();
    let designation = document.getElementById("designation").value.trim();
    let company = document.getElementById("company").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let website = document.getElementById("website").value.trim();

    // Basic Validation

    if (name === "") {
        alert("Please enter Name");
        return;
    }

    if (phone === "") {
        alert("Please enter Phone Number");
        return;
    }

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

    // Clear old QR

    document.getElementById("qrcode").innerHTML = "";

    // Generate New QR

    new QRCode(document.getElementById("qrcode"), {
        text: vcard,
        width: 250,
        height: 250
    });

    // Update UI

    document.getElementById("placeholder").style.display = "none";

    document.getElementById("successMsg").style.display = "block";

    // Show all action buttons
    document.getElementById("actionButtons").style.display = "flex";

    // Increase QR Counter

    qrGenerated++;

    localStorage.setItem(
        "qrGenerated",
        qrGenerated
    );

    document.getElementById("qrCounter").innerText =
        qrGenerated;
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

function clearForm(){

    document.querySelectorAll("input")
        .forEach(input => input.value = "");

    document.getElementById("qrcode").innerHTML = "";

    document.getElementById("placeholder")
        .style.display = "block";

    document.getElementById("successMsg")
        .style.display = "none";

    document.getElementById("actionButtons")
        .style.display = "none";
}

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");

        document.getElementById("themeBtn").innerText =
            "☀️ Light Mode";

    }else{

        localStorage.setItem("theme","light");

        document.getElementById("themeBtn").innerText =
            "🌙 Dark Mode";
    }
}

function copyContactData(){

    let name =
        document.getElementById("name").value;

    let designation =
        document.getElementById("designation").value;

    let company =
        document.getElementById("company").value;

    let phone =
        document.getElementById("phone").value;

    let email =
        document.getElementById("email").value;

    let website =
        document.getElementById("website").value;

    let text =
`Name: ${name}
Designation: ${designation}
Company: ${company}
Phone: ${phone}
Email: ${email}
Website: ${website}`;

    navigator.clipboard.writeText(text);

    alert("Contact data copied.");
}


async function copyQR(){

    let canvas =
        document.querySelector("#qrcode canvas");

    if(!canvas){

        alert("Generate QR first.");
        return;
    }

    canvas.toBlob(async (blob)=>{

        try{

            await navigator.clipboard.write([
                new ClipboardItem({
                    "image/png": blob
                })
            ]);

            alert("QR copied.");

        }catch(error){

            alert(
                "Copy QR not supported in this browser."
            );
        }

    });

}



let startTime = Date.now();

setInterval(() => {

    let total =
        Math.floor((Date.now() - startTime)/1000);

    let mins = Math.floor(total/60);
    let secs = total % 60;

    document.getElementById("timeSpent")
        .innerText =
        `${mins}m ${secs}s`;

},1000);
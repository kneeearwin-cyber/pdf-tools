document.getElementById("convertBtn").addEventListener("click", async () => {
    const fileInput = document.getElementById("fileInput");
    const status = document.getElementById("status");

    if (!fileInput.files.length) {
        alert("Please select an image");
        return;
    }

    status.innerText = "Processing...";

    const file = fileInput.files[0];

    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();

        img.onload = function () {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Resize image (important for mobile 🚀)
            const maxWidth = 800;
            const scale = maxWidth / img.width;

            canvas.width = maxWidth;
            canvas.height = img.height * scale;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const imgData = canvas.toDataURL("image/jpeg", 0.7);

            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();

            pdf.addImage(imgData, "JPEG", 10, 10, 180, 0);
            pdf.save("converted.pdf");

            status.innerText = "Done ✅";
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
});

document.getElementById("convertBtn").addEventListener("click", function () {

    const fileInput = document.getElementById("fileInput");
    const status = document.getElementById("status");

    if (!fileInput.files.length) {
        alert("Please select an image");
        return;
    }

    status.innerText = "Processing...";

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();

        img.onload = function () {

            // Create canvas
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Resize for mobile performance 🚀
            const maxWidth = 800;
            const scale = maxWidth / img.width;

            canvas.width = maxWidth;
            canvas.height = img.height * scale;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const imgData = canvas.toDataURL("image/jpeg", 0.7);

            // Create PDF
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();

            pdf.addImage(imgData, "JPEG", 10, 10, 180, 0);
            pdf.save("converted.pdf");

            status.innerText = "Done ✅";
        };

        img.onerror = function () {
            status.innerText = "Error loading image ❌";
        };

        img.src = e.target.result;
    };

    reader.onerror = function () {
        status.innerText = "Error reading file ❌";
    };

    reader.readAsDataURL(file);
});

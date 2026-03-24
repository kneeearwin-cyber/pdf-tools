async function convert() {
  const files = document.getElementById('img').files;
  const status = document.getElementById('status');

  if (!files.length) return alert("Upload images");

  status.innerText = "Processing...";

  const { PDFDocument } = PDFLib;
  const pdf = await PDFDocument.create();

  for (let f of files) {
    const bytes = await f.arrayBuffer();
    const img = f.type.includes("png")
      ? await pdf.embedPng(bytes)
      : await pdf.embedJpg(bytes);

    const page = pdf.addPage([img.width, img.height]);
    page.drawImage(img, {x:0,y:0,width:img.width,height:img.height});
  }

  const out = await pdf.save();
  download(out, "images.pdf");

  status.innerText = "Done ✅";
}
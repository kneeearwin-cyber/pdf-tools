async function mergePDF() {
  const files = document.getElementById('files').files;
  const status = document.getElementById('status');

  if (files.length < 2) return alert("Upload 2 PDFs");

  status.innerText = "Processing...";

  const { PDFDocument } = PDFLib;
  const merged = await PDFDocument.create();

  for (let f of files) {
    const pdf = await PDFDocument.load(await f.arrayBuffer());
    const pages = await merged.copyPages(pdf, pdf.getPageIndices());
    pages.forEach(p => merged.addPage(p));
  }

  const bytes = await merged.save();
  download(bytes, "merged.pdf");

  status.innerText = "Done ✅";
}

function download(bytes, name) {
  const blob = new Blob([bytes], {type:"application/pdf"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
}
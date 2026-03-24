async function compressPDF() {
  const file = document.getElementById('file').files[0];
  const status = document.getElementById('status');

  if (!file) return alert("Upload PDF");

  status.innerText = "Processing...";

  const { PDFDocument } = PDFLib;
  const pdf = await PDFDocument.load(await file.arrayBuffer());

  const bytes = await pdf.save({ useObjectStreams: true });

  download(bytes, "compressed.pdf");
  status.innerText = "Done ✅";
}
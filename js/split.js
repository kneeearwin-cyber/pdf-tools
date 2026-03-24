async function splitPDF() {
  const file = document.getElementById('file').files[0];
  const pageNum = document.getElementById('page').value;
  const status = document.getElementById('status');

  if (!file || !pageNum) return alert("Enter data");

  status.innerText = "Processing...";

  const { PDFDocument } = PDFLib;
  const pdf = await PDFDocument.load(await file.arrayBuffer());

  const newPdf = await PDFDocument.create();
  const [page] = await newPdf.copyPages(pdf, [pageNum-1]);
  newPdf.addPage(page);

  const bytes = await newPdf.save();
  download(bytes, "split.pdf");

  status.innerText = "Done ✅";
}
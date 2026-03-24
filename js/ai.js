function runCommand() {
  const cmd = document.getElementById("command").value.toLowerCase();
  const res = document.getElementById("aiResponse");

  if (cmd.includes("merge")) {
    res.innerText = "Opening Merge Tool...";
    setTimeout(()=> location.href="merge.html", 800);
  }
  else if (cmd.includes("compress")) {
    res.innerText = "Opening Compress Tool...";
    setTimeout(()=> location.href="compress.html", 800);
  }
  else if (cmd.includes("image") || cmd.includes("photo")) {
    res.innerText = "Opening Image Tool...";
    setTimeout(()=> location.href="image.html", 800);
  }
  else if (cmd.includes("split")) {
    res.innerText = "Opening Split Tool...";
    setTimeout(()=> location.href="split.html", 800);
  }
  else {
    res.innerText = "Try: merge pdf, compress file, image to pdf";
  }
}
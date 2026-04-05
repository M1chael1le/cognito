/* eslint-disable @typescript-eslint/no-explicit-any */

const PDFJS_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174";

let pdfjsLib: any = null;

async function loadPdfJs(): Promise<any> {
  if (pdfjsLib) return pdfjsLib;

  // Dynamically load pdf.js from CDN
  await new Promise<void>((resolve, reject) => {
    if ((window as any).pdfjsLib) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = `${PDFJS_CDN}/pdf.min.js`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load PDF.js"));
    document.head.appendChild(script);
  });

  pdfjsLib = (window as any).pdfjsLib;
  pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_CDN}/pdf.worker.min.js`;
  return pdfjsLib;
}

export async function extractPdfText(file: File): Promise<string> {
  const pdfjs = await loadPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

  const textParts: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str || "")
      .join(" ");
    textParts.push(pageText);
  }

  return textParts.join("\n\n");
}

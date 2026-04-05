import { NextRequest, NextResponse } from "next/server";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_TEXT_LENGTH = 100_000;

const SUPPORTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/csv",
];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    if (!SUPPORTED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload DOCX, TXT, or CSV." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedText = "";

    if (file.type === "application/pdf") {
      // PDFs should be handled client-side, but if they arrive here
      // return an error directing the user to retry
      return NextResponse.json(
        { error: "PDF processing error. Please try again." },
        { status: 500 }
      );
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    } else {
      // text/plain or text/csv
      extractedText = buffer.toString("utf-8");
    }

    if (extractedText.length > MAX_TEXT_LENGTH) {
      extractedText =
        extractedText.slice(0, MAX_TEXT_LENGTH) +
        "\n\n[Document truncated due to length]";
    }

    return NextResponse.json({
      name: file.name,
      type: file.type,
      size: file.size,
      extractedText,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process file" },
      { status: 500 }
    );
  }
}

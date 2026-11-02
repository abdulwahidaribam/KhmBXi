 
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import AdmZip from "adm-zip";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;
const MAX_UNCOMPRESSED_SIZE = 100 * 1024 * 1024;
const MAX_ENTRIES = 5000;

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in first." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please select a ZIP file." },
        { status: 400 }
      );
    }

    if (!file.name.toLowerCase().endsWith(".zip")) {
      return NextResponse.json(
        { error: "Only ZIP files are allowed." },
        { status: 400 }
      );
    }

    if (file.size === 0 || file.size > MAX_UPLOAD_SIZE) {
      return NextResponse.json(
        { error: "ZIP files must be between 1 byte and 10 MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Check the ZIP file signature.
    if (
      buffer.length < 4 ||
      buffer[0] !== 0x50 ||
      buffer[1] !== 0x4b
    ) {
      return NextResponse.json(
        { error: "The uploaded file is not a valid ZIP archive." },
        { status: 400 }
      );
    }

    let zip: AdmZip;
    try {
      zip = new AdmZip(buffer);
    } catch {
      return NextResponse.json(
        { error: "Unable to read the ZIP archive." },
        { status: 400 }
      );
    }

    const entries = zip.getEntries();

    if (entries.length > MAX_ENTRIES) {
      return NextResponse.json(
        { error: "The ZIP contains too many files." },
        { status: 400 }
      );
    }

    let totalSize = 0;
    let hasIndexHtml = false;

    for (const entry of entries) {
      const name = entry.entryName.replace(/\\/g, "/");
      const normalized = path.posix.normalize(name);

      // Reject unsafe paths before any future extraction.
      if (
        name.startsWith("/") ||
        /^[a-zA-Z]:/.test(name) ||
        normalized === ".." ||
        normalized.startsWith("../") ||
        name.includes("\0")
      ) {
        return NextResponse.json(
          { error: "The ZIP contains an unsafe file path." },
          { status: 400 }
        );
      }

      if (!entry.isDirectory) {
        totalSize += entry.header.size;

        if (totalSize > MAX_UNCOMPRESSED_SIZE) {
          return NextResponse.json(
            { error: "The uncompressed website exceeds 100 MB." },
            { status: 400 }
          );
        }

        if (normalized.toLowerCase() === "index.html") {
          hasIndexHtml = true;
        }
      }
    }

    if (!hasIndexHtml) {
      return NextResponse.json(
        {
          error:
            "No root index.html found. Upload a ZIP with index.html at its top level.",
        },
        { status: 400 }
      );
    }

    // Save the archive without extracting untrusted files.
    const uploadId = randomUUID();
    const uploadDirectory = path.join(
      process.cwd(),
      "data",
      "uploads"
    );

    await mkdir(uploadDirectory, { recursive: true });

    const archivePath = path.join(
      uploadDirectory,
      `${uploadId}.zip`
    );

    await writeFile(archivePath, buffer, { flag: "wx" });

    return NextResponse.json(
      {
        success: true,
        message:
          "ZIP validated and saved. Deployment has not started yet.",
        uploadId,
        fileName: file.name,
        size: file.size,
        status: "uploaded",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ZIP upload failed:", error);

    return NextResponse.json(
      { error: "Unable to process or save the uploaded ZIP." },
      { status: 500 }
    );
  }
}

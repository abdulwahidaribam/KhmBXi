
"use client";

import { useRef, useState } from "react";
import { UserButton } from "@clerk/nextjs";

type Project = {
  id: number | string;
  name: string;
  fileName: string;
  status: string;
};

type UploadResponse = {
  success?: boolean;
  error?: string;
  uploadId?: string;
  fileName?: string;
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "My first website",
      fileName: "Not uploaded yet",
      status: "Ready to deploy",
    },
  ]);

  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function createProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isUploading) return;

    const projectName = name.trim();
    if (!projectName) {
      setMessage("Enter a project name.");
      return;
    }

    if (!file) {
      setMessage("Choose a website ZIP file.");
      return;
    }

    if (!file.name.toLowerCase().endsWith(".zip")) {
      setMessage("Please select a .zip file.");
      return;
    }

    setIsUploading(true);
    setMessage("Uploading and validating ZIP...");

    try {
      const formData = new FormData();
      formData.set("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json().catch(() => null)) as UploadResponse | null;

      if (!response.ok || !result?.success || !result.uploadId) {
        setMessage(result?.error ?? "The ZIP upload failed. Please try again.");
        return;
      }

      setProjects((current) => [
        ...current,
        {
          id: result.uploadId!,
          name: projectName,
          fileName: result.fileName ?? file.name,
          status: "ZIP uploaded · Deployment not started",
        },
      ]);

      setName("");
      setFile(null);
      formRef.current?.reset();
      setMessage("ZIP uploaded successfully. Deployment has not started yet.");
    } catch {
      setMessage("Could not reach the upload service. Check your connection and try again.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <header className="flex h-20 items-center justify-between border-b border-white/10 px-6 md:px-12">
        <h1 className="text-2xl font-bold">
          khmB<span className="text-violet-400">Xi</span>
        </h1>
        <div className="flex items-center gap-5">
  <span className="text-sm text-zinc-400">
    Developer workspace · M1
  </span>
  <UserButton
    appearance={{
      elements: {
        avatarBox: "h-9 w-9",
      },
    }}
  />
</div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-violet-400">
          Deployment platform
        </p>

        <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
          Ship something
          <br />
          <span className="text-zinc-500">remarkable.</span>
        </h2>

        <p className="mt-5 max-w-xl leading-7 text-zinc-400">
          Create a project, prepare your website, and get ready to deploy with khmBXi.
        </p>

        <div className="my-10 grid gap-4 sm:grid-cols-3">
          <Stat label="Projects" value={String(projects.length).padStart(2, "0")} />
          <Stat label="Deployments" value="00" />
          <Stat label="Platform status" value="Local preview" />
        </div>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h3 className="text-xl font-semibold">Create a project</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Start with a static website ZIP containing index.html.
            </p>

            <form ref={formRef} onSubmit={createProject} className="mt-6 space-y-5">
              <div>
                <label htmlFor="project-name" className="mb-2 block text-sm text-zinc-300">
                  Project name
                </label>
                <input
                  id="project-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="my-awesome-website"
                  maxLength={60}
                  disabled={isUploading}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-violet-400"
                />
              </div>

              <div>
                <label htmlFor="website-zip" className="mb-2 block text-sm text-zinc-300">
                  Website ZIP file
                </label>
                <input
                  id="website-zip"
                  type="file"
                  accept=".zip,application/zip"
                  onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                  disabled={isUploading}
                  className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-zinc-300 file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-3 file:py-2 file:font-medium file:text-black"
                />
              </div>

              {message && (
                <p role="status" className="text-sm text-violet-300">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={isUploading}
                className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-violet-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUploading ? "Uploading..." : "Create project"}
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h3 className="text-xl font-semibold">Your projects</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Projects added in this browser session
            </p>

            <div className="mt-6 space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="rounded-xl border border-white/10 bg-black/30 p-5">
                  <h4 className="font-medium break-words">{project.name}</h4>
                  <p className="mt-2 break-all text-sm text-zinc-500">
                    {project.fileName}
                  </p>
                  <p className="mt-3 text-sm text-amber-300">
                    {project.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-12 border-t border-white/10 pt-6 text-sm text-zinc-500">
          khmBXi © 2026 · M1 local development
        </footer>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="mt-3 text-2xl font-semibold">{value}</p>
    </div>
  );
}


import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#09090b] px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            khmB<span className="text-violet-400">Xi</span>
          </h1>
          <p className="mt-3 text-sm text-zinc-400">
            Create your developer account
          </p>
        </div>

        <SignUp />
      </div>
    </main>
  );
}

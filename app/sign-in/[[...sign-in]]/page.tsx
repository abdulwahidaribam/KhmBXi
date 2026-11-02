
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#09090b] px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            khmB<span className="text-violet-400">Xi</span>
          </h1>
          <p className="mt-3 text-sm text-zinc-400">
            Sign in to your developer workspace
          </p>
        </div>

        <SignIn />
      </div>
    </main>
  );
}

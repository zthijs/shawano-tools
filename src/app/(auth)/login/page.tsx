import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { LoginButton } from "./button";

export default function LoginPage() {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link href="/" className="flex items-center gap-2 font-medium">
						<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
							<GalleryVerticalEnd className="size-4" />
						</div>
						Shawano&apos;s
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<Suspense>
							<LoginButton />
						</Suspense>
					</div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<img
					src="/public/images/login.jpg"
					alt="Scouting groep Shawano&apos;s"
					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.] dark:grayscale"
				/>
			</div>
		</div>
	);
}

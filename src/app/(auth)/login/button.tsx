"use client";
import { GoogleLogo } from "@/components/shared/google";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export const LoginButton = () => {
	const searchParams = useSearchParams();

	return (
		<Button
			onClick={() =>
				signIn("google", { redirectTo: searchParams.get("callbackUrl") || "/" })
			}
			variant="outline"
			className="w-full"
		>
			<GoogleLogo />
			Login met Google
		</Button>
	);
};

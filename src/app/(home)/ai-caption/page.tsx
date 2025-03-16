"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import { generateCaption } from "./actions";
import { AICaptionUitleg } from "./uitleg";

export default function AICaption() {
	const [caption, setCaption] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setCaption(null);
		const formData = new FormData(e.currentTarget);
		startTransition(async () => {
			const generatedCaption = await generateCaption(formData);
			setCaption(generatedCaption);
		});
	}

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
			<Card>
				<CardHeader>
					<CardTitle>AI Caption</CardTitle>
					<CardDescription>
						Genereer een bijschrift voor je social media post.
					</CardDescription>
					<CardAction>
						<AICaptionUitleg />
					</CardAction>
				</CardHeader>
			</Card>
			<p className="pb-1 text-sm text-muted-foreground">
				Omschrijf wat voor post je gaat plaatsen en genereer een bijschrift.
			</p>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<Textarea
					name="postDescription"
					placeholder="Voer een bericht omschrijving in."
					required
				/>
				<Button disabled={isPending} className="w-full" type="submit">
					Genereer caption
				</Button>
			</form>
			<Separator />
			<div className="h-full w-full flex md:items-center md:justify-center">
				<div className="max-w-xl w-full ">
					{isPending && (
						<div className="flex flex-col gap-2">
							<Skeleton className="w-full h-[20px] rounded-full" />
							<Skeleton className="w-[80%] h-[20px] rounded-full" />
							<Skeleton className="w-[60%] h-[20px] rounded-full" />
							<Skeleton className="w-[80%] h-[20px] rounded-full" />
							<Skeleton className="w-[80%] h-[20px] rounded-full" />
							<Skeleton className="w-[60%] h-[20px] rounded-full" />
						</div>
					)}

					{caption && (
						<div className="flex flex-col gap-4">
							<p className="text-lg font-bold">Post caption:</p>
							<p className="text-sm text-muted-foreground">{caption}</p>
							<Button
								className="w-full"
								onClick={() => navigator.clipboard.writeText(caption)}
							>
								Kopieer
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

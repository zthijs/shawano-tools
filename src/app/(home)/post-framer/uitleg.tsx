import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { ExternalLink } from "lucide-react";

export function PostFramerUitleg() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">
					<ExternalLink className="size-4" />
					Lees meer
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>PR Post Framer</SheetTitle>
					<SheetDescription>
						De Post Framer is een tool waarmee je eenvoudig en snel social media
						posts kunt maken. Je kunt kiezen uit verschillende templates, deze
						naar wens aanpassen en vervolgens delen op social media.
					</SheetDescription>
				</SheetHeader>

				<SheetFooter>
					<SheetClose asChild>
						<Button>Sluiten</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

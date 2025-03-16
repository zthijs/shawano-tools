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

export function AICaptionUitleg() {
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
					<SheetTitle>PR AI Caption</SheetTitle>
					<SheetDescription>
						De AI Caption tool is een tool waarmee je eenvoudig en snel
						onderschriften kunt genereren voor social media posts. Je kunt de
						tool gebruiken om een beschrijving van een post in te voeren en de
						tool zal een onderschrift genereren op basis van de ingevoerde
						beschrijving.
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

import { Syringe, CalendarClock } from "lucide-react"
import { format } from "date-fns"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const renderDose = (
  label: string,
  dose: number,
  mg: number,
  date: Date | string
) => (
  <div className="flex items-start justify-between border rounded-md p-3 bg-muted/30">
    <div className="flex items-center gap-2 text-sm font-medium">
      <Syringe className="w-4 h-4 text-primary" />
      {label}
    </div>
    <div className="text-sm text-muted-foreground text-right">
      {dose} ({mg}mg)
      <br />
      <span className="inline-flex items-center gap-1 text-xs">
        <CalendarClock className="w-3 h-3" />
        {format(new Date(date), "MMMM d, yyyy")}
      </span>
    </div>
  </div>
)

const DosageCard = ({ dosage }: { dosage: any }) => (
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>
        <span className="flex items-center gap-2">
          <Syringe className="w-4 h-4 text-primary" />
          Hepatitis B Vaccination History
        </span>
      </AccordionTrigger>
      <AccordionContent className="space-y-3 pt-2">
        {renderDose("Dosage 1", dosage.dosageOne, dosage.dosageOneMg, dosage.dosageOneDate)}
        {renderDose("Dosage 2", dosage.dosageTwo, dosage.dosageTwoMg, dosage.dosageTwoDate)}
        {renderDose("Dosage 3", dosage.dosageThree, dosage.dosageThreeMg, dosage.dosageThreeDate)}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

export default DosageCard

import { Clock } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/app/components/ui/alert";

interface RegistrationAlertProps {
  daysLeft: number;
}

const RegistrationAlert = ({ daysLeft }: RegistrationAlertProps) => (
  <Alert className="mb-6 border-orange-500 bg-orange-50">
    <Clock className="h-4 w-4" />
    <AlertTitle>Registration Deadline</AlertTitle>
    <AlertDescription>
      {daysLeft > 0
        ? `${daysLeft} days left to submit (Deadline: November 10, 2024)`
        : "Registration period has ended"}
    </AlertDescription>
  </Alert>
);

export default RegistrationAlert;

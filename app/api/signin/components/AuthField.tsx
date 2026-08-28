import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthFieldProps {
    id: string;
    label: string;
    type?: string;
    placeholder: string;
    error?: string;
    registration: any;
}

export default function AuthField({
    id,
    label,
    type,
    placeholder,
    error,
    registration,
}: AuthFieldProps) {
    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                <Label id={id}>{label}</Label>
                {
                    error && (
                        <p className="text-red-700">{error}</p>
                    )
                }
            </div>
            <Input
                className="focus-visible:ring-2 aria-invalid:ring-2"
                id={id}
                type={type}
                placeholder={placeholder}
                autoComplete="off"
                {...registration}
                aria-invalid={!!error}
            />
        </div>
    )
}
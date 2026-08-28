import { Button } from "./ui/button";

interface SubmitBtnProps {
    disabled?: boolean;
    isLoading?: boolean;
}

export default function SubmitBtn({disabled, isLoading} : SubmitBtnProps) {
    return (
        <Button
            variant="secondary"
            type="submit"
            className="w-20 h-10 cursor-pointer hover:text-white backdrop-blur-xl bg-black/0"
            disabled={disabled || isLoading}
        >
            {isLoading ? "Loading" : "Submit"}
        </Button>
    )
}
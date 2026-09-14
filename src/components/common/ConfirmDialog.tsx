import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface ConfirmDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    description: string
    confirmText?: string
    cancelText?: string
    variant?: "default" | "destructive"
}

export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Proceed",
    cancelText = "Cancel",
    variant = "default",
}: ConfirmDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="overflow-hidden rounded-3xl border-border/50 bg-card p-0 shadow-2xl sm:max-w-md">
                <div className="flex flex-col items-center px-7 pb-3 pt-8 text-center">
                    <div className={`mb-5 grid h-14 w-14 place-items-center rounded-2xl ${variant === 'destructive' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                        <AlertTriangle className="h-7 w-7" />
                    </div>
                <DialogHeader className="items-center text-center sm:text-center">
                    <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
                    <DialogDescription className="max-w-sm text-sm leading-6 text-muted-foreground">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                </div>
                <DialogFooter className="gap-3 border-t border-border/40 bg-muted/25 px-7 py-5 sm:justify-center">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="min-w-32 rounded-full border-border/60"
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={variant === "destructive" ? "destructive" : "default"}
                        onClick={onConfirm}
                        className="min-w-32 rounded-full"
                    >
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

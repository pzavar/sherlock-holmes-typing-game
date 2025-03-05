
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ExitDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const ExitDialog: React.FC<ExitDialogProps> = ({
  isOpen,
  onOpenChange,
  onConfirm
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border border-amber-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-serif">Abandon Investigation?</AlertDialogTitle>
          <AlertDialogDescription>
            The evidence you've gathered will be lost. Are you sure you want to abandon this case?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-amber-600 text-amber-800 hover:bg-amber-50">No, Continue</AlertDialogCancel>
          <AlertDialogAction 
            className="bg-amber-600 hover:bg-amber-700 text-white" 
            onClick={onConfirm}
          >
            Yes, Abandon Case
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ExitDialog;

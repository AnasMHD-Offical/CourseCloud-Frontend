import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";



export function Confirmation({
  isOpen,
  Closing,
  check_confirmation,
  data,
  content,
  role,
}) {

    const handle_confirm = () =>{
        check_confirmation(data)
        Closing()
    }
    const handle_cancel = () =>{
        Closing()
    }
  return (
    <AlertDialog open={isOpen} onOpenChange={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`Are you sure to ${content} the ${role}`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={()=> handle_cancel()}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=> handle_confirm()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

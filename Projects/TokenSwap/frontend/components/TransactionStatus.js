import { Fragment, useState } from "react";
import { Button } from "@nextui-org/react";
import { Dialog, Transition } from "@headlessui/react";

const TransactionStatus = () => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-99 inset-0 overflow-y-auto"
        onClose={handleClose}>
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 transaction-opacity" />
          </Transition.Child>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="status inline-block align-bottom bg-zinc-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <Button isLoading>
                Completing the transaction...
              </Button>
            </div>
            <p className="px-4 py-4 text-black text-sm justify-center sm:px-6 sm:flex sm:flex-row-reverse">
              Transaction usually takes a few seconds
            </p>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
};

export default TransactionStatus;
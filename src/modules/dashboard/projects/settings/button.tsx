import { Dialog } from "@headlessui/react";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import BaseModal from "../../../../components/modal";
import useOpen from "../../../../hooks/useOpen";
import SettingsModalContainer from "./modal";

const SettingsButton = () => {
  const { isOpen, open, close } = useOpen();

  return (
    <>
      <button
        title="Project Settings"
        onClick={open}
        className="m-1 inline-flex items-center rounded-lg bg-gray-500 p-1.5 text-white duration-300 hover:bg-gray-600"
      >
        <Cog8ToothIcon aria-hidden="true" className="h-4 w-4" />
      </button>

      <BaseModal
        open={isOpen}
        closeModal={close}
        className="max-w-3xl rounded-xl bg-white p-8 text-left"
      >
        <Dialog.Title className="font-extrabold tracking-wide text-gray-700">
          Project Settings
        </Dialog.Title>
        <Dialog.Description className="mt-1 text-sm text-gray-600">
          Manage your project...
        </Dialog.Description>

        <SettingsModalContainer />
      </BaseModal>
    </>
  );
};

export default SettingsButton;

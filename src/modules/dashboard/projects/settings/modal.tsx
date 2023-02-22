import { Dialog } from "@headlessui/react";
import DeleteProject from "./delete-project";
import OrganizeGroupTasks from "./organize-groups";
import RenameProject from "./rename-project";

const SettingsModalContainer = () => {
  return (
    <Dialog.Panel className="mt-6 px-6">
      <OrganizeGroupTasks />

      <hr className="my-8" />

      <RenameProject />

      <hr className="my-8" />

      <DeleteProject />
    </Dialog.Panel>
  );
};

export default SettingsModalContainer;

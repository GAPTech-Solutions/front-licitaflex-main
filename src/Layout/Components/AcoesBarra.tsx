import { ColorModeSwitcher } from "@/Components/ColorModeSwitcher/colorModeSwitcher";
import { IconNotification, IconSearch } from "@/Components/icons";
import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";

export default function AcoesBarra() {
  return (
    <Flex justifyContent="flex-end" flex="1" gap="1rem">
      <InputGroup maxWidth="300px" variant="outline">
        <Input placeholder="Buscar..." />
        <InputRightAddon
          backgroundColor="#3D3D3D"
          as={IconButton}
          icon={<IconSearch height="24px" width="auto" color="white" />}
        />
      </InputGroup>
      <ColorModeSwitcher />
      <IconButton
        icon={<IconNotification height="24px" width="auto" />}
        aria-label="Notificação"
        variant="ghost"
      />
    </Flex>
  );
}

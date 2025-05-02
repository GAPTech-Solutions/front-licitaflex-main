import { LoteSalaDisputa } from "@/data/types/EditalSalaDisputa";
import { useSalaDisputa } from "../SalaDisputaContext";
import { InputPercentagem } from "@/Components/input/InputPercentagem";
import { InputMonetario } from "@/Components/input/InputMonetario";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  InputRightAddon,
} from "@chakra-ui/react";
import React from "react";
import useMutation from "@/hooks/requests/useMutation";
import { useSalaDisputaService } from "@/data/services/sala.disputa.sevice";
import useSalaDisputaForncedor from "../useSalaDisputaForncedor";

type AcoesFornecedorProps = {
  loteId: string;
};
const format = new Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  style: "currency",
  maximumFractionDigits: 5,
  minimumFractionDigits: 5,
});
export default function AcoesFornecedor(props: AcoesFornecedorProps) {
  const { edital } = useSalaDisputa();
  const [value, setValue] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number.parseString(event.target.value).toString());
  };
  const { enviarLance, isLoadingEnviarLance, forncedorAptoLance } =
    useSalaDisputaForncedor(props.loteId);

  if (forncedorAptoLance()) {
    return (
      <InputGroup variant="outline">
        {edital?.tipoTaxa ? (
          <InputPercentagem onChange={handleChange} />
        ) : (
          <InputMonetario onChange={handleChange} />
        )}
        <InputRightElement>
          <Button
            isLoading={isLoadingEnviarLance}
            onClick={() => enviarLance(value)}
            variant="ghost"
          >
            Ok
          </Button>
        </InputRightElement>
      </InputGroup>
    );
  }
  return <></>;
}

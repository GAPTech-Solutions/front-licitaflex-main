import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Progress,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import useFormSolicitacoes, {
  UseFormSolicitacoesProps,
} from "./useFormSolicitacoes";
import useFormRepostaSolicitacoes, {
  useFormRepostaSolicitacoesProps,
} from "./useFormRepostaSolicitacoes";

export default function FormRespostaSolicitacoes(
  props: useFormRepostaSolicitacoesProps
) {
  const {
    register,
    submit,
    isLoading,
    close,
    inputRef,
    onChangeFile,
    progressFile,
  } = useFormRepostaSolicitacoes(props);
  return (
    <Stack as="form" spacing={4} onSubmit={submit}>
      <Flex>
        <FormControl>
          <FormLabel>Resposta</FormLabel>
          <Textarea {...register("descricao")} rows={5}></Textarea>
        </FormControl>
      </Flex>
      <Flex gap="1rem" direction="column">
        <FormControl>
          <FormLabel>Documento</FormLabel>
          <Input
            type="file"
            placeholder="Documento"
            ref={inputRef}
            onChange={onChangeFile}
          />
        </FormControl>
        <Progress value={progressFile} />
      </Flex>
      <Flex justifyContent="space-between" gap="1rem">
        <Button type="button" onClick={close} isLoading={isLoading} flex="1">
          Cancelar
        </Button>
        <Button type="submit" isLoading={isLoading} flex="1" colorScheme="azul">
          Confirmar
        </Button>
      </Flex>
    </Stack>
  );
}

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
} from "@chakra-ui/react";
import useFormDeclaracao from "./useFormDeclaracao";

export default function FormDeclaracao() {
  const {
    submit,
    register,
    formState: { errors },
  } = useFormDeclaracao();
  return (
    <Stack as="form" spacing={4} onSubmit={submit}>
      <Flex gap="1rem" direction="column">
        <FormControl
          display="flex"
          gap="1rem"
          isInvalid={!!errors.naoIncorreCondicoes}
        >
          <Switch
            {...register("naoIncorreCondicoes", {
              validate: (value) => value || "Deve aceitar o campo",
            })}
          />
          <FormLabel variant="chakra">
            Declaro que não incorro nas condições impeditivas do art. 14 da Lei
            Federal nº 14.133/21
          </FormLabel>
          <FormErrorMessage>
            {errors.naoIncorreCondicoes?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          display="flex"
          gap="1rem"
          isInvalid={!!errors.atendeRequisitosHabilitacao}
        >
          <Switch
            {...register("atendeRequisitosHabilitacao", {
              validate: (value) => value || "Deve aceitar o campo",
            })}
          />
          <FormLabel variant="chakra">
            Declaro que atendo aos requisitos de habilitação, conforme disposto
            no art. 63, inciso I, da Lei Federal no 14.133/21.
          </FormLabel>
          <FormErrorMessage>
            {errors.atendeRequisitosHabilitacao?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          display="flex"
          gap="1rem"
          isInvalid={!!errors.reservaCargoDeficiencia}
        >
          <Switch
            {...register("reservaCargoDeficiencia", {
              validate: (value) => value || "Deve aceitar o campo",
            })}
          />
          <FormLabel variant="chakra">
            Declaro que cumpro as exigências de reserva de cargos para pessoa
            com deficiência e para reabilitado da Previdência Social, previstas
            em lei e em outras normas específicas, conforme art. 63, inciso IV,
            da Lei Federal no 14.133/21.
          </FormLabel>
          <FormErrorMessage>
            {errors.reservaCargoDeficiencia?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          display="flex"
          gap="1rem"
          isInvalid={!!errors.propostaEmConformidade}
        >
          <Switch
            {...register("propostaEmConformidade", {
              validate: (value) => value || "Deve aceitar o campo",
            })}
          />
          <FormLabel variant="chakra">
            Declaro que a proposta apresentada para essa licitação está em
            conformidade com as exigências do instrumento convocatório e me
            responsabilizo pela veracidade e autenticidade dos documentos
            apresentados.
          </FormLabel>
          <FormErrorMessage>
            {errors.propostaEmConformidade?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          display="flex"
          gap="1rem"
          isInvalid={!!errors.entendimentoCustosTrabalhista}
        >
          <Switch
            {...register("entendimentoCustosTrabalhista", {
              validate: (value) => value || "Deve aceitar o campo",
            })}
          />
          <FormLabel variant="chakra">
            Declaro que minha proposta econômica compreendem a integralidade dos
            custos para atendimento dos direitos trabalhistas assegurados na
            Constituição Federal, nas leis trabalhistas, nas normas infralegais,
            nas convenções coletivas de trabalho e nos termos de ajustamento de
            conduta vigentes na data de entrega da proposta, conforme art. 63,
            §1o, da Lei Federal no 14.133/21.
          </FormLabel>
          <FormErrorMessage>
            {errors.entendimentoCustosTrabalhista?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          display="flex"
          gap="1rem"
          isInvalid={!!errors.cienteCondicoesEdital}
        >
          <Switch
            {...register("cienteCondicoesEdital", {
              validate: (value) => value || "Deve aceitar o campo",
            })}
          />
          <FormLabel variant="chakra">
            Declaro que estou ciente do edital e concordo com as condições
            locais para o cumprimento das obrigações objeto da licitação,
            conforme o art. 67, inciso VI, da Lei Federal no 14.133/21;
          </FormLabel>
          <FormErrorMessage>
            {errors.cienteCondicoesEdital?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          display="flex"
          gap="1rem"
          isInvalid={!!errors.condicoesTrabalho}
        >
          <Switch
            {...register("condicoesTrabalho", {
              validate: (value) => value || "Deve aceitar o campo",
            })}
          />
          <FormLabel variant="chakra">
            Declaro para fins do disposto no inciso VI do art. 68, da Lei no
            14.133/21, que não emprego menor de 18 (dezoito) anos em trabalho
            noturno, perigoso ou insalubre e não emprego menor de 16 (dezesseis)
            anos, salvo menor, a partir dos 14 (quatorze) anos, na condição de
            aprendiz, nos termos do inciso XXXIII, do art. 7o, da Constituição
            Federal/88. Declaro que não possuo, em minha cadeia produtiva,
            empregados executando trabalho degradante ou forçado, observando o
            disposto nos incisos III e IV do art. 1o e no inciso III do art. 5o
            da Constituição Federal/88.
          </FormLabel>
          <FormErrorMessage>
            {errors.condicoesTrabalho?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          display="flex"
          gap="1rem"
          flexDirection="column"
          isInvalid={!!errors.enquadramento}
        >
          <FormLabel variant="chakra">
            Declaro para os devidos fins legais, sem prejuízo das sanções e
            multas previstas neste ato convocatório, estar enquadrado como
            ME/EPP/Cooperativa, conforme a Lei Complementar no 123/2006, cujos
            termos declaro conhecer na íntegra, estando apto, portanto, a
            exercer o direito de preferência.
          </FormLabel>
          <RadioGroup>
            <Radio value="1" {...register("enquadramento", { required: true })}>
              Sim, ME
            </Radio>
            <Radio value="2" {...register("enquadramento", { required: true })}>
              ME Sim, EPP
            </Radio>
            <Radio value="3" {...register("enquadramento", { required: true })}>
              Não, outros enquadramentos
            </Radio>
          </RadioGroup>
          <FormErrorMessage>{errors.enquadramento?.message}</FormErrorMessage>
        </FormControl>
      </Flex>
      <Button type="submit">Próximo</Button>
    </Stack>
  );
}

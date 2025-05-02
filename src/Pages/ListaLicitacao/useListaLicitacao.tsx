import useModalDelete from "@/Components/Modal/useModalDelete";
import { useEditalService } from "@/data/services/edital.sevice";
import useMutation from "@/hooks/requests/useMutation";
import useQuery from "@/hooks/requests/useQuery";
import useNavigateLicitaFlex from "@/hooks/useNavigateLicitaFlex";
import { useCallback } from "react";

export default function useLicitacaoFornecedor() {
  const { link } = useNavigateLicitaFlex();
  const editalService = useEditalService();
  const { open, props: propsModalDelete } = useModalDelete();

  const { data, isLoading, reFetch } = useQuery({
    async fetchFn() {
      return (await editalService.obterTodos()).dados;
    },
  });
  const linkCadastro = link("cadastro-edital");

  const linkVisualizacao = useCallback(
    (id: string) => {
      const linkEdicaoString = link("visualizar-licitacao", { idEdital: id });
      return linkEdicaoString;
    },
    [data]
  );

  const { mutate } = useMutation({
    mutateFn(id: string) {
      return editalService.excluirEdital(id);
    },
    options: {
      onSuccess() {
        reFetch();
      },
    },
  });

  const cliqueDelete = async (id: string) => {
    const licitacao = data?.find((d) => d.id === id);
    open({
      mensagem: `Tem certeza que deseja excluir o edital ${licitacao?.numeroPregao}?`,
      onConfirm: () => mutate(id),
    });
  };
  return {
    data,
    isLoading,
    linkCadastro,
    linkVisualizacao,
    cliqueDelete,
    propsModalDelete,
  };
}

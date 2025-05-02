import useModal from "@/Components/Modal/Conteudo/useModal";
import { useEditalService } from "@/data/services/edital.sevice";
import { useEntidadePublicaService } from "@/data/services/entidade.publica.service";
import { Edital } from "@/data/types/Edital";
import useMutation from "@/hooks/requests/useMutation";
import useQuery from "@/hooks/requests/useQuery";
import useNavigateLicitaFlex from "@/hooks/useNavigateLicitaFlex";
import { useCallback } from "react";

export default function useLicitacaoEntidade() {
  const { link } = useNavigateLicitaFlex();
  const entidadeService = useEntidadePublicaService();
  const editalService = useEditalService();
  const { openConfirm, props: propsModalDelete } = useModal();

  const { data, isLoading, reFetch } = useQuery({
    async fetchFn() {
      return (await entidadeService.licitacoes()).dados;
    },
  });
  const linkCadastro = link("cadastro-edital");

  const linkEdicao = useCallback(
    (edital: Edital) => {
      if (edital.status < 1) {
        return link("editar-edital", {
          idEdital: edital.id,
        });
      }
      return link("visualizar-licitacao", {
        idEdital: edital.id,
      });
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

  const { mutate: iniciarDisputa } = useMutation({
    mutateFn(id: string) {
      return editalService.iniciarDisputa(id);
    },
    options: {
      onSuccess(data) {
        if (!data) {
          return;
        }
        cliqueSalaDisputa(data.dados);
      },
    },
  });

  const cliqueDelete = async (id: string) => {
    const licitacao = data?.find((d) => d.id === id);
    openConfirm({
      message: `Tem certeza que deseja excluir o edital ${licitacao?.numeroPregao}?`,
      onConfirm: () => mutate(id),
    });
  };

  const cliqueIniciarDisputa = async (edital: Edital) => {
    iniciarDisputa(edital.id);
    if (edital.ordemFase == 1) {
      return;
    }
  };

  function cliqueSalaDisputa(edital: Edital) {
    window.open(
      `${window.location.origin}/sala-disputa/${edital.id}`,
      "_blank"
    );
  }
  return {
    data,
    isLoading,
    linkCadastro,
    linkEdicao,
    cliqueDelete,
    cliqueIniciarDisputa,
    cliqueSalaDisputa,
    propsModalDelete,
  };
}

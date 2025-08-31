import { useDispatch } from 'react-redux'
import { ChangeEvent, useEffect, useState } from 'react'

import * as S from './styles'

import { remover, editar, alteraStatus } from '../../store/reducers/tarefas'

import Tarefa from '../../models/Tarefa'
import { Botao, BotaoSalvar } from '../../styles'

import * as enums from '../../utils/enums/tarefas'

type Props = Tarefa

const Tarefas = ({
  descricao: descricaoOriginal,
  titulo,
  prioridade,
  status,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescricao(descricaoOriginal)
    }
  }, [descricaoOriginal])

  function cancelarEdição() {
    setEstaEditando(false)
    setDescricao(descricaoOriginal)
  }

  function alteraStatusTrefa(evento: ChangeEvent<HTMLInputElement>) {
    dispatch(alteraStatus({ finalizado: evento.target.checked, id }))
  }

  return (
    <S.Card>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          id={titulo}
          checked={status === enums.Status.CONCLUIDO}
          onChange={alteraStatusTrefa}
        />
        <S.Titulo>
          {estaEditando && <em>Editando: </em>}
          {titulo}
        </S.Titulo>
      </label>
      <S.Tags parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </S.Tags>
      <S.Tags parametro="status" status={status}>
        {status}
      </S.Tags>
      <S.Descricao
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
        disabled={!estaEditando}
      />
      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <BotaoSalvar
              onClick={() => {
                if (typeof id === 'number') {
                  dispatch(
                    editar({
                      id,
                      titulo,
                      prioridade,
                      status,
                      descricao
                    })
                  )
                  setEstaEditando(false)
                }
              }}
            >
              Salvar
            </BotaoSalvar>
            <S.BotaoCancelarRemover onClick={cancelarEdição}>
              Cancelar
            </S.BotaoCancelarRemover>
          </>
        ) : (
          <>
            <Botao onClick={() => setEstaEditando(true)}>Editar</Botao>
            <S.BotaoCancelarRemover
              onClick={() => {
                if (typeof id === 'number') {
                  dispatch(remover(id))
                }
              }}
            >
              Remover
            </S.BotaoCancelarRemover>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Tarefas

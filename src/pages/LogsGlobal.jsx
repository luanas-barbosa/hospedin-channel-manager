import React, { useState } from 'react'
import { RotateCcw, Search } from 'lucide-react'
import { logs as todosLogs, logsAtividade as todosLogsAtividade } from '../data/mock.js'
import { StatusBadge } from '../components/Badge.jsx'
import { Card, CardBody } from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import { Input, Select } from '../components/Input.jsx'
import { SlideOver } from '../components/Modal.jsx'
import { useToast } from '../contexts/ToastContext.jsx'

function TipoUsuarioBadge({ tipo }) {
  const cfgs = {
    hoteleiro: { bg: '#EEF1FF', color: '#374E7A', label: 'Hoteleiro' },
    implantador: { bg: '#E8FDF6', color: '#1B7B6E', label: 'Implantador' },
    sistema: { bg: '#F5F6FA', color: '#526484', label: 'Sistema' },
  }
  const cfg = cfgs[tipo] || cfgs.sistema
  return (
    <span style={{ fontSize: 11, fontWeight: 700, background: cfg.bg, color: cfg.color, padding: '2px 10px', borderRadius: 10, whiteSpace: 'nowrap' }}>
      {cfg.label}
    </span>
  )
}

function LogsTarifas() {
  const [filtros, setFiltros] = useState({
    canal: '', categoria: '', planoTarifa: '', direcao: '',
    dataDe: '', dataAte: '', dataRefDe: '', dataRefAte: '',
  })
  const [aplicados, setAplicados] = useState({
    canal: '', categoria: '', planoTarifa: '', direcao: '',
    dataDe: '', dataAte: '', dataRefDe: '', dataRefAte: '',
  })
  const [reenviando, setReenviando] = useState(null)
  const { addToast } = useToast()

  const parseLogDate = (ts) => {
    const [datePart] = ts.split(' ')
    const [d, m, y] = datePart.split('/')
    return new Date(`${y}-${m}-${d}`)
  }
  const parseRefDate = (str) => {
    if (!str) return null
    const [d, m, y] = str.split('/')
    return new Date(`${y}-${m}-${d}`)
  }

  const filtered = todosLogs.filter(l => {
    if (aplicados.canal && l.canal !== aplicados.canal) return false
    if (aplicados.categoria && l.categoria !== aplicados.categoria) return false
    if (aplicados.planoTarifa && l.planoTarifa !== aplicados.planoTarifa) return false
    if (aplicados.direcao && l.direcao !== aplicados.direcao) return false
    if (aplicados.dataDe && parseLogDate(l.timestamp) < new Date(aplicados.dataDe)) return false
    if (aplicados.dataAte && parseLogDate(l.timestamp) > new Date(aplicados.dataAte)) return false
    if (aplicados.dataRefDe) {
      const ref = parseRefDate(l.dataInicio)
      if (!ref || ref < new Date(aplicados.dataRefDe)) return false
    }
    if (aplicados.dataRefAte) {
      const ref = parseRefDate(l.dataInicio)
      if (!ref || ref > new Date(aplicados.dataRefAte)) return false
    }
    return true
  })

  const reenviar = (id) => {
    setReenviando(id)
    addToast('Reenviando evento...', 'info')
    setTimeout(() => { setReenviando(null); addToast('Evento reenviado com sucesso', 'success') }, 1500)
  }

  const categorias = [...new Set(todosLogs.map(l => l.categoria))].sort()
  const planosTarifa = [...new Set(todosLogs.map(l => l.planoTarifa).filter(Boolean))].sort()
  const fmt = (val) => val != null ? String(val) : '—'

  const limpar = () => {
    const reset = { canal: '', categoria: '', planoTarifa: '', direcao: '', dataDe: '', dataAte: '', dataRefDe: '', dataRefAte: '' }
    setFiltros(reset)
    setAplicados(reset)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card>
        <CardBody style={{ paddingTop: 16, paddingBottom: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ flex: '0 0 160px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>Canal</div>
                <Select
                  value={filtros.canal}
                  onChange={e => setFiltros(f => ({ ...f, canal: e.target.value }))}
                  options={[{ value: 'booking', label: 'Booking.com' }, { value: 'airbnb', label: 'Airbnb' }]}
                  placeholder="Todos"
                />
              </div>
              <div style={{ flex: '0 0 180px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>Categoria</div>
                <Select value={filtros.categoria} onChange={e => setFiltros(f => ({ ...f, categoria: e.target.value }))} options={categorias} placeholder="Todas" />
              </div>
              <div style={{ flex: '0 0 210px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>Plano de tarifa</div>
                <Select value={filtros.planoTarifa} onChange={e => setFiltros(f => ({ ...f, planoTarifa: e.target.value }))} options={planosTarifa} placeholder="Todos" />
              </div>
              <div style={{ flex: '0 0 130px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>Atualiz. de</div>
                <Input type="date" value={filtros.dataDe} onChange={e => setFiltros(f => ({ ...f, dataDe: e.target.value }))} />
              </div>
              <div style={{ flex: '0 0 130px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>Até</div>
                <Input type="date" value={filtros.dataAte} onChange={e => setFiltros(f => ({ ...f, dataAte: e.target.value }))} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ flex: '0 0 130px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>Data ref. de</div>
                <Input type="date" value={filtros.dataRefDe} onChange={e => setFiltros(f => ({ ...f, dataRefDe: e.target.value }))} />
              </div>
              <div style={{ flex: '0 0 130px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>Até</div>
                <Input type="date" value={filtros.dataRefAte} onChange={e => setFiltros(f => ({ ...f, dataRefAte: e.target.value }))} />
              </div>
              <div style={{ flex: '0 0 200px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>Direção</div>
                <Select
                  value={filtros.direcao}
                  onChange={e => setFiltros(f => ({ ...f, direcao: e.target.value }))}
                  options={[{ value: 'entrada', label: 'Entrada (canal → PMS)' }, { value: 'saida', label: 'Saída (PMS → canal)' }]}
                  placeholder="Todas"
                />
              </div>
              <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
                <Button variant="outline" size="sm" onClick={limpar}>Limpar</Button>
                <Button variant="primary" size="sm" onClick={() => setAplicados({ ...filtros })}>Filtrar</Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 2100 }}>
            <thead>
              <tr style={{ background: '#32BBAA' }}>
                {[
                  'Canal', 'Atualizado em', 'Categoria', 'Data início', 'Data fim', 'Direção', 'Referência',
                  'Tarifa (R$)', 'Adulto extra', 'Criança extra', 'Qtd.', 'Bloqueado',
                  'Antecedência', 'Rest. entrada', 'Rest. saída', 'Mín. noites', 'Máx. noites',
                  'Alterado por', 'Enviado para', 'Status', 'Ação',
                ].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, i) => (
                <tr
                  key={log.id}
                  style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F5F6FA', boxShadow: 'inset 0 -1px 0 #D6DDEE' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#EBF9F7'}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#FFFFFF' : '#F5F6FA'}
                >
                  <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, background: log.canal === 'booking' ? '#003580' : '#FF5A5F', color: 'white', padding: '2px 8px', borderRadius: 4 }}>
                      {log.canal === 'booking' ? 'Booking.com' : 'Airbnb'}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: '#526484', whiteSpace: 'nowrap' }}>
                    <div style={{ fontWeight: 600, color: '#1F2B3A' }}>{log.timestamp.split(' ')[0]}</div>
                    <div style={{ color: '#8094AE', fontSize: 11 }}>{log.timestamp.split(' ')[1]}</div>
                  </td>
                  <td style={{ padding: '10px 14px', fontSize: 12, whiteSpace: 'nowrap', fontWeight: 600 }}>{log.categoria}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, whiteSpace: 'nowrap' }}>{log.dataInicio || '—'}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, whiteSpace: 'nowrap' }}>{log.dataFim || '—'}</td>
                  <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                    {log.direcao === 'entrada' ? (
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#374E7A', background: '#EEF1FF', padding: '2px 8px', borderRadius: 10 }}>Entrada</span>
                    ) : (
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#1B7B6E', background: '#E8FDF6', padding: '2px 8px', borderRadius: 10 }}>Saída</span>
                    )}
                  </td>
                  <td style={{ padding: '10px 14px', fontSize: 12, fontWeight: log.referencia ? 700 : 400, color: log.referencia ? '#1F2B3A' : '#8094AE', whiteSpace: 'nowrap' }}>
                    {log.referencia || '—'}
                  </td>
                  <td style={{ padding: '10px 14px', fontSize: 12, fontWeight: 700, color: log.valor != null ? '#1F2B3A' : '#8094AE', whiteSpace: 'nowrap' }}>
                    {log.valor != null ? `R$ ${log.valor.toLocaleString('pt-BR')}` : '—'}
                  </td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: '#526484', textAlign: 'right' }}>{log.adultoExtra != null ? `R$ ${log.adultoExtra}` : '—'}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: '#526484', textAlign: 'right' }}>{log.criancaExtra != null ? `R$ ${log.criancaExtra}` : '—'}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: '#526484', textAlign: 'center' }}>{fmt(log.qtd)}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, textAlign: 'center' }}>
                    {log.bloqueado == null ? '—' : log.bloqueado
                      ? <span style={{ color: '#E85347', fontWeight: 700, fontSize: 11 }}>Sim</span>
                      : <span style={{ color: '#8094AE', fontSize: 11 }}>Não</span>
                    }
                  </td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: '#526484', textAlign: 'center' }}>{log.antecedencia != null ? `${log.antecedencia}d` : '—'}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: '#526484', textAlign: 'center' }}>{fmt(log.restricaoEntrada)}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: '#526484', textAlign: 'center' }}>{fmt(log.restricaoSaida)}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: '#526484', textAlign: 'center' }}>{log.minNoites != null ? `${log.minNoites}n` : '—'}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: '#526484', textAlign: 'center' }}>{log.maxNoites != null ? `${log.maxNoites}n` : '—'}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: '#1F2B3A', whiteSpace: 'nowrap' }}>{log.alteradoPor || '—'}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: '#1F2B3A', whiteSpace: 'nowrap' }}>{log.enviadoPara || '—'}</td>
                  <td style={{ padding: '10px 14px' }}><StatusBadge status={log.status} /></td>
                  <td style={{ padding: '10px 14px' }}>
                    {log.status === 'falha' && (
                      <Button variant="ghost" size="sm" loading={reenviando === log.id} onClick={() => reenviar(log.id)}>
                        <RotateCcw size={12} /> Reenviar
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={21} style={{ padding: 40, textAlign: 'center', color: '#8094AE' }}>Nenhum log encontrado para os filtros selecionados.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #EBEEF2', fontSize: 13, color: '#8094AE' }}>
          {filtered.length} evento(s) encontrado(s)
        </div>
      </Card>
    </div>
  )
}

function LogsAtividade() {
  const [filtros, setFiltros] = useState({ dataDe: '', dataAte: '', busca: '' })
  const [aplicados, setAplicados] = useState({ dataDe: '', dataAte: '', busca: '' })
  const [detalhe, setDetalhe] = useState(null)

  const parseDate = (ts) => {
    const [datePart] = ts.split(' ')
    const [d, m, y] = datePart.split('/')
    return new Date(`${y}-${m}-${d}`)
  }

  const filtered = todosLogsAtividade.filter(l => {
    if (aplicados.dataDe && parseDate(l.timestamp) < new Date(aplicados.dataDe)) return false
    if (aplicados.dataAte && parseDate(l.timestamp) > new Date(aplicados.dataAte)) return false
    if (aplicados.busca) {
      const q = aplicados.busca.toLowerCase()
      if (!l.login.toLowerCase().includes(q) && !l.nomeCompleto.toLowerCase().includes(q)) return false
    }
    return true
  })

  const limpar = () => {
    const reset = { dataDe: '', dataAte: '', busca: '' }
    setFiltros(reset)
    setAplicados(reset)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card>
        <CardBody style={{ paddingTop: 16, paddingBottom: 16 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: '0 0 140px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>Período de</div>
              <Input type="date" value={filtros.dataDe} onChange={e => setFiltros(f => ({ ...f, dataDe: e.target.value }))} />
            </div>
            <div style={{ flex: '0 0 140px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>Até</div>
              <Input type="date" value={filtros.dataAte} onChange={e => setFiltros(f => ({ ...f, dataAte: e.target.value }))} />
            </div>
            <div style={{ flex: '1 1 240px', maxWidth: 320 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#1F2B3A' }}>Detalhes do usuário</div>
              <Input placeholder="Buscar por nome ou login..." value={filtros.busca} onChange={e => setFiltros(f => ({ ...f, busca: e.target.value }))} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="outline" size="sm" onClick={limpar}>Limpar</Button>
              <Button variant="primary" size="sm" onClick={() => setAplicados({ ...filtros })}>Filtrar</Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 860 }}>
            <thead>
              <tr style={{ background: '#32BBAA' }}>
                {['Página do sistema', 'Atualizado em', 'Login', 'Nome completo', 'Tipo de usuário', 'Detalhes'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, i) => (
                <tr
                  key={log.id}
                  style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F5F6FA', boxShadow: 'inset 0 -1px 0 #D6DDEE' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#EBF9F7'}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#FFFFFF' : '#F5F6FA'}
                >
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#1F2B3A', fontWeight: 600 }}>{log.pagina}</td>
                  <td style={{ padding: '12px 16px', fontSize: 12, whiteSpace: 'nowrap' }}>
                    <div style={{ color: '#1F2B3A', fontWeight: 600 }}>{log.timestamp.split(' ')[0]}</div>
                    <div style={{ color: '#8094AE', fontSize: 11 }}>{log.timestamp.split(' ')[1]}</div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#526484', whiteSpace: 'nowrap' }}>{log.login}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#1F2B3A', whiteSpace: 'nowrap' }}>{log.nomeCompleto}</td>
                  <td style={{ padding: '12px 16px' }}><TipoUsuarioBadge tipo={log.tipoUsuario} /></td>
                  <td style={{ padding: '12px 16px' }}>
                    <button
                      onClick={() => setDetalhe(log)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 6, color: '#526484', display: 'flex', alignItems: 'center' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#F5F6FA'; e.currentTarget.style.color = '#32BBAA' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#526484' }}
                    >
                      <Search size={15} />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#8094AE', fontSize: 13 }}>Nenhum registro encontrado para os filtros selecionados.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 16px', borderTop: '1px solid #EBEEF2', fontSize: 13, color: '#8094AE' }}>
          {filtered.length} registro(s) encontrado(s)
        </div>
      </Card>

      <SlideOver isOpen={!!detalhe} onClose={() => setDetalhe(null)} title={detalhe ? `Detalhe — ${detalhe.pagina}` : ''}>
        {detalhe && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <TipoUsuarioBadge tipo={detalhe.tipoUsuario} />
              <span style={{ fontSize: 12, color: '#8094AE' }}>{detalhe.timestamp}</span>
            </div>
            <div style={{ background: '#F5F6FA', borderRadius: 8, padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                ['Página', detalhe.pagina],
                ['Login', detalhe.login],
                ['Nome', detalhe.nomeCompleto],
                ['Tipo', detalhe.tipoUsuario === 'hoteleiro' ? 'Hoteleiro' : detalhe.tipoUsuario === 'implantador' ? 'Implantador' : 'Sistema'],
                ['Ação', detalhe.detalhes.acao],
                ['Campo', detalhe.detalhes.campo],
                ...(detalhe.detalhes.de != null ? [['De', detalhe.detalhes.de || '(vazio)']] : []),
                ...(detalhe.detalhes.para != null ? [['Para', detalhe.detalhes.para || '(vazio)']] : []),
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, paddingBottom: 10, borderBottom: '1px solid #EBEEF2' }}>
                  <span style={{ fontSize: 12, color: '#8094AE', fontWeight: 700, flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1F2B3A', textAlign: 'right' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </SlideOver>
    </div>
  )
}

const segmentStyle = (active) => ({
  padding: '8px 20px',
  border: 'none',
  cursor: 'pointer',
  background: active ? 'white' : 'transparent',
  color: active ? '#1F2B3A' : '#526484',
  fontSize: 13,
  fontWeight: active ? 700 : 400,
  borderRadius: 6,
  fontFamily: 'Open Sans, sans-serif',
  boxShadow: active ? '0 1px 4px rgba(0,0,0,0.10)' : 'none',
  transition: 'all 0.15s',
  whiteSpace: 'nowrap',
})

export default function LogsGlobal() {
  const [aba, setAba] = useState('tarifas')

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1F2B3A', marginBottom: 2 }}>
          Logs
        </h1>
        <p style={{ color: '#8094AE', margin: 0, fontSize: 13 }}>Registro de tarifas, disponibilidade e atividade dos usuários</p>
      </div>

      <div style={{ display: 'inline-flex', background: '#F0F2F5', borderRadius: 8, padding: 4, marginBottom: 24 }}>
        <button style={segmentStyle(aba === 'tarifas')} onClick={() => setAba('tarifas')}>
          Tarifas e Disponibilidade
        </button>
        <button style={segmentStyle(aba === 'atividade')} onClick={() => setAba('atividade')}>
          Atividade do Usuário
        </button>
      </div>

      {aba === 'tarifas' && <LogsTarifas />}
      {aba === 'atividade' && <LogsAtividade />}
    </div>
  )
}

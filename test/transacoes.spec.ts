import { TransacoesService } from '../src/transacoes/transacoes.service';

describe('TransacoesService', () => {
  it('calcula saldo, despesas e gastos por impulso', async () => {
    const historico = [
      { tipo: 'receita', valor: 1000, consumoConsciente: false },
      { tipo: 'despesa', valor: 150.10, consumoConsciente: true },
      { tipo: 'despesa', valor: 49.99, consumoConsciente: false },
    ];
    const modelo = { find: () => ({ sort: () => ({ lean: () => ({ exec: async () => historico }) }) }) };
    const resultado = await new TransacoesService(modelo as any).listar();
    expect(resultado).toEqual({ historico, metricas: { saldoTotal: 799.91, totalDespesas: 200.09, totalGastoImpulso: 49.99 } });
  });

  it('retorna métricas zeradas quando não há transações', async () => {
    const modelo = { find: () => ({ sort: () => ({ lean: () => ({ exec: async () => [] }) }) }) };
    const resultado = await new TransacoesService(modelo as any).listar();
    expect(resultado.metricas).toEqual({ saldoTotal: 0, totalDespesas: 0, totalGastoImpulso: 0 });
  });
});

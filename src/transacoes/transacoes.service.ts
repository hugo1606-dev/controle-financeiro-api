import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarTransacaoDto } from './criar-transacao.dto';
import { Transacao } from './transacao.schema';

@Injectable()
export class TransacoesService {
  constructor(@InjectModel(Transacao.name) private readonly modelo: Model<Transacao>) {}

  criar(dados: CriarTransacaoDto) {
    return this.modelo.create(dados);
  }

  async listar() {
    const historico = await this.modelo.find().sort({ createdAt: -1 }).lean().exec();
    // Somar em centavos evita os erros de precisão usuais de números decimais.
    let saldo = 0;
    let despesas = 0;
    let impulso = 0;
    for (const transacao of historico) {
      const centavos = Math.round(transacao.valor * 100);
      if (transacao.tipo === 'receita') saldo += centavos;
      if (transacao.tipo === 'despesa') {
        saldo -= centavos;
        despesas += centavos;
        if (transacao.consumoConsciente === false) impulso += centavos;
      }
    }
    return {
      historico,
      metricas: { saldoTotal: saldo / 100, totalDespesas: despesas / 100, totalGastoImpulso: impulso / 100 },
    };
  }
}

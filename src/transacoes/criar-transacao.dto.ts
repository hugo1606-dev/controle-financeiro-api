import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsString, Matches, Min } from 'class-validator';

export class CriarTransacaoDto {
  @IsString() @IsNotEmpty() @Matches(/\S/) descricao: string;
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false }) @Min(0.01) valor: number;
  @IsIn(['receita', 'despesa']) tipo: string;
  @IsString() @IsNotEmpty() @Matches(/\S/) categoria: string;
  @IsBoolean() consumoConsciente: boolean;
}

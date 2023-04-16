export class CreateBeerDto {
  readonly style: string;

  readonly min_temperature: number;

  readonly max_temperature: number;
}

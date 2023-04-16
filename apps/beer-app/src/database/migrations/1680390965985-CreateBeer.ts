import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBeer1680390965985 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'beers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'style',
            type: 'varchar',
          },
          {
            name: 'min_temperature',
            type: 'smallint',
          },
          {
            name: 'max_temperature',
            type: 'smallint',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('beers');
  }
}

import { Directive, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "Report_Path")')
export class ReportDto {
  @Field() readonly Report_Generated: boolean;
  @Field({ nullable: true }) readonly Report_Path: string;
}

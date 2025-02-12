import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsArray,
  IsObject,
  ArrayMinSize,
  Min
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";

export class CreateAutUsuarioRestriccionDto {

  @IsOptional()
  @IsString()
  @ApiProperty({ description: `usuario` })
  usuario: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ description: `identificador del Sistema` })
  idSistema: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `idc nivel, tipo de usuario: Nacional, Sedes, Establecimiento, etc` })
  idcNivel: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ description: `codigo departamento` })
  codDepartamento: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({ description: `identificador de la empresa` })
  idEmpresa: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'fecha de registro',
  })
  fechaRegistro: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: `usuario registro` })
  usuarioRegistro: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: `ip registro` })
  ipRegistro: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ description: `Estado de la eliminación lógica del registro.`})
  bajaLogicaRegistro: boolean;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'fecha de modificacion',
  })
  fechaModificacion: Date;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'usuario modificacion',
  })
  usuarioModificacion: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ description: `Identificador del Subsector RUES` })
  idSubsector: number;
}

export class UpdateAutUsuarioRestriccionDto extends PartialType(CreateAutUsuarioRestriccionDto) {}

export class CreateUsuarioRestriccionIdPerfilesDto extends PartialType(CreateAutUsuarioRestriccionDto){
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({},{each:true})
  @ApiProperty({ description: `id-perfiles`})
  colIdPerfiles:number[];

  /*@IsObject()
  @ApiProperty({ description: `usuariorestriccion`})
  usuarioRestriccion:CreateAutUsuarioRestriccionDto;*/
}

export class UpdateUsuarioRestriccionIdPerfilesDto extends PartialType(UpdateAutUsuarioRestriccionDto){
  @IsArray()
  @IsNumber({},{each:true})
  @ArrayMinSize(1)
  @ApiProperty({ description: `id-perfiles`})
  colIdPerfiles:number[];

  /*@IsNumber()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ description: `id-usuario-restriccion`})
  idUsuarioRestriccion:number;

  @IsObject()
  @ApiProperty({ description: `usuariorestriccion`})
  usuarioRestriccion:UpdateAutUsuarioRestriccionDto;*/
}
export class FindUsuariosDto{
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ description: `Identificador de la Institución` })
  idInstitucion: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: `Identificador del Sub sector` })
  idcSubSector: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `idc nivel, tipo de usuario: Nacional, Sedes, Establecimiento, etc` })
  idcNivel: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ description: `codigo departamento` })
  codDepartamento: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ description: `codigo area` })
  codArea: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ description: `cod municipio` })
  codMunicipio: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({ description: `identificador de la Empresa Asegurada en la CBES` })
  idEmpresa: number;
}

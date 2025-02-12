import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { SegipDto, SegipRespDto } from '../../core/dto/segip.dto';
import { RespuestaService } from '../../../shared/services/respuesta.service';

@Injectable()
export class SegipService {
  constructor(
    private http: HttpService,
    private _respuesta: RespuestaService,
  ) {}
  async findBySegip(segip: SegipDto) {
    try {

      const data = await firstValueFrom(
        this.http.post(
          `https://test.asuss.gob.bo/asuss-asegurado-api/api/v1/login`,
          {  
             username: process.env.userNameAsus,
             password: process.env.passwordAsus
          }
        ),
      );
      console.log(data);
      /*const complemento = segip.complento ? segip.complento : '';
      const data = await firstValueFrom(
        this.http.get(
          `https://test.asuss.gob.bo/asuss-asegurado-api/api/v2/interoperabilidad/segip/consultaDatosPersona?ci=${segip.numeroDocumento}&complemento=&${complemento}fechanacimiento=${segip.fechaNacimiento}`,
        ),
      );
      const newRespDto = new SegipRespDto();
      newRespDto.numeroDocumento = data.data.data.NumeroDocumento;
      newRespDto.fechaNacimiento = data.data.data.FechaNacimiento;
      newRespDto.complemento = data.data.data.Complemento;
      newRespDto.complementoVisible = data.data.data.ComplementoVisible;
      newRespDto.nombres = data.data.data.Nombres;
      newRespDto.primerApellido = data.data.data.PrimerApellido;
      newRespDto.segundoApellido = data.data.data.SegundoApellido;
      if (data.data.data) {
        const dataPersona = await firstValueFrom(
            this.http.get(
              process.env.URL_RUES_APP+'/gabo-base-backend/api/v1/aut-persona/busca-persona/'+data.data.data.ci,
            ),
          );
          if(dataPersona.data.data == null){
            return this._respuesta.respuestaHttp(
              true,
              newRespDto,
              null,
              'Lista correcta',
            );
          }else{
            return this._respuesta.respuestaHttp(
              false,
              newRespDto,
              null,
              'La persona ya cuenta con usuario registrado',
            );
          }
      } else {
        return this._respuesta.respuestaHttp(
          false,
          null,
          null,
          'Registro no encontrado',
        );
      }*/
    } catch (e) {
      return this._respuesta.respuestaHttp(
        false,
        null,
        null,
        'Registro no encontrado',
      );
    }
  }
}

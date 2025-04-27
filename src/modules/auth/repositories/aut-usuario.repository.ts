import { Client } from 'pg';

export class AutUsuarioRepository {
  constructor(private _client: Client) {}
  async listarRestriccionesByUsuarioByIdSistema(
    usuario: string,
    idSistema: number,
  ) {
    try {
      const values = [usuario, idSistema];
      const sql =
        'WITH base AS (\n' +
        '    SELECT * \n' +
        '    FROM autorizacion.aut_usuario_restriccion ur\n' +
        '    WHERE ur.usuario = $1 AND ur.id_sistema = $2\n' +
        '),\n' +
        '\n' +
        'super_administrador AS (\n' +
        'SELECT\n' +
        '    b.id_usuario_restriccion,\n' +
        "    CONCAT (b.idc_nivel, ' - ', ps.identificador_sistema) AS nombre\n" +
        '  FROM\n' +
        '    base b\n' +
        '  INNER JOIN parametro.par_sistema ps ON b.id_sistema = ps.id_sistema\n' +
        "  WHERE b.idc_nivel = 'SUPERADMINISTRADOR'\n" +
        ' ),\n' +
        '\n' +
        'nivel_nacional AS(\n' +
        'SELECT\n' +
        '    b.id_usuario_restriccion,\n' +
        "    CONCAT (b.idc_nivel, ' - ', ps.nombre_sistema) AS nombre\n" +
        '  FROM\n' +
        '    base b\n' +
        '  INNER JOIN parametro.par_sistema ps ON b.id_sistema = ps.id_sistema\n' +
        "  WHERE b.idc_nivel = 'NACIONAL'\n" +
        '),\n' +
        '\n' +
        'nivel_establecimiento AS (\n' +
        '  SELECT\n' +
        '    b.id_usuario_restriccion,\n' +
        "    CONCAT (b.idc_nivel, ' - ', ge.emp_nom) AS nombre\n" +
        '  FROM\n' +
        '    base b\n' +
        '  INNER JOIN geografia.geo_empresa ge ON b.id_empresa = ge.id_empresa\n' +
        "  WHERE b.idc_nivel = 'ESTABLECIMIENTO'\n" +
        '),\n' +
        '\n' +
        'nivel_red AS (\n' +
        '  SELECT\n' +
        '    b.id_usuario_restriccion,\n' +
        "    CONCAT (b.idc_nivel, ' - ', ga.nombre_area) AS nombre\n" +
        '  FROM\n' +
        '    base b\n' +
        '  INNER JOIN geografia.geo_area ga ON b.cod_area = ga.id_area\n' +
        "  WHERE b.idc_nivel = 'RED'\n" +
        '),\n' +
        '\n' +
        'nivel_departamento AS (\n' +
        '  SELECT\n' +
        '    b.id_usuario_restriccion,\n' +
        "    CONCAT (b.idc_nivel, ' - ', UPPER (gd.nombre_departamento)) AS nombre\n" +
        '  FROM\n' +
        '    base b\n' +
        '  INNER JOIN geografia.geo_departamento gd ON b.cod_departamento = gd.id_departamento\n' +
        "  WHERE b.idc_nivel = 'DEPARTAMENTO'\n" +
        '),\n' +
        '\n' +
        'nivel_municipio AS (\n' +
        '  SELECT\n' +
        '    b.id_usuario_restriccion,\n' +
        "    CONCAT (b.idc_nivel, ' - ', UPPER (gm.nombre_municipio)) AS nombre\n" +
        '  FROM\n' +
        '    base b\n' +
        '  INNER JOIN geografia.geo_municipio gm ON b.cod_municipio = gm.id_municipio\n' +
        "  WHERE b.idc_nivel = 'MUNICIPIO'\n" +
        '),\n' +
        '\n' +
        'nivel_cotizaciones_empresa AS (\n' +
        '  SELECT\n' +
        '    b.id_usuario_restriccion,\n' +
        "    CONCAT (UPPER (gem.emp_nom) , ' - ', 'EMPRESA') AS nombre\n" +
        '  FROM\n' +
        '    base b\n' +
        '  INNER JOIN geografia.geo_empresa gem ON b.id_empresa = gem.id_empresa\n' +
        '  INNER JOIN parametro.par_clasificador_detalle p ON b.idc_nivel = p.identificador_clasificador_detalle\n' +
        '  INNER JOIN geografia.geo_regional gr ON b.cod_departamento = gr.id_regional\n' +
        "  WHERE b.idc_nivel = 'COTIZACIONES_EMPRESA'\n" +
        '),\n' +
        '\n' +
        'nivel_cotizaciones_cbes AS (\n' +
        '  SELECT\n' +
        '    b.id_usuario_restriccion,\n' +
        "    CONCAT (UPPER (p.nombre_clasificador_detalle), ' - ', 'NACIONAL') AS nombre\n" +
        '  FROM\n' +
        '    base b\n' +
        '  INNER JOIN parametro.par_clasificador_detalle p ON b.idc_nivel = p.identificador_clasificador_detalle\n' +
        "  WHERE b.idc_nivel = 'ADMINISTRADOR_COTIZACIONES'\n" +
        '),\n' +
        '\n' +
        'nivel_cotizaciones_superAdmin AS (\n' +
        '  SELECT\n' +
        '    b.id_usuario_restriccion,\n' +
        "    CONCAT (UPPER (p.nombre_clasificador_detalle), ' - ', 'ADMIN') AS nombre\n" +
        '  FROM\n' +
        '    base b\n' +
        '  INNER JOIN parametro.par_clasificador_detalle p ON b.idc_nivel = p.identificador_clasificador_detalle\n' +
        "  WHERE b.idc_nivel = 'SUPER-ADMINISTRADOR'\n" +
        '),\n' +
        '\n' +
        'nivel_cotizaciones_tesoreria AS (\n' +
        '  SELECT\n' +
        '    b.id_usuario_restriccion,\n' +
        "    CONCAT (UPPER (p.nombre_clasificador_detalle)) AS nombre\n" +
        '  FROM\n' +
        '    base b\n' +
        '  INNER JOIN parametro.par_clasificador_detalle p ON b.idc_nivel = p.identificador_clasificador_detalle\n' +
        "  WHERE b.idc_nivel = 'ADMINISTRADOR_TESORERIA'\n" +
        ')\n' + 
        '\n' +
        'SELECT\n' +
        '  id_usuario_restriccion, \n' +
        '  nombre\n' +
        'FROM (\n' +
        '  SELECT * FROM super_administrador\n' +
        '  UNION ALL\n' +
        '  SELECT * FROM nivel_nacional\n' +
        '  UNION ALL\n' +
        '  SELECT * FROM nivel_establecimiento\n' +
        '  UNION ALL\n' +
        '  SELECT * FROM nivel_red\n' +
        '  UNION ALL\n' +
        '  SELECT * FROM nivel_departamento\n' +
        '  UNION ALL\n' +
        '  SELECT * FROM nivel_municipio\n' +
        '  UNION ALL\n' +
        '  SELECT * FROM nivel_cotizaciones_empresa\n' +
        '  UNION ALL\n' +
        '  SELECT * FROM nivel_cotizaciones_superAdmin\n' +
        '  UNION ALL\n' +
        '  SELECT * FROM nivel_cotizaciones_tesoreria\n' +
        '  UNION ALL\n' +
        '  SELECT * FROM nivel_cotizaciones_cbes\n' +
        ') AS unioned_queries;';
      const data = await this._client.query(sql, values);
      if (data.rows.length > 0) {
        return data.rows;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
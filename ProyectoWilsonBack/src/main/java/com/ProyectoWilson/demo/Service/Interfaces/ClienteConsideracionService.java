package com.ProyectoWilson.demo.Service.Interfaces;

import com.ProyectoWilson.demo.Entities.Enum.TipoConsideracion;

public interface ClienteConsideracionService {
    void agregarConsideracion(TipoConsideracion tipo, String detalle, Long idCliente);
    void editarConsideracion(TipoConsideracion tipo,String detalle, Long idConsideracion);
    void eliminarConsideracion(Long idCliente,Long idConsideracion);

}

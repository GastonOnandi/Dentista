package com.ProyectoWilson.demo.Service.Interfaces;

public interface ClienteConsideracionService {
    void agregarConsideracion(String tipo,String detalle, Long idCliente);
    void editarConsideracion(String tipo,String detalle, Long idConsideracion);
    void eliminarConsideracion(Long idCliente,Long idConsideracion);

}

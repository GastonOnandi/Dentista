package com.ProyectoWilson.demo.Service.Interfaces;


import com.ProyectoWilson.demo.DTO.Response.DeudaTratamientoDTO;
import com.ProyectoWilson.demo.Entities.ClienteTratamiento;

import java.time.LocalDate;
import java.util.List;

public interface ClienteTratamientoService {
    void asociarTratamiento(Long idCliente, Long idTratamiento, LocalDate fecha);
    List<ClienteTratamiento> obtenerPorTratamiento(Long idTratamiento);
    List<ClienteTratamiento> obtenerPorFecha(LocalDate fecha);
    List<ClienteTratamiento> obtenerPorRangoDeFechas(LocalDate fechaInicio, LocalDate fechaFin);
    List<ClienteTratamiento> obtenerPorClienteEnRangoFechas(Long idCliente,LocalDate fechaInicio,LocalDate fechaFin);
    List<ClienteTratamiento> obtenerPorClienteConFechaDesc(Long idCliente);
    void eliminar (Long id);
    void pagarDeuda(Long idClienteTratamiento ,Long monto);
    List<DeudaTratamientoDTO> obtenerDeudasPorCliente(Long idCliente);
    List<DeudaTratamientoDTO> obtenerTodasLasDeudas();
    public List<DeudaTratamientoDTO> obtenerDeudasPendientes();
    public List<DeudaTratamientoDTO> obtenerDeudasPorEstado(String estado);
}
